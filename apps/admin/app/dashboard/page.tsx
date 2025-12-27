"use client";

import {
  GlowCard,
  GlowButton,
  DashboardGrid,
  DashboardStat,
  DashboardSection,
  BrainActivityGraph,
  WorkerTimeline
} from "@castquest/neo-ux-core";

export default function AdminDashboardMega() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-emerald-400">Operator Dashboard • MEGA NEO GLOW</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Unified view of frames, quests, brain activity, and worker timeline.
          </p>
        </div>
        <GlowButton>Run Full Protocol Scan</GlowButton>
      </header>

      <DashboardSection title="Protocol Stats">
        <DashboardGrid>
          <DashboardStat label="Total Frames" value="128" />
          <DashboardStat label="Active Quests" value="19" />
          <DashboardStat label="Pending Mints" value="42" />
        </DashboardGrid>
      </DashboardSection>

      <DashboardSection title="Live Activity">
        <div className="grid gap-4 md:grid-cols-2">
          <BrainActivityGraph path="/data/brain-events.json" />
          <WorkerTimeline path="/data/worker-events.json" />
        </div>
      </DashboardSection>
    </div>
  );
}
