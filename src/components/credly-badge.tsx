import { buildImageUrl } from "@/lib/r2";
import type { Certification } from "@/types";

export function CredlyBadge({
  badgeImage,
  badgeLink,
}: {
  badgeImage: Certification["badgeImage"];
  badgeLink: Certification["badgeLink"];
}) {
  return (
    <a
      href={badgeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block shrink-0"
    >
      <div className="flex h-28 w-28 items-center justify-center rounded-2xl p-3 transition-transform duration-200 group-hover:scale-[1.02] sm:h-32 sm:w-32">
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
