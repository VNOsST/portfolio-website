// Cloudflare R2 public bucket base URL
// Set VITE_R2_PUBLIC_URL in your .env file, e.g.:
// VITE_R2_PUBLIC_URL=https://your-bucket.r2.dev
const R2_PUBLIC_URL =
  import.meta.env.VITE_R2_PUBLIC_URL || "https://your-bucket.r2.dev"

/**
 * Build a full public URL for an R2-stored image.
 * @param path Relative path inside the bucket, e.g. "projects/cinecloud/hero.png"
 */
export function buildImageUrl(path: string): string {
  const normalized = path.replace(/^\//, "")
  return `${R2_PUBLIC_URL}/${normalized}`
}
