import type { SkillCategory } from "@/types"

export const skills: Array<SkillCategory> = [
  {
    category: "Languages",
    skills: ["typescript", "python", "java"],
  },
  {
    category: "Frontend (Web)",
    skills: ["nextjs", "react", "tailwindcss", "tanstackrouter"],
  },
  {
    category: "Mobile",
    skills: ["flutter"],
  },
  {
    category: "Backend & APIs",
    skills: ["nodejs", "bun", "fastapi", "hono"],
  },
  {
    category: "Databases & Storage",
    skills: ["postgresql", "supabase", "mongodb", "redis", "s3"],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "aws",
      "azure",
      "github-actions",
      "azure-devops",
      "docker",
      "jenkins",
      "ansible",
    ],
  },
  {
    category: "Testing",
    skills: ["vitest", "cypress"],
  },
]
