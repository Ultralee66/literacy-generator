"use client";

import { GenerateResponse } from "@/types";

interface ResultDisplayProps {
  data: GenerateResponse;
}

export function ResultDisplay({ data }: ResultDisplayProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = data.imageUrl;
    link.download = `识字小报-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* 图片展示 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <img
          src={data.imageUrl}
          alt="生成的识字小报"
          className="w-full h-auto"
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          下载图片
        </button>
        <a
          href={data.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors text-center"
        >
          在新窗口打开
        </a>
      </div>

      {/* 词汇列表 */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">本次生成的词汇</h3>

        <div className="space-y-4">
          {/* 核心角色与设施 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              核心角色与设施
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.vocabulary.core.map((word, index) => (
                <span
                  key={`core-${index}`}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  <span className="mr-1">{word.pinyin}</span>
                  <span className="font-medium">{word.chinese}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 常见物品/工具 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              常见物品/工具
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.vocabulary.items.map((word, index) => (
                <span
                  key={`items-${index}`}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  <span className="mr-1">{word.pinyin}</span>
                  <span className="font-medium">{word.chinese}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 环境与装饰 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">环境与装饰</h4>
            <div className="flex flex-wrap gap-2">
              {data.vocabulary.environment.map((word, index) => (
                <span
                  key={`environment-${index}`}
                  className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  <span className="mr-1">{word.pinyin}</span>
                  <span className="font-medium">{word.chinese}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
