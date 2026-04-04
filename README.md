# Proof of Care

Attest to care work on-chain. Make invisible labor visible and verifiable.

**Live:** [proofofcare.spirittree.dev](https://proofofcare.spirittree.dev)
**Stack:** Next.js, TailwindCSS, EAS SDK, RainbowKit, wagmi, OpenRouter
**Status:** Active

## What This Is

Proof of Care is a protocol for creating on-chain attestations of care work — mentorship, mutual aid, emotional support, caregiving, skill sharing, and more. It uses the Ethereum Attestation Service (EAS) to make invisible labor visible, verifiable, and valued.

Describe the care work you've done in plain language, and AI structures it into a formal attestation with category, summary, estimated hours, market value, and an attestation statement. Then mint it on-chain as a permanent, verifiable record. The project reframes care as something worthy of the same infrastructure we give financial transactions.

## Features

- 📝 **Care Description** — plain-language input of care work performed
- 🤖 **AI Structuring** — auto-categorizes, estimates hours, and calculates market value
- ⛓️ **On-chain Attestation** — EAS-based attestation minting
- 💰 **Market Value Estimation** — professional rates as baseline for care work valuation
- 📊 **Impact Dashboard** — aggregated stats on attested care
- 🔗 **Wallet Connect** — RainbowKit integration for Web3 wallet connection
- 📈 **Care Categories** — Mentorship, Emergency Aid, Community Service, Emotional Support, Physical Help, Skill Sharing, Caregiving, Mutual Aid

## AI Integration

**The Witness** — powered by OpenRouter, takes plain-text care work descriptions and structures them into formal attestations. Assigns category, generates a formal summary, estimates hours and market value (using professional rates as baseline), and writes an attestation statement suitable for blockchain record.

**Impact Analyzer** — AI analysis of attestation patterns and care impact.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS
- **Web3:** EAS SDK, RainbowKit, wagmi, viem
- **Database:** None (on-chain data)
- **AI:** OpenRouter (via Vercel AI SDK)
- **Hosting:** Vercel

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AI_API_KEY` / `OPENROUTER_API_KEY` | OpenRouter API key for The Witness |
| `AI_BASE_URL` | AI provider base URL (defaults to OpenRouter) |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID |

## Part of SpiritTree

This project is part of the [SpiritTree](https://spirittree.dev) ecosystem — an autonomous AI operation building tools for the agent economy and displaced workers.

## License

MIT
