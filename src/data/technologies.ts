import {
  IconBrandAws,
  IconBrandAzure,
  IconBrandCypress,
  IconBrandDocker,
  IconBrandFlutter,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
} from "@tabler/icons-react"
import * as TechnologyIcons from "@/components/technology-icons"
import type { Technology, TechnologyId } from "@/types"

export const technologies: Record<TechnologyId, Technology> = {
  aws: { id: "aws", name: "AWS", icon: IconBrandAws },
  lambda: {
    id: "lambda",
    name: "AWS Lambda",
    icon: TechnologyIcons.LambdaIcon,
    parentId: "aws",
  },
  "api-gateway": {
    id: "api-gateway",
    name: "API Gateway",
    icon: TechnologyIcons.APIGatewayIcon,
    parentId: "aws",
  },
  dynamodb: {
    id: "dynamodb",
    name: "DynamoDB",
    icon: TechnologyIcons.DynamoDBIcon,
    parentId: "aws",
  },
  cognito: {
    id: "cognito",
    name: "Cognito",
    icon: TechnologyIcons.CognitoIcon,
    parentId: "aws",
  },
  cloudformation: {
    id: "cloudformation",
    name: "CloudFormation",
    icon: TechnologyIcons.CloudFormationIcon,
    parentId: "aws",
  },
  ecs: {
    id: "ecs",
    name: "ECS",
    icon: TechnologyIcons.ECSIcon,
    parentId: "aws",
  },
  ssm: {
    id: "ssm",
    name: "SSM",
    icon: TechnologyIcons.SSMIcon,
    parentId: "aws",
  },
  docker: { id: "docker", name: "Docker", icon: IconBrandDocker },
  "github-actions": {
    id: "github-actions",
    name: "GitHub Actions",
    icon: TechnologyIcons.GitHubActionsIcon,
  },
  nextjs: {
    id: "nextjs",
    name: "Next.js",
    icon: IconBrandNextjs,
    parentId: "react",
  },
  react: { id: "react", name: "React", icon: IconBrandReact },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    icon: IconBrandTypescript,
  },
  flutter: { id: "flutter", name: "Flutter", icon: IconBrandFlutter },
  azure: { id: "azure", name: "Azure", icon: IconBrandAzure },
  "container-apps": {
    id: "container-apps",
    name: "Container Apps",
    icon: TechnologyIcons.AzureContainerAppsIcon,
    parentId: "azure",
  },
  "static-web-apps": {
    id: "static-web-apps",
    name: "Static Web Apps",
    icon: TechnologyIcons.AzureStaticAppsIcon,
    parentId: "azure",
  },
  "azure-devops": {
    id: "azure-devops",
    name: "Azure DevOps",
    icon: TechnologyIcons.AzureDevOpsIcon,
    parentId: "azure",
  },
  "azure-cosmosdb": {
    id: "azure-cosmosdb",
    name: "Cosmos DB",
    icon: TechnologyIcons.AzureCosmosDbIcon,
    parentId: ["azure", "mongodb"],
  },
  "azure-ai-search": {
    id: "azure-ai-search",
    name: "Azure AI Search",
    icon: TechnologyIcons.AzureAISearchIcon,
    parentId: "azure",
  },
  redis: { id: "redis", name: "Redis", icon: TechnologyIcons.RedisIcon },
  websockets: {
    id: "websockets",
    name: "WebSockets",
    icon: TechnologyIcons.WebSocketIcon,
  },
  "entra-id": { id: "entra-id", name: "Entra ID", icon: TechnologyIcons.EntraIDIcon },
  nodejs: { id: "nodejs", name: "Node.js", icon: IconBrandNodejs },
  python: { id: "python", name: "Python", icon: IconBrandPython },
  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    icon: TechnologyIcons.PostgreSqlIcon,
  },
  mongodb: { id: "mongodb", name: "MongoDB", icon: IconBrandMongodb },
  tailwindcss: {
    id: "tailwindcss",
    name: "Tailwind CSS",
    icon: IconBrandTailwind,
  },
  fastapi: {
    id: "fastapi",
    name: "FastAPI",
    icon: TechnologyIcons.FastApiIcon,
  },
  java: { id: "java", name: "Java", icon: TechnologyIcons.JavaIcon },
  supabase: {
    id: "supabase",
    name: "Supabase",
    icon: IconBrandSupabase,
    parentId: "postgresql",
  },
  jenkins: {
    id: "jenkins",
    name: "Jenkins",
    icon: TechnologyIcons.JenkinsIcon,
  },
  ansible: {
    id: "ansible",
    name: "Ansible",
    icon: TechnologyIcons.AnsibleIcon,
  },
  vitest: { id: "vitest", name: "Vitest", icon: TechnologyIcons.VitestIcon },
  cypress: { id: "cypress", name: "Cypress", icon: IconBrandCypress },
}

export function getTechnology(id: TechnologyId): Technology {
  return technologies[id]
}

export function getDescendants(id: TechnologyId): Array<TechnologyId> {
  const result: Array<TechnologyId> = []
  for (const tech of Object.values(technologies)) {
    if (tech.parentId === id) {
      result.push(tech.id)
      result.push(...getDescendants(tech.id))
    }
  }
  return result
}

export function getTechnologyFilterSet(id: TechnologyId): Set<TechnologyId> {
  return new Set([id, ...getDescendants(id)])
}

export function matchesTechnologyFilter(
  itemTechIds: Array<TechnologyId>,
  filterId: TechnologyId
): boolean {
  const filterSet = getTechnologyFilterSet(filterId)
  return itemTechIds.some((techId) => filterSet.has(techId))
}

export function matchesAnyTechnologyFilter(
  itemTechIds: Array<TechnologyId>,
  filterIds: Array<TechnologyId>
): boolean {
  if (filterIds.length === 0) return true
  return filterIds.some((filterId) =>
    matchesTechnologyFilter(itemTechIds, filterId)
  )
}

export function getAllTechnologyIds(): Array<TechnologyId> {
  return Object.keys(technologies) as Array<TechnologyId>
}

export function getRootTechnologies(): Array<Technology> {
  return Object.values(technologies).filter((t) => !t.parentId)
}
