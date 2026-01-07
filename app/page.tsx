"use client";

import { useState } from "react";
import { GeneratorForm } from "@/components/GeneratorForm";
import { ResultDisplay } from "@/components/ResultDisplay";
import { GenerateResponse } from "@/types";

export default function Home() {
  const [result, setResult] = useState<GenerateResponse | null>(null);

  const handleGenerate = (data: GenerateResponse) => {
    setResult(data);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            📚 儿童识字生成器
          </h1>
          <p className="text-lg text-gray-600">
            基于 AI 的儿童识字学习材料生成工具
          </p>
          <p className="text-sm text-gray-500 mt-2">
            适合 5-9 岁儿童的识字小报，包含拼音和汉字
          </p>
        </div>

        {/* 主要内容 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!result ? (
            <>
              <GeneratorForm onGenerate={handleGenerate} />

              {/* 使用说明 */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-lg font-semibold mb-4">使用说明</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>输入主题/场景（如：超市、医院、公园）</li>
                  <li>输入小报标题（如：走进超市）</li>
                  <li>点击"生成识字小报"按钮</li>
                  <li>等待 30-60 秒，AI 将自动生成识字小报</li>
                  <li>下载或预览生成的图片</li>
                </ol>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <button
                  onClick={handleReset}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← 返回重新生成
                </button>
              </div>
              <ResultDisplay data={result} />
            </>
          )}
        </div>

        {/* 页脚 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by Nano Banana Pro AI</p>
        </div>
      </div>
    </main>
  );
}
