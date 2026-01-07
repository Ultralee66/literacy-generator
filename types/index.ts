// 词汇类型
export interface VocabularyWord {
  pinyin: string;
  chinese: string;
}

// 词汇分类
export interface VocabularyList {
  core: VocabularyWord[];      // 核心角色与设施 (3-5个)
  items: VocabularyWord[];      // 常见物品/工具 (5-8个)
  environment: VocabularyWord[]; // 环境与装饰 (3-5个)
}

// Nano Banana Pro API 请求参数
export interface CreateTaskInput {
  prompt: string;
  image_input?: string[];
  aspect_ratio?: "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "4:5" | "5:4" | "9:16" | "16:9" | "21:9" | "auto";
  resolution?: "1K" | "2K" | "4K";
  output_format?: "png" | "jpg";
}

export interface CreateTaskParams {
  model: string;
  input: CreateTaskInput;
  callBackUrl?: string;
}

// Nano Banana Pro API 响应
export interface CreateTaskResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
  };
}

export interface TaskStatus {
  code: number;
  msg: string;
  data: {
    taskId: string;
    model: string;
    state: "waiting" | "success" | "fail";
    param: string;
    resultJson: string | null;
    failCode: string | null;
    failMsg: string | null;
    costTime: number | null;
    completeTime: number | null;
    createTime: number;
  };
}

export interface TaskResult {
  resultUrls: string[];
}

// 生成请求
export interface GenerateRequest {
  apiKey: string;
  theme: string;
  title: string;
}

// 生成响应
export interface GenerateResponse {
  imageUrl: string;
  vocabulary: VocabularyList;
}
