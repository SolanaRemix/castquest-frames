export default function AdminOverviewPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">CastQuest Operator Console</h1>
      <p className="text-sm text-zinc-400">
        Manage quests, frames, mints, and Smart Brain behavior.
      </p>

      <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/60">
        <p className="text-sm text-zinc-300">
          This is the admin overview. More modules will appear as we scaffold them.
        </p>
      </div>
    </div>
  );
}