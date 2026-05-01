import type { SkillCategory } from "@/types"

export const skills: Array<SkillCategory> = [
  {
    category: "Languages",
    skills: ["typescript", "python", "java"],
  },
  {
    category: "Frontend (Web)",
    skills: ["nextjs", "react", "tailwindcss", "tanstackstart"],
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
    category: "Databases",
    skills: ["postgresql", "mongodb", "redis", "supabase", "azure-cosmosdb"],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "docker",
      "aws",
      "azure",
      "github-actions",
      "azure-devops",
      "jenkins",
      "ansible",
    ],
  },
  {
    category: "Testing",
    skills: ["vitest", "cypress"],
  },
]
