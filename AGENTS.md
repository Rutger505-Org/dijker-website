# dijker-website

Site for "the dijker" (nl + en). Based on Rutger505-Org/nextjs-template: same stack, branch/PR rules and app pitfalls, see that repo's AGENTS.md. **Not on K8s**: own deploy to a VM with Docker Compose + Caddy. Below only what differs.

## Deploy
- `ci.yaml` → local `.github/workflows/deploy.yaml` (not the kubernetes-infrastructure workflow); SSH to the VM, compose up. Details + VM setup: README "Deployments"
- **Prod**: `https://dijker.eu` (`BASE_DOMAIN`). **Previews**: `https://pr-<N>.<PREVIEW_DOMAIN>` = `https://pr-<N>.dijker.rutgerpronk.com` (Strato DNS for dijker.eu has no wildcard); PR close removes the env incl. its DB volume
- Every merge to main (also docs-only) redeploys prod; no `workflow_dispatch`
- Compose projects `dijker-production` / `dijker-pr-<N>`; `migrate` service runs `bun db:migrate` before `web`. Prod DB copy: README "Database on the VM"
- Caddy (`deploy/caddy/Caddyfile`): one proxy for all envs, preview certs on demand (first request is slow), `X-Robots-Tag: noindex` on non-canonical hosts, 301s from old domains (dijkersite.eu, dyker.org, myshelter.nl) to sections on dijker.eu
- `DEPLOYMENT_` values can't contain a single quote
- `NEXT_PUBLIC_SITE_URL` is a build arg from `BASE_DOMAIN` (`src/lib/site.ts`)

## Mail (Strato)
- Contact form `src/app/actions/contact.ts` → `CONTACT_EMAIL`; magic links via the same SMTP
- The four `DEPLOYMENT_AUTH_EMAIL_HOST/PORT/USER/PASSWORD` **must be repo secrets**: org secrets with the same names win over repo variables
- Port 465 only (SSL; STARTTLS 587 fails). From = `AUTH_EMAIL_FROM <AUTH_EMAIL_USER>`; Strato rejects a From that differs from the login

## Content
- next-intl, `messages/nl.json` + `messages/en.json` (keep in sync), default `nl`, `localePrefix: "always"`; `/` → `/nl` permanent redirect in `next.config.ts`; `localeDetection` + `alternateLinks` off on purpose (see `src/i18n/routing.ts`)
- Fonts self-hosted in `src/fonts/` via `next/font/local`; media in `public/media/`
