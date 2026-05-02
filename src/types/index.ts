import type { ComponentType } from "react"
import type { TechnologyId } from "@/data/technologies"
import type { MusicPlatformId } from "@/data/music-platforms"
export type { TechnologyId }

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
  facebook: string
  discord: string
  spotify: string
  steam: string
  summary: string
  avatar?: string
}

export interface Experience {
  id: string
  company: string
  icon?: ComponentType<{ className?: string }>
  location: string
  role: string
  type?: string
  startDate: string
  endDate: string
  highlights: Array<string>
  technologies: Array<TechnologyId>
  tags?: Array<string>
  thumbnail_image?: string
  images?: Array<{ src: string; alt?: string }>
}

export interface Project {
  id: string
  title: string
  description: string
  github?: string
  demo?: string
  youtube?: string
  startDate: string
  endDate: string
  highlights: Array<string>
  technologies: Array<TechnologyId>
  tags?: Array<string>
  thumbnail_image?: string
  images?: Array<{ src: string; alt?: string }>
}

export interface SkillCategory {
  category: string
  skills: Array<TechnologyId>
}

export interface Education {
  institution: string
  icon?: ComponentType<{ className?: string }>
  location: string
  degree: string
  minor?: string
  startDate: string
  endDate: string
  gpa?: string
  scholarsListImage?: string
}

export interface Artist {
  id: string
  name: string
  icon: ComponentType<{ className?: string }>
  platforms: Array<{ platform: MusicPlatformId; url: string }>
}

export interface Sport {
  id: string
  name: string
  icon: ComponentType<{ className?: string; variant?: string }> | null
}

export interface Games {
  id: string
  name: string
  icon: ComponentType<{ className?: string; variant?: string }> | null
}

export type TabValue = "professional" | "personal"
