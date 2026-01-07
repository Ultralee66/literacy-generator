import {
  CreateTaskParams,
  CreateTaskResponse,
  TaskStatus,
  TaskResult,
  CreateTaskInput,
} from "@/types";

const API_BASE_URL = "https://api.kie.ai/api/v1/jobs";

export class NanoBananaAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * 创建图片生成任务
   * @param input 任务输入参数
   * @returns 任务 ID
   */
  async createTask(input: CreateTaskInput): Promise<string> {
    const params: CreateTaskParams = {
      model: "nano-banana-pro",
      input,
    };

    const response = await fetch(`${API_BASE_URL}/createTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `创建任务失败 (${response.status}): ${errorText}`
      );
    }

    const data: CreateTaskResponse = await response.json();

    if (data.code !== 200) {
      throw new Error(`API 返回错误: ${data.msg}`);
    }

    return data.data.taskId;
  }

  /**
   * 查询任务状态
   * @param taskId 任务 ID
   * @returns 任务状态信息
   */
  async getTaskStatus(taskId: string): Promise<TaskStatus["data"]> {
    const response = await fetch(
      `${API_BASE_URL}/recordInfo?taskId=${taskId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `查询任务状态失败 (${response.status}): ${errorText}`
      );
    }

    const data: TaskStatus = await response.json();

    if (data.code !== 200) {
      throw new Error(`API 返回错误: ${data.msg}`);
    }

    return data.data;
  }

  /**
   * 等待任务完成并返回结果
   * @param taskId 任务 ID
   * @param timeout 超时时间（毫秒），默认 60000ms (60秒)
   * @param interval 轮询间隔（毫秒），默认 3000ms (3秒)
   * @returns 生成的图片 URL
   */
  async waitForResult(
    taskId: string,
    timeout: number = 60000,
    interval: number = 3000
  ): Promise<string> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const status = await this.getTaskStatus(taskId);

      if (status.state === "success") {
        if (!status.resultJson) {
          throw new Error("任务完成但未返回结果");
        }

        const result: TaskResult = JSON.parse(status.resultJson);

        if (!result.resultUrls || result.resultUrls.length === 0) {
          throw new Error("任务完成但未返回图片 URL");
        }

        return result.resultUrls[0];
      }

      if (status.state === "fail") {
        throw new Error(
          `任务失败: ${status.failMsg || "未知错误"}`
        );
      }

      // 等待下次轮询
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error(`任务超时 (${timeout}ms)`);
  }
}

/**
 * 创建 Nano Banana Pro API 客户端实例
 * @param apiKey API Key
 * @returns API 客户端实例
 */
export function createNanoBananaClient(apiKey: string): NanoBananaAPI {
  return new NanoBananaAPI(apiKey);
}
