"use client";

import { useState, FormEvent } from "react";
import { GenerateResponse } from "@/types";

interface GeneratorFormProps {
  onGenerate: (data: GenerateResponse) => void;
}

export function GeneratorForm({ onGenerate }: GeneratorFormProps) {
  const [theme, setTheme] = useState("");
  const [title, setTitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!theme.trim() || !title.trim()) {
      setError("请填写主题和标题");
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme: theme.trim(), title: title.trim() }),
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
        <label htmlFor="theme" className="block text-sm font-medium mb-2">
          主题/场景
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
          小报标题
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
