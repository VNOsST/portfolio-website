import type React from "react"

export interface Profile {
  name: string
  vietnameseName: string
  englishName: string
  initials: string
  location: string
  phone: string
  email: string
  linkedin: string
  github: string
  summary: string
}

export type TechnologyId =
  | "aws"
  | "lambda"
  | "api-gateway"
  | "dynamodb"
  | "cognito"
  | "sam"
  | "cloudformation"
  | "ecs"
  | "docker"
  | "github-actions"
  | "ssm"
  | "nextjs"
  | "react"
  | "typescript"
  | "flutter"
  | "azure"
  | "container-apps"
  | "static-web-apps"
  | "azure-devops"
  | "redis"
  | "websockets"
  | "ai-rag"
  | "entra-id"
  | "nodejs"
  | "python"
  | "postgresql"
  | "mongodb"
  | "tailwindcss"
  | "fastapi"
  | "java"
  | "supabase"
  | "jenkins"
  | "ansible"
  | "vitest"
  | "cypress"

export interface Technology {
  id: TechnologyId
  name: string
  icon: React.ComponentType<{ className?: string }>
  parentId?: TechnologyId
}

export interface Experience {
  id: string
  company: string
  location: string
  role: string
  type?: string
  startDate: string
  endDate: string
  highlights: Array<string>
  technologies: Array<TechnologyId>
  tags: Array<string>
}

export interface Project {
  id: string
  title: string
  description: string
  github?: string
  demo?: string
  startDate: string
  endDate: string
  highlights: Array<string>
  technologies: Array<TechnologyId>
  tags: Array<string>
}

export interface SkillCategory {
  category: string
  skills: Array<TechnologyId>
}

export interface Education {
  institution: string
  location: string
  degree: string
  minor?: string
  startDate: string
  endDate: string
  gpa?: string
}
