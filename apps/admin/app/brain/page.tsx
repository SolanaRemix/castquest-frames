"use client";

import { useState } from "react";

type BrainFrameLayout = {
  primaryText: string;
  secondaryText: string;
  cta: {
    label: string;
    action: string;
  };
};

type BrainFrame = {
  id: string;
  templateId: string;
  mediaId: string;
  layout: BrainFrameLayout;
};

export default function BrainPage() {
  const [templateId, setTemplateId] = useState("tmpl_welcome");
  const [mediaId, setMediaId] = useState("media_intro");
  const [hint, setHint] = useState("");
  const [frame, setFrame] = useState<BrainFrame | null>(null);
  const [validation, setValidation] = useState<string | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setValidation(null);
    setInsights(null);
    try {
      const res = await fetch("/api/brain/generate-frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, mediaId, hint }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate frame");
      setFrame(data.frame);
    } catch (err: any) {
      setValidation(err.message || "Error generating frame");
    } finally {
      setLoading(false);
    }
  }

  async function handleValidate() {
    if (!frame) {
      setValidation("No frame to validate.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/brain/validate-frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Validation failed");
      setValidation(data.message || "Frame is valid.");
    } catch (err: any) {
      setValidation(err.message || "Error validating frame");
    } finally {
      setLoading(false);
    }
  }

  async function handleInsights() {
    setLoading(true);
    try {
      const res = await fetch("/api/brain/strategy-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, mediaId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get insights");
      setInsights(data.insights || "No insights available.");
    } catch (err: any) {
      setInsights(err.message || "Error fetching insights");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Smart Brain Runtime Engine</h1>
        <p className="text-sm text-neutral-500">
          Generate, validate, and analyze frames using the CastQuest Smart Brain.
        </p>
      </header>

      <section className="space-y-3 border border-neutral-800 rounded-lg p-4">
        <h2 className="text-lg font-medium">Input</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs text-neutral-400">Template ID</label>
            <input
              className="w-full px-2 py-1 rounded bg-neutral-900 border border-neutral-700 text-sm"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-neutral-400">Media ID</label>
            <input
              className="w-full px-2 py-1 rounded bg-neutral-900 border border-neutral-700 text-sm"
              value={mediaId}
              onChange={(e) => setMediaId(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-neutral-400">Hint (optional)</label>
          <textarea
            className="w-full px-2 py-1 rounded bg-neutral-900 border border-neutral-700 text-sm h-16"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder="e.g. welcome back, resume quest, announce reward..."
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-3 py-1 text-sm rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"
          >
            Generate Frame
          </button>
          <button
            onClick={handleValidate}
            disabled={loading}
            className="px-3 py-1 text-sm rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-50"
          >
            Validate Frame
          </button>
          <button
            onClick={handleInsights}
            disabled={loading}
            className="px-3 py-1 text-sm rounded bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
          >
            Strategy Insights
          </button>
        </div>
      </section>

      <section className="space-y-3 border border-neutral-800 rounded-lg p-4">
        <h2 className="text-lg font-medium">Generated Frame</h2>
        {frame ? (
          <pre className="text-xs bg-black/60 border border-neutral-800 rounded p-3 overflow-auto">
            {JSON.stringify(frame, null, 2)}
          </pre>
        ) : (
          <p className="text-sm text-neutral-500">No frame generated yet.</p>
        )}
      </section>

      <section className="space-y-3 border border-neutral-800 rounded-lg p-4">
        <h2 className="text-lg font-medium">Validation</h2>
        {validation ? (
          <p className="text-sm">{validation}</p>
        ) : (
          <p className="text-sm text-neutral-500">No validation run yet.</p>
        )}
      </section>

      <section className="space-y-3 border border-neutral-800 rounded-lg p-4">
        <h2 className="text-lg font-medium">Strategy Insights</h2>
        {insights ? (
          <pre className="text-xs bg-black/60 border border-neutral-800 rounded p-3 overflow-auto whitespace-pre-wrap">
            {insights}
          </pre>
        ) : (
          <p className="text-sm text-neutral-500">No insights requested yet.</p>
        )}
      </section>
    </div>
  );
}