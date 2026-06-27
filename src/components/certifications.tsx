import { Card, CardHeader } from "@/components/ui/card";
import { certifications } from "@/data/certifications";
import { CredlyBadge } from "@/components/credly-badge";
import { IconCalendar, IconBuilding } from "@tabler/icons-react";
import type { Certification } from "@/types";

function formatCertDate(
  date: Certification["issueDate"] | Certification["expirationDate"],
) {
  if (!date?.month && !date?.year) return null;
  return [date.month, date.year].filter(Boolean).join(" ");
}

function CertificationCard({ cert }: { cert: Certification }) {
  const issueStr = formatCertDate(cert.issueDate);
  const expiryStr = formatCertDate(cert.expirationDate);

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div className="flex items-start gap-4 min-w-0">
            <div className="shrink-0">
              <CredlyBadge
                badgeImage={cert.badgeImage}
                badgeLink={cert.badgeLink}
              />
            </div>
            <div className="min-w-0 space-y-1">
              <h3 className="text-lg font-semibold leading-tight tracking-tight sm:text-xl">
                {cert.name}
              </h3>
              <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
                <IconBuilding className="h-3.5 w-3.5 shrink-0" />
                {cert.issuingOrganization}
              </p>
            </div>
          </div>

          {(issueStr || expiryStr) && (
            <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground">
              {issueStr && (
                <span className="inline-flex items-center gap-1.5">
                  <IconCalendar className="h-3.5 w-3.5" />
                  Issued {issueStr}
                </span>
              )}
              {expiryStr && (
                <span className="inline-flex items-center gap-1.5">
                  <IconCalendar className="h-3.5 w-3.5" />
                  Expires {expiryStr}
                </span>
              )}
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

export function CertificationSection({ compact }: { compact?: boolean }) {
  const content = (
    <>
      <h2
        className={
          compact
            ? "text-xl sm:text-2xl font-bold tracking-tight"
            : "text-xl sm:text-2xl font-bold tracking-tight mb-8"
        }
      >
        Certifications
      </h2>
      <div className="flex flex-col gap-4">
        {certifications.map((cert, idx) => (
          <CertificationCard key={idx} cert={cert} />
        ))}
      </div>
    </>
  );

  if (compact) return content;

  return (
    <section id="certifications" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">{content}</div>
    </section>
  );
}
