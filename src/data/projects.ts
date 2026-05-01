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
    technologies: ["nextjs", "react", "typescript", "tailwindcss", "supabase"],
    thumbnail_image: "projects/exocorpse/exocorpse.webp",
    tags: ["Desktop UI", "Wiki"],
    images: [
      {
        src: "projects/exocorpse/Desktop Environment Interface.webp",
        alt: "Desktop Environment Interface",
      },
      {
        src: "projects/exocorpse/Multi-Window Workflow.webp",
        alt: "Multi-Window Workflow",
      },
      {
        src: "projects/exocorpse/Dynamic Wiki & Content System.webp",
        alt: "Dynamic Wiki & Content System",
      },
      {
        src: "projects/exocorpse/Admin Dashboard & Content Hub.webp",
        alt: "Admin Dashboard & Content Hub",
      },
      {
        src: "projects/exocorpse/Editor & Content Creation Interface.webp",
        alt: "Editor & Content Creation Interface",
      },
    ],
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
      "ecr",
      "alb",
      "s3",
      "sqs",
      "sns",
      "elasticache",
      "ssm",
      "docker",
      "github-actions",
      "hono",
      "bun",
      "tanstackrouter",
      "tailwindcss",
      "typescript",
    ],
    tags: ["Serverless", "Microservices", "Event-Driven", "CI/CD"],
    thumbnail_image: "projects/cinecloud/CineCloud Thumbnail.webp",
    images: [
      {
        src: "projects/cinecloud/CineCloud Architecture.webp",
        alt: "Architecture Diagram",
      },
      {
        src: "projects/cinecloud/CineCloud_1.webp",
        alt: "Backend Deployment Pipeline",
      },
      {
        src: "projects/cinecloud/CineCloud_2.webp",
        alt: "Frontend Deployment Pipeline",
      },
      {
        src: "projects/cinecloud/CineCloud_3.webp",
        alt: "Project CI Pipeline",
      },
      {
        src: "projects/cinecloud/CineCloud_6.webp",
        alt: "Website Home Page",
      },
      {
        src: "projects/cinecloud/CineCloud_4.webp",
        alt: "Movie Details Page",
      },
      {
        src: "projects/cinecloud/CineCloud_7.webp",
        alt: "Showtime Details Page",
      },
      {
        src: "projects/cinecloud/CineCloud_8.webp",
        alt: "Seat Selection Page",
      },
      {
        src: "projects/cinecloud/CineCloud_5.webp",
        alt: "Login & Registration Page with Cognito",
      },
      {
        src: "projects/cinecloud/CineCloud_9.webp",
        alt: "Email Integration with SNS for Admins",
      },
    ],
  },
  {
    id: "rmit-store",
    title: "RMIT Store",
    description:
      "CI/CD Pipeline for a MERN stack e-commerce store, automating build, test, and deployment using Jenkins, Docker, and AWS. Includes containerized microservices, automated testing with Cypress, configuration management with Ansible, monitoring with Prometheus and Grafana, and infrastructure-as-code via CloudFormation.",
    startDate: "Dec 2024",
    endDate: "Jan 2025",
    youtube: "https://youtu.be/_0M0DG_f3eg",
    highlights: [
      "Designed and implemented a full CI/CD pipeline using Jenkins Multibranch Pipelines with GitHub webhooks for event-driven automation across feature, test, and production branches.",
      "Containerized the MERN stack application with Docker, hosted images in AWS ECR, and deployed to separate EC2-based test and production clusters managed by Ansible with dynamic inventory.",
      "Automated infrastructure provisioning using AWS CloudFormation, including VPC, subnets, security groups, EC2 instances, Auto Scaling Groups, and Application Load Balancers with health checks.",
      "Integrated automated testing with Cypress (unit, integration, and E2E) into the pipeline, with email notifications via Jenkins for build status and failure alerts.",
      "Set up real-time monitoring and visualization with Prometheus and Grafana for system metrics and proactive troubleshooting.",
    ],
    technologies: [
      "cloudformation",
      "ecr",
      "alb",
      "docker",
      "jenkins",
      "ansible",
      "cypress",
      "mongodb",
      "nodejs",
    ],
    thumbnail_image: "projects/rmitstore/RMITStoreThumbnail.webp",
    images: [
      {
        src: "projects/rmitstore/RMITStore_CICD.webp",
        alt: "CI/CD Pipeline Diagram",
      },
    ],
    tags: ["CI/CD", "DevOps", "E-Commerce"],
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "A fast, modern portfolio website built as a static SPA with TanStack Router and Vite, deployed to Cloudflare Pages. Features interactive project showcases with hierarchical technology filtering, skill visualizations, and a polished UI with shadcn/ui and Tailwind CSS.",
    github: "https://github.com/VNOsST/portfolio-website",
    demo: "https://samton.dev",
    startDate: "May 2026",
    endDate: "Ongoing!",
    highlights: [
      "Deployed as a static SPA with TanStack Router and Vite to Cloudflare Pages for zero-cost edge hosting, configured a custom domain with DNS and SSL via Cloudflare Domains, and offloaded media files to Cloudflare R2 to leverage zero egress costs.",
      "Designed a responsive, themeable UI with shadcn/ui components, interactive project galleries via Embla Carousel, and skill proficiency visualizations using Recharts.",
      "Structured the entire site as typed data modules (projects, technologies, profile) for easy maintenance and extendability, paired with a custom hierarchical technology icon system featuring hand-crafted SVGs for 30+ platforms and services.",
    ],
    thumbnail_image: "og.png",
    technologies: [
      "tanstackrouter",
      "react",
      "typescript",
      "tailwindcss",
      "cloudflare-pages",
      "cloudflare-r2",
    ],
    tags: ["Portfolio", "SPA"],
  },
]
