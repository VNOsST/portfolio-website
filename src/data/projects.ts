import type { Project } from "@/types"

export const projects: Array<Project> = [
  {
    id: "cinecloud",
    title: "CineCloud",
    description:
      "Cloud-Native Cinema Booking Platform — A full-stack serverless microservices application built on AWS with automated CI/CD, event-driven architecture, and containerized frontend deployment.",
    github: "https://github.com/VNOsST/cosc2822-group-project",
    startDate: "Dec 2025",
    endDate: "Jan 2026",
    highlights: [
      "Designed and deployed a serverless microservices architecture on AWS (Lambda, API Gateway, DynamoDB, Cognito) with infrastructure fully defined in AWS SAM and CloudFormation, including VPC networking, SQS/SNS event-driven pipelines, and ElastiCache Redis.",
      "Containerized the frontend with Docker multi-stage builds and deployed to ECS with auto-scaling EC2 instances behind an Application Load Balancer, managed via CloudFormation.",
      "Automated end-to-end deployments using GitHub Actions for both backend (SAM) and frontend (Docker → ECR → ECS), supporting parameterized multi-environment releases via SSM Parameter Store.",
    ],
    technologies: [
      "aws",
      "lambda",
      "api-gateway",
      "dynamodb",
      "cognito",
      "sam",
      "cloudformation",
      "ecs",
      "docker",
      "github-actions",
      "ssm",
    ],
    tags: ["Serverless", "Microservices", "Event-Driven", "CI/CD"],
  },
]
