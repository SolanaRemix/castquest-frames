"use client";

import {
  GlowCard,
  GlowButton,
  DashboardGrid,
  DashboardStat
} from "@castquest/neo-ux-core";

export default function WebFrontMega() {
  return (
    <div className="space-y-6">
      <GlowCard>
        <h1 className="text-xl font-bold text-emerald-400">CastQuest Web • NEO GLOW</h1>
        <p className="text-xs text-neutral-400 mt-1">
          Public-facing view powered by the same sovereign NEO GLOW core.
        </p>
        <div className="mt-4">
          <GlowButton>Start a New Quest</GlowButton>
        </div>
      </GlowCard>

      <DashboardGrid>
        <DashboardStat label="Featured Frames" value="12" />
        <DashboardStat label="Live Quests" value="4" />
        <DashboardStat label="Total Participants" value="327" />
      </DashboardGrid>
    </div>
  );
}
