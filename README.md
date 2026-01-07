# 儿童识字生成器

基于 AI 的儿童识字学习材料生成工具。用户输入主题/场景（如"超市"）和标题（如"走进超市"），系统自动生成适合 5-9 岁儿童的竖版 A4 识字小报。

## 技术栈

- **前端**：Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- **后端**：Next.js API Routes
- **AI 模型**：Nano Banana Pro
- **部署**：Vercel

## 功能特点

- 🎨 自动生成儿童绘本风格的识字小报
- 📝 包含 15-20 个场景相关词汇（拼音+汉字）
- 📐 竖版 A4 比例，适合打印
- 🚀 快速生成，30-60 秒完成

## 开始使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 API Key：

```env
KIE_AI_API_KEY=your_api_key_here
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 获取 API Key

1. 访问 [API Key 管理页面](https://kie.ai/api-key)
2. 注册或登录账号
3. 获取 API Key
4. 将 API Key 填入 `.env.local` 文件

## 支持的场景

目前支持以下场景的词汇生成：

- 🛒 超市
- 🏥 医院
- 🌳 公园
- 🏫 学校
- 🦁 动物园

你也可以输入自定义场景，系统会使用通用词汇。

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── generate/      # 生成小报接口
│   ├── page.tsx           # 首页
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── GeneratorForm.tsx  # 生成表单
│   └── ResultDisplay.tsx  # 结果展示
├── lib/                   # 工具库
│   ├── nano-banana-api.ts      # API 客户端
│   ├── prompt-builder.ts        # 提示词构建
│   └── vocabulary-generator.ts  # 词汇生成
├── types/                 # TypeScript 类型定义
├── ai-docs/              # AI 相关文档
└── public/               # 静态资源
```

## 开发说明

### 添加新场景词汇

编辑 `lib/vocabulary-generator.ts`，在 `SCENARIOS` 对象中添加新场景：

```typescript
const SCENARIOS: Record<string, VocabularyList> = {
  // 现有场景...
  新场景: {
    core: [
      { pinyin: "pīn yīn", chinese: "汉字" },
      // ...
    ],
    items: [...],
    environment: [...],
  },
};
```

### 修改提示词模板

编辑 `lib/prompt-builder.ts` 中的 `buildPrompt` 函数。

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量 `KIE_AI_API_KEY`
4. 部署完成

## 参考文档

- [Nano Banana Pro API 文档](./ai-docs/api-nana-banaba-pro.md)
- [提示词模板](./ai-docs/prompt.md)

## License

MIT
