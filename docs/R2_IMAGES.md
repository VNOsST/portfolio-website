# Image Assets (Cloudflare R2)

This project supports hero/thumbnail images and screenshot galleries for **Projects** and **Experiences**, served from Cloudflare R2.

## Quick Start

### 1. Set your R2 public URL

Create a `.env` file in the project root (or copy `.env.example`):

```env
VITE_R2_PUBLIC_URL=https://your-bucket.r2.dev
```

If you have a custom domain for your R2 bucket, use that instead:

```env
VITE_R2_PUBLIC_URL=https://assets.yourdomain.com
```

### 2. Upload images to R2

#### Option A: Wrangler CLI (recommended)

Make sure you have [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated:

```bash
npx wrangler login
```

Upload a file:

```bash
npx wrangler r2 object put <bucket-name>/projects/cinecloud/hero.png --file ./local-image.png
```

Or use the provided helper script:

```bash
# On macOS/Linux:
chmod +x scripts/upload-r2.sh
./scripts/upload-r2.sh <bucket-name> ./local-image.png projects/cinecloud/hero.png
```

#### Option B: Cloudflare Dashboard

Go to your R2 bucket in the Cloudflare Dashboard and drag-and-drop files. Note the object path (e.g. `projects/cinecloud/hero.png`).

#### Option C: S3-compatible tools

R2 is S3-compatible. You can use `aws s3`, `rclone`, or any S3 client with your R2 credentials.

### 3. Reference images in data files

Open `src/data/projects.ts` or `src/data/experiences.ts` and uncomment the image fields:

```ts
export const projects: Array<Project> = [
  {
    id: "cinecloud",
    title: "CineCloud",
    // ... other fields ...
    thumbnail_image: "projects/cinecloud/thumbnail.png",
    images: [
      { src: "projects/cinecloud/screenshot-1.png", alt: "Dashboard view" },
      { src: "projects/cinecloud/screenshot-2.png", alt: "Booking flow" },
    ],
  },
]
```

The `src` paths are **relative to your R2 bucket root**. They are combined with `VITE_R2_PUBLIC_URL` at runtime by the `buildImageUrl()` helper in `src/lib/r2.ts`.

## Image Conventions

| Field | Purpose | Recommended size | Aspect ratio |
|---|---|---|---|
| `thumbnail_image` | Hero image at the top of a card | 1200×675 | 16:9 |
| `images[].src` | Gallery screenshots | 1200×675 | 16:9 |

### Folder structure in R2

```
projects/
  cinecloud/
    thumbnail.png
    screenshot-1.png
    screenshot-2.png
experiences/
  tuturuuu/
    thumbnail.png
    screenshot-1.png
```

## Public Access

Your R2 bucket must allow public access for images to load in the browser. In the Cloudflare Dashboard:

1. Go to **R2** → your bucket → **Settings**
2. Enable **Public access**
3. Note the public URL (or configure a custom domain)

## Troubleshooting

| Issue | Solution |
|---|---|
| Images 404 | Check `VITE_R2_PUBLIC_URL` matches your bucket's public URL |
| Images don't show | Verify the bucket allows public access |
| CORS errors | Add a CORS policy to your R2 bucket allowing your site's origin |
| Build fails | Make sure `src/lib/r2.ts` exists and `VITE_R2_PUBLIC_URL` is set for builds |

## CORS Policy (if needed)

If you deploy to a custom domain and get CORS errors, add this policy to your R2 bucket:

```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com"],
    "AllowedMethods": ["GET"],
    "AllowedHeaders": ["*"]
  }
]
```
