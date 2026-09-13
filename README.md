# Sam Ton's portfolio

The source for [samton.dev](https://samton.dev), the personal portfolio of Ton That Huu Luan. It covers work experience, projects, education, certifications, technical skills, and current Spotify activity.

## What is included

- Separate home, work, about, project, and experience pages
- Project and experience filtering by technology
- Responsive light and dark themes
- Image galleries backed by Cloudflare R2
- Live Spotify activity through a Cloudflare Worker
- Static SPA routing configured for Cloudflare Pages

## Tech stack

- React 19 and TypeScript
- Vite 8
- TanStack Router and TanStack Query
- Tailwind CSS 4 and shadcn/ui
- Cloudflare Pages, R2, and Workers
- Vitest, Oxlint, and Oxfmt

## Run locally

[Bun](https://bun.sh/) is the primary package manager for this repository.

```bash
git clone https://github.com/VNOsST/portfolio-website.git
cd portfolio-website
bun install
bun run dev
```

The development server runs at `http://localhost:3000`.

## Environment variables

Create a `.env.local` file in the project root:

```env
VITE_WEBSITE_URL=http://localhost:3000
VITE_R2_PUBLIC_URL=https://your-bucket.r2.dev
VITE_SPOTIFY_WORKER_URL=https://your-worker.example.com
```

| Variable | Purpose |
| --- | --- |
| `VITE_WEBSITE_URL` | Sets the Open Graph URL in `index.html`. |
| `VITE_R2_PUBLIC_URL` | Supplies the public base URL for project and experience images. |
| `VITE_SPOTIFY_WORKER_URL` | Enables the Spotify activity card. Leave it unset to disable requests. |

The R2 and Spotify integrations are optional for local development. See [docs/R2_IMAGES.md](docs/R2_IMAGES.md) for image upload instructions and [spotify-worker/README.md](spotify-worker/README.md) for Spotify credentials and Worker deployment.

## Available commands

| Command | Description |
| --- | --- |
| `bun run dev` | Start the Vite development server on port 3000. |
| `bun run build` | Create a production build in `dist/`. |
| `bun run preview` | Preview the production build locally. |
| `bun run test` | Run the Vitest test suite once. |
| `bun run lint` | Check the code with Oxlint. |
| `bun run lint:fix` | Fix supported lint issues. |
| `bun run fmt` | Format the code with Oxfmt. |
| `bun run fmt:check` | Check formatting without changing files. |
| `bun run tc` | Run the TypeScript type checker. |

## Editing the portfolio

Most portfolio content lives in typed modules under `src/data/`:

| File | Content |
| --- | --- |
| `src/data/profile.ts` | Name, biography, contact details, and social links |
| `src/data/projects.ts` | Projects, links, screenshots, and technologies |
| `src/data/experiences.ts` | Employment history and role details |
| `src/data/education.ts` | Education history |
| `src/data/certifications.ts` | Certifications and credentials |
| `src/data/skills.ts` | Skill groups and proficiency data |
| `src/data/about.ts` | About page sections |

Routes live in `src/routes/`. TanStack Router generates `src/routeTree.gen.ts`, so that file should not be edited by hand.

## Deployment

The site builds to a static `dist/` directory. For Cloudflare Pages, use:

```text
Build command: bun run build
Build output directory: dist
```

Add the three `VITE_*` values from the environment section to the Pages project as needed. The redirect rule in `public/_redirects` sends client-side routes back to `index.html`.
