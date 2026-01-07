import { NextRequest, NextResponse } from "next/server";
import { createNanoBananaClient } from "@/lib/nano-banana-api";
import { buildPrompt } from "@/lib/prompt-builder";
import { generateVocabulary } from "@/lib/vocabulary-generator";
import { GenerateRequest, GenerateResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body: GenerateRequest = await request.json();
    const { apiKey, theme, title } = body;

    // 验证参数
    if (!apiKey || !theme || !title) {
      return NextResponse.json(
        { error: "缺少必要参数: apiKey, theme 和 title" },
        { status: 400 }
      );
    }

    // 1. 生成词汇
    const vocabulary = generateVocabulary(theme);

    // 2. 构建提示词
    const prompt = buildPrompt(theme, title, vocabulary);

    // 3. 调用 Nano Banana Pro API
    const api = createNanoBananaClient(apiKey);

    // 创建任务
    const taskId = await api.createTask({
      prompt,
      aspect_ratio: "3:4", // A4 竖版比例
      resolution: "2K",
      output_format: "png",
    });

    // 等待结果
    const imageUrl = await api.waitForResult(taskId);

    // 4. 返回结果
    const response: GenerateResponse = {
      imageUrl,
      vocabulary,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("生成小报时出错:", error);

    const errorMessage =
      error instanceof Error ? error.message : "未知错误";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
