import type { SkillCategory } from "@/types"

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["typescript", "python", "java"],
  },
  {
    category: "Frontend (Web)",
    skills: ["nextjs", "react", "tailwindcss"],
  },
  {
    category: "Mobile",
    skills: ["flutter"],
  },
  {
    category: "Backend & APIs",
    skills: ["nodejs", "fastapi"],
  },
  {
    category: "Databases",
    skills: ["postgresql", "mongodb", "redis", "supabase"],
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
