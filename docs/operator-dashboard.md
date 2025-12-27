# Operator Dashboard

The CastQuest Operator Dashboard provides a unified view of protocol health, worker activity, and Smart Brain intelligence.

## Overview

Located at `/dashboard` in the admin application, this dashboard gives operators real-time insights into:

- **System Health**: Status of all core modules (Admin, Strategy Worker, Smart Brain, Data, Widgets, Users, Media, Timeline, Tokens, Contracts, Smart Wallets)
- **Worker Monitor**: Strategy Worker status, last run timestamp, and manual trigger controls
- **Brain Activity**: Smart Brain event tracking and learning suggestions
- **Quick Links**: Fast navigation to all protocol surfaces
- **Operator Notes**: Important information about system state and capabilities

## Features

### 1. System Health Cards

Each system component displays:
- **Status Indicator**: OK (green), WARN (yellow), ERROR (red)
- **Neo Glow Effects**: Dynamic shadows based on status
- **Real-time Updates**: Auto-refresh every 10 seconds

```tsx
<SystemHealthCard
  title="Smart Brain"
  status="ok"
  subtitle="API endpoints available"
/>
```

### 2. Strategy Worker Monitor

The worker monitor provides:
- **Live Status**: Current worker state (idle/running)
- **Last Run Timestamp**: When the worker last executed
- **Manual Trigger**: Button to execute worker via API
- **Worker Timeline**: Visual representation of recent runs
- **Worker Pulse**: Animated indicator when active

Trigger endpoint: `POST /api/strategy/worker/run`

### 3. Smart Brain Activity

Displays:
- **Event Count**: Total brain events logged
- **Suggestion Count**: AI-generated suggestions
- **Activity Graph**: Visual representation of brain activity
- **Memory Files**: Links to JSON storage (`brain-events.json`, `brain-suggestions.json`)

### 4. Quick Links

Fast navigation to:
- Media Manager
- Frame Templates
- Frames Console
- Mints Console
- Quests Manager
- Brain Console
- Worker Console
- Neo Dev Console

### 5. Operator Notes

Important operational information:
- File-based JSON state storage
- Manual worker triggers
- Smart Brain learning capabilities
- Live update intervals
- Development mode indicators
- Production readiness notes

## Components

### From `@castquest/neo-ux-core`

```tsx
import {
  SystemHealthCard,
  OperatorNotes,
  QuickLinks,
  WorkerTimeline,
  WorkerPulse,
  BrainActivityGraph,
  DashboardGrid,
  DashboardSection,
  GlowButton,
} from "@castquest/neo-ux-core";
```

### SystemHealthCard

```tsx
interface SystemHealthCardProps {
  title: string;
  status: "ok" | "warn" | "error";
  subtitle?: string;
  icon?: React.ReactNode;
}
```

### OperatorNotes

```tsx
interface OperatorNotesProps {
  notes: string[];
}
```

### QuickLinks

```tsx
interface QuickLinksProps {
  links: Array<{ 
    label: string; 
    href: string; 
    icon?: string 
  }>;
}
```

## API Endpoints

### GET /api/status

Returns comprehensive system status:

```json
{
  "timestamp": "2025-12-27T...",
  "systems": [
    {
      "id": "admin",
      "name": "Admin Dashboard",
      "status": "ok",
      "subtitle": "UI loaded and responsive"
    }
  ],
  "worker": {
    "lastRun": "2025-12-27T...",
    "status": "idle"
  },
  "brain": {
    "eventCount": 0,
    "suggestionCount": 0
  }
}
```

### POST /api/strategy/worker/run

Triggers the Strategy Worker manually:

```json
{
  "ok": true,
  "event": {
    "id": "worker_evt_1234567890",
    "type": "run",
    "message": "Strategy worker run executed (mock).",
    "time": "2025-12-27T..."
  }
}
```

## Data Storage

The dashboard reads from file-based JSON storage:

```
data/
├── brain-events.json       # Smart Brain event logs
├── brain-suggestions.json  # AI learning suggestions
├── worker-events.json      # Strategy Worker execution history
├── frames.json             # Frame data
├── quests.json             # Quest data
└── mints.json              # Mint data
```

## Neo Glow Styling

All components use the Neo theme system:

```tsx
import { neo } from "@castquest/neo-ux-core";

// Glow effects
neo.glow.success  // Green glow for OK status
neo.glow.warning  // Yellow glow for WARN status
neo.glow.error    // Red glow for ERROR status

// Colors
neo.colors.text.accent    // Emerald accent color
neo.colors.bg.secondary   // Dark backgrounds
neo.colors.border.glow    // Glowing borders

// Spacing
neo.spacing.card  // Consistent card padding
```

## Usage

```tsx
"use client";

import { useEffect, useState } from "react";
import { SystemHealthCard } from "@castquest/neo-ux-core";

export default function Dashboard() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  async function fetchStatus() {
    const res = await fetch("/api/status");
    const data = await res.json();
    setStatus(data);
  }

  return (
    <div>
      {status?.systems.map((system) => (
        <SystemHealthCard
          key={system.id}
          title={system.name}
          status={system.status}
          subtitle={system.subtitle}
        />
      ))}
    </div>
  );
}
```

## Production Readiness

Current state:
- ✅ File-based JSON storage
- ✅ Manual worker triggers
- ✅ Smart Brain learning
- ✅ Real-time UI updates
- ⚠️  Mock contracts (testnet)
- ⚠️  Development mode

Next steps for production:
1. Replace file-based storage with database
2. Add WebSocket for real-time updates
3. Deploy contracts to mainnet
4. Enable automated worker scheduling
5. Add authentication and access control

## See Also

- [System Architecture](../architecture.md)
- [Smart Brain](./smart-brain.md)
- [Strategy Worker](./strategy-worker.md)
- [Neo UX Core Components](../../packages/neo-ux-core/README.md)
