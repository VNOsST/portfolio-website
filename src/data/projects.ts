import type { Project } from "@/types"

export const projects: Array<Project> = [
  {
    id: "exocorpse",
    title: "Exocorpse",
    description:
      "A Next.js desktop-style portfolio application with an integrated fantasy wiki system, inspired by the lore of Exocorpse — an underground corporation devoted to cleansing humanity's sins through heists, assassinations, and information manipulation.",
    github: "https://github.com/tutur3u/exocorpse",
    demo: "https://exocorpse.net",
    startDate: "Oct 2025",
    endDate: "Dec 2025",
    highlights: [
      "Built a draggable, resizable desktop-style interface with window management (minimize, maximize, restore, close), z-index stacking, and focus management.",
      "Developed a comprehensive wiki system with hierarchical structure — Stories → Worlds → Characters & Factions — backed by Supabase with full CRUD operations.",
      "Implemented dynamic theming that changes per story/world, character profiles with outfits, backstory, moodboards, galleries, and faction management with character relationships.",
    ],
    technologies: [
      "nextjs",
      "react",
      "typescript",
      "tailwindcss",
      "supabase",
    ],
    "thumbnail_image": "projects/exocorpse/exocorpse.webp",
    tags: ["Desktop UI", "Wiki"],
  },
  {
    id: "cinecloud",
    title: "CineCloud",
    description:
      "Cloud-Native Cinema Booking Platform — A full-stack serverless microservices application built on AWS with automated CI/CD, event-driven architecture, and containerized frontend deployment.",
    github: "https://github.com/VNOsST/cosc2822-group-project",
    youtube: "https://www.youtube.com/watch?v=mXtfZrv2YZ0",
    startDate: "Dec 2025",
    endDate: "Jan 2026",
    highlights: [
      "Designed and deployed a serverless microservices architecture on AWS (Lambda, API Gateway, DynamoDB, Cognito) with infrastructure fully defined in AWS SAM and CloudFormation, including VPC networking, SQS/SNS event-driven pipelines, and ElastiCache Redis.",
      "Containerized the frontend with Docker multi-stage builds and deployed to ECS with auto-scaling EC2 instances behind an Application Load Balancer, managed via CloudFormation.",
      "Automated end-to-end deployments using GitHub Actions for both backend (SAM) and frontend (Docker → ECR → ECS), supporting parameterized multi-environment releases via SSM Parameter Store.",
    ],
    technologies: [
      "lambda",
      "api-gateway",
      "dynamodb",
      "cognito",
      "cloudformation",
      "ecs",
      "docker",
      "github-actions",
      "ssm",
    ],
    tags: ["Serverless", "Microservices", "Event-Driven", "CI/CD"],
    // Uncomment and update after uploading images to R2:
    // thumbnail_image: "experiences/tuturuuu/tuturuuu-thumbnail.png",
    images: [
      {
        src: "projects/cinecloud/CineCloud Architecture.webp",
        alt: "Architecture Diagram",
      },
    ],
  },
]
