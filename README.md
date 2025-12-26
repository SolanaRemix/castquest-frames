# CAST QUEST Frames

CAST QUEST Frames is a Web3-native social photo protocol that feels like Instagram, mints like Zora, extends like Farcaster Frames, and builds like Remix — powered by a Smart Brain multi-agent AI.

## ✨ Core Principles

- Chain-first: Built on Base with multi-chain EVM support
- Creator-first: Onchain minting, collecting, royalties, and programmable fees
- Builder-first: Frames, SDK, and a Remix-style module builder
- AI-native: Smart Brain agents for pricing, previews, tagging, and system optimization

## 🧱 Monorepo Structure

apps/
  web/         - Next.js app (feed, profiles, frames)
  admin/       - Next.js admin app (fees, templates, AI settings)
  mobile/      - React Native / Expo app

packages/
  contracts/   - Solidity contracts (Base + EVM)
  sdk/         - CAST QUEST SDK integration (used here)
  ai-brain/    - Multi-agent Smart Brain orchestration
  ui-kit/      - Shared UI components & design system

infra/
  api-gateway/ - API entrypoint (frames, mint, collect)
  indexer/     - Onchain event indexer
  workers/     - Background jobs (AI, notifications, analytics)
  k8s/         - Kubernetes manifests

docs/
  whitepaper/  - Vision & protocol
  architecture/- Diagrams & technical design
  sdk/         - Dev docs & examples
  product/     - User & admin guides

.github/       - CI/CD, issue templates, PR templates
scripts/       - Dev, deploy, Smart Brain operator
examples/frames/ - Example frame definitions

## 🤝 Contributing

See CONTRIBUTING.md.

## 💸 Sponsors & Partners

Site: https://castquest.xyz (placeholder)
Docs: https://docs.castquest.xyz (placeholder)
Sponsors: GitHub Sponsors / custom page

## 🌌 Vision

Social feeds will be onchain.
Creators will own their rails.
Builders will extend everything through Frames and SDKs.
AI will act as the invisible Smart Brain across the entire stack.

You are early.
