"use client";

import { useState, FormEvent, useEffect } from "react";
import { GenerateResponse } from "@/types";

interface GeneratorFormProps {
  onGenerate: (data: GenerateResponse) => void;
}

export function GeneratorForm({ onGenerate }: GeneratorFormProps) {
  const [apiKey, setApiKey] = useState("");
  const [theme, setTheme] = useState("");
  const [title, setTitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 从 localStorage 加载 API Key
  useEffect(() => {
    const savedApiKey = localStorage.getItem("kie_ai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim() || !theme.trim() || !title.trim()) {
      setError("请填写 API Key、主题和标题");
      return;
    }

    setGenerating(true);
    setError(null);

    // 保存 API Key 到 localStorage
    localStorage.setItem("kie_ai_api_key", apiKey.trim());

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          theme: theme.trim(),
          title: title.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "生成失败");
      }

      const data: GenerateResponse = await response.json();
      onGenerate(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
          API Key <span className="text-red-500">*</span>
        </label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="请输入你的 Nano Banana Pro API Key"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={generating}
        />
        <p className="mt-1 text-sm text-gray-500">
          从{" "}
          <a
            href="https://kie.ai/api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://kie.ai/api-key
          </a>{" "}
          获取 API Key，会被保存在浏览器本地
        </p>
      </div>

      <div>
        <label htmlFor="theme" className="block text-sm font-medium mb-2">
          主题/场景 <span className="text-red-500">*</span>
        </label>
        <input
          id="theme"
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="例如：超市、医院、公园、学校、动物园"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={generating}
        />
        <p className="mt-1 text-sm text-gray-500">
          支持的场景：超市、医院、公园、学校、动物园
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          小报标题 <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例如：走进超市、快乐医院、美丽的公园"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={generating}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={generating}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {generating ? "生成中..." : "生成识字小报"}
      </button>

      {generating && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            正在生成识字小报，这可能需要 30-60 秒...
          </p>
        </div>
      )}
    </form>
  );
}
