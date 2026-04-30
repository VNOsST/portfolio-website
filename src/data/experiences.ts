import type { Experience } from "@/types"

export const experiences: Array<Experience> = [
  {
    id: "tuturuuu",
    company: "Tuturuuu",
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
    technologies: ["nextjs", "react", "typescript", "flutter", "supabase"],
    tags: ["CI/CD", "AI Tooling", "Security", "Rate Limiting"],
    // Uncomment and update after uploading images to R2:
    // thumbnail_image: "experiences/tuturuuu/thumbnail.png",
    // images: [
    //   { src: "experiences/tuturuuu/screenshot-1.png", alt: "Platform overview" },
    // ],
  },
  {
    id: "nashtech",
    company: "Nashtech",
    location: "Ho Chi Minh City, Vietnam",
    role: "Software Engineer",
    type: "Internship",
    startDate: "May 2025",
    endDate: "Sep 2025",
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
    ],
    tags: ["Capstone", "Cloud-Native", "Distributed Systems"],
    // Uncomment and update after uploading images to R2:
    // thumbnail_image: "experiences/nashtech/thumbnail.png",
    // images: [
    //   { src: "experiences/nashtech/screenshot-1.png", alt: "AI chatbot interface" },
    // ],
  },
]
