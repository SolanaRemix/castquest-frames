import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dataDir = path.join(process.cwd(), "../../data");
  
  // Check system components
  const status = {
    timestamp: new Date().toISOString(),
    systems: [
      {
        id: "admin",
        name: "Admin Dashboard",
        status: "ok" as const,
        subtitle: "UI loaded and responsive"
      },
      {
        id: "worker",
        name: "Strategy Worker",
        status: "warn" as const,
        subtitle: "Manual trigger only"
      },
      {
        id: "brain",
        name: "Smart Brain",
        status: "ok" as const,
        subtitle: "API endpoints available"
      },
      {
        id: "data",
        name: "Data JSON",
        status: "ok" as const,
        subtitle: "File-based storage active"
      },
      {
        id: "widgets",
        name: "Widgets Monitor",
        status: "ok" as const,
        subtitle: "Components loaded"
      },
      {
        id: "users",
        name: "Users Monitor",
        status: "warn" as const,
        subtitle: "Mock data"
      },
      {
        id: "media",
        name: "Media",
        status: "ok" as const,
        subtitle: "Static assets ready"
      },
      {
        id: "timeline",
        name: "Timeline",
        status: "ok" as const,
        subtitle: "Event tracking active"
      },
      {
        id: "tokens",
        name: "Tokens",
        status: "warn" as const,
        subtitle: "Testnet only"
      },
      {
        id: "contracts",
        name: "Contracts",
        status: "warn" as const,
        subtitle: "Mock contracts"
      },
      {
        id: "wallets",
        name: "Smart Wallets",
        status: "warn" as const,
        subtitle: "Development mode"
      }
    ],
    worker: {
      lastRun: getLastWorkerRun(dataDir),
      status: "idle"
    },
    brain: {
      eventCount: getBrainEventCount(dataDir),
      suggestionCount: getBrainSuggestionCount(dataDir)
    }
  };

  return NextResponse.json(status);
}

function getLastWorkerRun(dataDir: string): string | null {
  try {
    const workerFile = path.join(dataDir, "worker-events.json");
    if (!fs.existsSync(workerFile)) return null;
    
    const events = JSON.parse(fs.readFileSync(workerFile, "utf-8"));
    if (!events.length) return null;
    
    const lastEvent = events[events.length - 1];
    return lastEvent.time || null;
  } catch {
    return null;
  }
}

function getBrainEventCount(dataDir: string): number {
  try {
    const brainFile = path.join(dataDir, "brain-events.json");
    if (!fs.existsSync(brainFile)) return 0;
    
    const events = JSON.parse(fs.readFileSync(brainFile, "utf-8"));
    return events.length;
  } catch {
    return 0;
  }
}

function getBrainSuggestionCount(dataDir: string): number {
  try {
    const suggestionsFile = path.join(dataDir, "brain-suggestions.json");
    if (!fs.existsSync(suggestionsFile)) return 0;
    
    const suggestions = JSON.parse(fs.readFileSync(suggestionsFile, "utf-8"));
    return suggestions.length;
  } catch {
    return 0;
  }
}
