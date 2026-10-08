# Next template

Next.js template for my personal needs.

## Getting started

### Development

Copy the [.env.example](.env.example) file to a new file `.env` and fill in the variables.

```bash
cp .env.example .env
```

Run the database migration command:

```bash
bun db:migrate
```

Then start the development server:

```bash
bun dev
```

### Using template

#### Variables

- `APPLICATION_NAME` - Docker Hub image name.
- `BASE_DOMAIN` - Domain where to host the application. `main` is deployed to this domain; pull requests to `pr-<number>.<BASE_DOMAIN>`.
- `VM_HOST` - Public IP or hostname of the deploy VM.
- `VM_USER` - SSH user on the VM (`dijker`).
- `VM_KNOWN_HOSTS` - The VM's SSH host key line(s), from `ssh-keyscan <VM_HOST>`.
- `DEPLOYMENT_AUTH_EMAIL_FROM` - Display name shown as the sender of the magic link emails (e.g. `Next Template`). The actual sender address is taken from `AUTH_EMAIL_USER`; the `From` header is composed as `AUTH_EMAIL_FROM <AUTH_EMAIL_USER>`.
- `DEPLOYMENT_CONTACT_EMAIL` - Address the contact form delivers to (`info@dijker.eu`).

The following variables are configured at the organisation level and are inherited automatically — no action needed per repository.

- `DOCKERHUB_USERNAME` - Docker Hub username for pushing images.

#### Secrets

The following secrets must be configured per repository.

- `DEPLOYMENT_AUTH_SECRET` - Better Auth secret for encrypting JWTs (generate with `bunx auth secret --raw`).
- `DEPLOYMENT_DISCORD_WEBHOOK_URL` - Discord webhook URL for in-application alerts.
- `VM_SSH_KEY` - Private key of the deploy key pair, whose public key is in `~dijker/.ssh/authorized_keys` on the VM.
- `DEPLOYMENT_AUTH_EMAIL_HOST` - SMTP host, `smtp.strato.com`.
- `DEPLOYMENT_AUTH_EMAIL_PORT` - SMTP port, `465`. The app always connects with SSL, so STARTTLS on `587` won't work.
- `DEPLOYMENT_AUTH_EMAIL_USER` - Full Strato mailbox address, e.g. `development@dijker.eu`. It is also the sender address, as Strato rejects mail whose From differs from the login.
- `DEPLOYMENT_AUTH_EMAIL_PASSWORD` - Password of that Strato mailbox.

The four mail settings must be repository **secrets**: the organisation has secrets with the same names, and a secret always wins over a variable.

The following secrets are configured at the organisation level and are inherited automatically — no action needed per repository.

- `DOCKERHUB_TOKEN` - Docker Hub access token.

## Deployments

Everything runs on a single VM with Docker Compose, deployed over SSH by [deploy.yaml](.github/workflows/deploy.yaml):

- Push to `main` → production on `<BASE_DOMAIN>`.
- Pull request → preview on `pr-<number>.<BASE_DOMAIN>`, removed (including its database) when the PR closes.

On the VM, `~/dijker-website/` holds the files from [deploy/](deploy) plus `env/<environment>.env`, all uploaded by CI:

- `compose.proxy.yml` - one Caddy for all environments, terminating TLS with Let's Encrypt certificates. Previews get theirs on demand on first request.
- `compose.app.yml` - one compose project per environment (`dijker-production`, `dijker-pr-12`, ...), each with its own SQLite volume. The `migrate` service runs `bun db:migrate` before `web` starts.

To pass additional environment variables to the running container, create a GitHub variable or secret and prefix the name with `DEPLOYMENT_`. The prefix is stripped before the value is injected into the container. Values can't contain a single quote.

### VM setup

- Docker with the compose plugin.
- A `dijker` user in the `docker` group, with the deploy public key in `~/.ssh/authorized_keys`.
- Ports `22`, `80` and `443` open.
- DNS `A` records for `<BASE_DOMAIN>` and `*.<BASE_DOMAIN>` pointing to the VM.
- DNS `A` records for the old domain `dijkersite.eu` and `www.dijkersite.eu` pointing to the VM. Caddy 301-redirects every old page to its section on `<BASE_DOMAIN>` (see the [Caddyfile](deploy/caddy/Caddyfile)).

## Guides

### Database

#### Migrations

To create a new migration, run the following command:

```bash
bun db:generate -- --name "<migration-name>"
```

Then to run all migrations, run:

```bash
bun db:migrate
```

When migration is imperfect,
delete the migration file, delete the new snapshot file in the meta-folder and roll back the \_journal.json file.

When thats done you can run the migration command again.

#### Database on the VM

Copy the production SQLite file off the VM:

```bash
ssh dijker@<VM_HOST> docker cp dijker-production-web-1:/app/data/db.sqlite - > prod-db.tar
```
