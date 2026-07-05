import type { Certification } from "@/types"

export const certifications: Array<Certification> = [
  {
    name: "Associate Cloud Engineer",
    issuingOrganization: "Google",
    issueDate: { month: "Jun", year: 2026 },
    expirationDate: { month: "Jun", year: 2029 },
    badgeImage: "certificates/associate-cloud-engineer-certification.png",
    badgeLink:
      "https://www.credly.com/badges/83522746-a1db-4e92-b5a5-f84bcf050e6a/public_url",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuingOrganization: "Amazon Web Services (AWS)",
    issueDate: { month: "Jun", year: 2026 },
    expirationDate: { month: "Jun", year: 2029 },
    badgeImage: "certificates/aws-certified-cloud-practitioner.png",
    badgeLink:
      "https://www.credly.com/badges/1bf8a8b8-3e45-4122-b502-5c6ff7988d99/public_url",
  },
]
