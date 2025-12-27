"use client";

import { useEffect, useState } from "react";
import {
  GlowButton,
  DashboardGrid,
  DashboardSection,
  BrainActivityGraph,
  WorkerTimeline,
  WorkerPulse,
  SystemHealthCard,
  OperatorNotes,
  QuickLinks,
} from "@castquest/neo-ux-core";

interface SystemStatus {
  timestamp: string;
  systems: Array<{
    id: string;
    name: string;
    status: "ok" | "warn" | "error";
    subtitle: string;
  }>;
  worker: {
    lastRun: string | null;
    status: string;
  };
  brain: {
    eventCount: number;
    suggestionCount: number;
  };
}

export default function AdminDashboardMega() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [workerRunning, setWorkerRunning] = useState(false);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  async function fetchStatus() {
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setLoading(false);
    }
  }

  async function triggerWorker() {
    setWorkerRunning(true);
    try {
      const res = await fetch("/api/strategy/worker/run", {
        method: "POST",
      });
      const data = await res.json();
      console.log("Worker triggered:", data);
      setTimeout(fetchStatus, 1000); // Refresh status after 1s
    } catch (error) {
      console.error("Failed to trigger worker:", error);
    } finally {
      setWorkerRunning(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-emerald-400 animate-pulse">Loading operator dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-emerald-400">
            Operator Dashboard • MEGA NEO GLOW
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Unified view of CastQuest protocol health, worker activity, and Smart Brain intelligence.
          </p>
        </div>
        <div className="flex gap-2">
          <GlowButton onClick={fetchStatus}>
            🔄 Refresh
          </GlowButton>
        </div>
      </header>

      {/* System Health Section */}
      <DashboardSection title="System Health">
        <DashboardGrid>
          {status?.systems.map((system) => (
            <SystemHealthCard
              key={system.id}
              title={system.name}
              status={system.status}
              subtitle={system.subtitle}
            />
          ))}
        </DashboardGrid>
      </DashboardSection>

      {/* Worker Monitor Section */}
      <DashboardSection title="Strategy Worker Monitor">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <WorkerTimeline path="/data/worker-events.json" />
          </div>
          <div className="space-y-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neutral-200">Worker Status</h3>
                <WorkerPulse active={workerRunning} />
              </div>
              <div className="space-y-2 text-xs text-neutral-400">
                <div>
                  <span className="text-neutral-500">Last Run:</span>
                  <div className="text-neutral-300 mt-1">
                    {status?.worker.lastRun 
                      ? new Date(status.worker.lastRun).toLocaleString()
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Status:</span>
                  <div className="text-emerald-400 mt-1 uppercase font-semibold">
                    {workerRunning ? "RUNNING" : status?.worker.status}
                  </div>
                </div>
              </div>
              <GlowButton 
                onClick={triggerWorker} 
                disabled={workerRunning}
                className="w-full mt-4"
              >
                {workerRunning ? "Running..." : "▶ Trigger Run"}
              </GlowButton>
            </div>
          </div>
        </div>
      </DashboardSection>

      {/* Brain Activity Section */}
      <DashboardSection title="Smart Brain Activity">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <BrainActivityGraph path="/data/brain-events.json" />
            <div className="mt-2 text-xs text-neutral-500 text-center">
              Total Events: {status?.brain.eventCount || 0}
            </div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-neutral-200 mb-3">
              Recent Suggestions
            </h3>
            <div className="space-y-2 text-xs text-neutral-400">
              {status?.brain.suggestionCount === 0 ? (
                <p className="text-neutral-500 italic">
                  No suggestions yet. Smart Brain is learning...
                </p>
              ) : (
                <p className="text-emerald-400">
                  {status?.brain.suggestionCount} suggestion(s) available
                </p>
              )}
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <p className="text-neutral-500">
                  Brain memories and learning data stored in:
                </p>
                <ul className="mt-2 space-y-1 text-neutral-400">
                  <li>• brain-events.json</li>
                  <li>• brain-suggestions.json</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DashboardSection>

      {/* Quick Links & Operator Notes */}
      <div className="grid gap-4 md:grid-cols-2">
        <QuickLinks
          links={[
            { label: "Media", href: "/media", icon: "📁" },
            { label: "Templates", href: "/frame-templates", icon: "📋" },
            { label: "Frames", href: "/frames", icon: "🖼️" },
            { label: "Mints", href: "/mints", icon: "💎" },
            { label: "Quests", href: "/quests", icon: "🎯" },
            { label: "Brain Console", href: "/brain", icon: "🧠" },
            { label: "Worker Console", href: "/worker", icon: "⚡" },
            { label: "Dev Console", href: "/neo", icon: "🔧" },
          ]}
        />
        <OperatorNotes
          notes={[
            "Dashboard uses file-based JSON for state (data/*.json)",
            "Strategy Worker runs on manual trigger via API",
            "Smart Brain learns from protocol activity and stores memories",
            "All system health indicators are live-updated every 10s",
            "Mock contracts and testnet tokens for development",
            "Ready to wire real-time WebSocket for production",
          ]}
        />
      </div>
    </div>
  );
}
