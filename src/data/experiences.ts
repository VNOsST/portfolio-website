import type { Experience } from "@/types"
import { NashTechIcon } from "@/components/technology-icons"
import { TTRIcon } from "@/components/technology-icons/ttr"

export const experiences: Array<Experience> = [
  {
    id: "tuturuuu",
    company: "Tuturuuu",
    icon: TTRIcon,
    location: "Ho Chi Minh City, Vietnam",
    role: "Software Engineer",
    startDate: "Jul 2025",
    endDate: "Mar 2026",
    highlights: [
      "Played a key role in migrating external clients' legacy management systems to modern platforms, improving UX, enabling advanced capabilities, and reducing reliance on outdated workflows, contributing to a 40% reduction in downtime and 25% higher user satisfaction.",
      "Contributed to the development and ongoing evolution of the mobile app, bringing core web experiences to mobile, improving cross-platform consistency, and expanding access for mobile-first users, enabling ~90% feature parity with the web platform and supporting a 30% faster release cadence.",
      "Built and optimized internal productivity and engineering tools, including faster CI pipelines, agentic AI-powered developer tooling, and operational systems for accounting workflows, reducing feedback times by 50%+ and saving 10+ hours/week of manual operational effort.",
      "Strengthened platform security posture by implementing rate limiting that reduced targeted attack traffic from ~800K to ~1K requests, and extended the platform's attribute-based permissions system to protect previously unprotected assets, including finance modules, workspace settings, and admin controls.",
    ],
    technologies: [
      "nextjs",
      "tailwindcss",
      "typescript",
      "github-actions",
      "flutter",
      "supabase",
      "vitest",
    ],
    // tags: ["CI/CD", "AI Tooling", "Security", "Rate Limiting"],
    // Uncomment and update after uploading images to R2:
    // thumbnail_image: "experiences/tuturuuu/tuturuuu-thumbnail.png",
    // images: [
    //   { src: "experiences/tuturuuu/screenshot-1.png", alt: "Platform overview" },
    // ],
  },
  {
    id: "nashtech",
    company: "NashTech",
    location: "Ho Chi Minh City, Vietnam",
    role: "Software Engineer",
    type: "Internship",
    startDate: "May 2025",
    endDate: "Sep 2025",
    icon: NashTechIcon,
    highlights: [
      "Led the design and development of a next-generation Agentic AI support platform over a 6-month capstone, implementing multi-agent RAG workflows, contextual embeddings, and structured outputs that improved response accuracy by 35% and reduced invalid escalations by 25%.",
      "Built core AI chatbot and human-support platform capabilities, including real-time WebSockets with Redis Pub-Sub capabilities, Entra ID authentication, and human escalation queues supporting seamless AI-to-human handoff and reducing average support resolution time by 30%.",
      "Architected and deployed the full cloud-native platform on Azure (Container Apps, Static Web Apps) with secure multi-environment configurations and Azure Pipelines CI/CD, reducing deployment time by 70% and significantly improving developer release velocity.",
      "Designed distributed system components using Redis Pub/Sub and WebSockets for real-time communication at scale.",
    ],
    technologies: [
      "container-apps",
      "static-web-apps",
      "azure-devops",
      "redis",
      "websockets",
      "entra-id",
      "azure-cosmosdb",
      "azure-ai-search",
      "nextjs",
      "tailwindcss",
      "typescript",
      "python",
      "fastapi",
      "docker",
    ],
    // tags: ["Capstone", "Cloud-Native", "Distributed Systems"],
    images: [
      { src: "experiences/nashtech/LeBon/LeBon_1.webp", alt: "LeBon Chat UI" },
      {
        src: "experiences/nashtech/LeBon/LeBon_2.webp",
        alt: "LeBon Chat UI #2",
      },
      {
        src: "experiences/nashtech/LeBon/LeBon_3.webp",
        alt: "Human Support Chat UI",
      },
      {
        src: "experiences/nashtech/LeBon/LeBon_4.webp",
        alt: "LeBon Human Support Escalation UI",
      },
      {
        src: "experiences/nashtech/LeBon/LeBon_5.webp",
        alt: "Human Support Escalation Queue",
      },
      {
        src: "experiences/nashtech/LeBon/LeBon_6.webp",
        alt: "LeBon Authentication Methods",
      },
      {
        src: "experiences/nashtech/LeBon/LeBon_7.webp",
        alt: "LeBon Agents Manager",
      },
      {
        src: "experiences/nashtech/LeBon/LeBon_8.webp",
        alt: "LeBon Agents Manager #2",
      },
      {
        src: "experiences/nashtech/LeBon/LeBon_9.webp",
        alt: "LeBon Home Page",
      },
      {
        src: "experiences/nashtech/LeBon/LeBon_10.webp",
        alt: "LeBon System Architecture",
      },
    ],
  },
]
