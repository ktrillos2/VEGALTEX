# Tactical gear landing page

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/vegaltex-tactical-colombias-projects/v0-tactical-gear-landing-page)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/osiHgDs2RDn)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/vegaltex-tactical-colombias-projects/v0-tactical-gear-landing-page](https://vercel.com/vegaltex-tactical-colombias-projects/v0-tactical-gear-landing-page)**

## Wompi Setup

To fix 403 errors when opening the Wompi widget, ensure the public key and integrity secret belong to the same Wompi account and environment.

1. Create a `.env.local` file at the project root with:

```
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WOMPI_INTEGRITY_SECRET=test_integrity_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

2. The `WOMPI_INTEGRITY_SECRET` is used server-side to generate the `signature:integrity` from `reference + amountInCents + currency + secret`.

3. The `NEXT_PUBLIC_WOMPI_PUBLIC_KEY` is used client-side by the Wompi widget.

Both must match the same Wompi environment (test or production). If the signature is invalid or mismatched, Wompi responds with 403.

## Build your app

Continue building your app on:

**[https://v0.app/chat/osiHgDs2RDn](https://v0.app/chat/osiHgDs2RDn)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository