import { buildImageUrl } from "@/lib/r2";
import type { Certification } from "@/types";

export function CredlyBadge({
  badgeImage,
  badgeLink,
  className = "",
}: {
  badgeImage: Certification["badgeImage"];
  badgeLink: Certification["badgeLink"];
  className?: string;
}) {
  return (
    <a
      href={badgeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block shrink-0"
    >
      <div
        className={`flex h-32 w-32 items-center justify-center rounded-2xl p-3 transition-transform duration-200 group-hover:scale-[1.02] sm:h-28 sm:w-28 ${className}`}
      >
        <img
          src={buildImageUrl(badgeImage)}
          alt="Certification badge"
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
    </a>
  );
}
