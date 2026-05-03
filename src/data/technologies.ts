import type { ComponentType } from "react"
import {
  IconBrandAws,
  IconBrandAzure,
  IconBrandCypress,
  IconBrandDocker,
  IconBrandFlutter,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandOpenai,
  IconBrandPython,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
} from "@tabler/icons-react"
import {
  LambdaIcon,
  APIGatewayIcon,
  DynamoDBIcon,
  CognitoIcon,
  CloudFormationIcon,
  ECSIcon,
  SSMIcon,
  S3Icon,
  SQSIcon,
  SNSIcon,
  ElasticCacheIcon,
  ECRIcon,
  ALBIcon,
  GitHubActionsIcon,
  HonoIcon,
  TanStackIcon,
  BunIcon,
  ACRIcon,
  AzureContainerAppsIcon,
  AzureStaticAppsIcon,
  AzureDevOpsIcon,
  AzureCosmosDbIcon,
  AzureAISearchIcon,
  WebSocketIcon,
  EntraIDIcon,
  PostgreSqlIcon,
  FastApiIcon,
  JavaIcon,
  CloudflarePagesIcon,
  CloudflareIcon,
  RedisIcon,
  JenkinsIcon,
  AnsibleIcon,
  VitestIcon,
} from "@/components/technology-icons"

export interface Technology {
  id: string
  name: string
  icon: ComponentType<{ className?: string }>
  parentId?: Array<string> | string
}

export const technologies = {
  aws: { id: "aws", name: "AWS", icon: IconBrandAws },
  lambda: {
    id: "lambda",
    name: "Lambda",
    icon: LambdaIcon,
    parentId: "aws",
  },
  "api-gateway": {
    id: "api-gateway",
    name: "API Gateway",
    icon: APIGatewayIcon,
    parentId: "aws",
  },
  dynamodb: {
    id: "dynamodb",
    name: "DynamoDB",
    icon: DynamoDBIcon,
    parentId: "aws",
  },
  cognito: {
    id: "cognito",
    name: "Cognito",
    icon: CognitoIcon,
    parentId: "aws",
  },
  cloudformation: {
    id: "cloudformation",
    name: "CloudFormation",
    icon: CloudFormationIcon,
    parentId: "aws",
  },
  ecs: {
    id: "ecs",
    name: "ECS",
    icon: ECSIcon,
    parentId: "aws",
  },
  ssm: {
    id: "ssm",
    name: "SSM",
    icon: SSMIcon,
    parentId: "aws",
  },
  s3: {
    id: "s3",
    name: "S3",
    icon: S3Icon,
    parentId: "aws",
  },
  sqs: {
    id: "sqs",
    name: "SQS",
    icon: SQSIcon,
    parentId: "aws",
  },
  sns: {
    id: "sns",
    name: "SNS",
    icon: SNSIcon,
    parentId: "aws",
  },
  elasticache: {
    id: "elasticache",
    name: "ElastiCache",
    icon: ElasticCacheIcon,
    parentId: ["aws", "redis"],
  },
  ecr: {
    id: "ecr",
    name: "ECR",
    icon: ECRIcon,
    parentId: ["aws", "docker"],
  },
  alb: {
    id: "alb",
    name: "ALB",
    icon: ALBIcon,
    parentId: "aws",
  },
  docker: { id: "docker", name: "Docker", icon: IconBrandDocker },
  "github-actions": {
    id: "github-actions",
    name: "GitHub Actions",
    icon: GitHubActionsIcon,
  },
  hono: {
    id: "hono",
    name: "Hono",
    icon: HonoIcon,
    parentId: "nodejs",
  },
  tanstackrouter: {
    id: "tanstackrouter",
    name: "TanStack Router",
    icon: TanStackIcon,
    parentId: "react",
  },
  bun: {
    id: "bun",
    name: "Bun",
    icon: BunIcon,
    parentId: "nodejs",
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
  acr: {
    id: "acr",
    name: "Azure Container Registry",
    icon: ACRIcon,
    parentId: ["azure", "docker"],
  },
  "container-apps": {
    id: "container-apps",
    name: "Container Apps",
    icon: AzureContainerAppsIcon,
    parentId: "azure",
  },
  "static-web-apps": {
    id: "static-web-apps",
    name: "Static Web Apps",
    icon: AzureStaticAppsIcon,
    parentId: "azure",
  },
  "azure-devops": {
    id: "azure-devops",
    name: "Azure DevOps",
    icon: AzureDevOpsIcon,
    parentId: "azure",
  },
  "azure-cosmosdb": {
    id: "azure-cosmosdb",
    name: "Azure Cosmos DB",
    icon: AzureCosmosDbIcon,
    parentId: ["azure", "mongodb"],
  },
  "azure-ai-search": {
    id: "azure-ai-search",
    name: "Azure AI Search",
    icon: AzureAISearchIcon,
    parentId: "azure",
  },
  redis: { id: "redis", name: "Redis", icon: RedisIcon },
  websockets: {
    id: "websockets",
    name: "WebSockets",
    icon: WebSocketIcon,
  },
  "entra-id": {
    id: "entra-id",
    name: "Entra ID",
    icon: EntraIDIcon,
  },
  nodejs: { id: "nodejs", name: "Node.js", icon: IconBrandNodejs },
  python: { id: "python", name: "Python", icon: IconBrandPython },
  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    icon: PostgreSqlIcon,
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
    icon: FastApiIcon,
  },
  java: { id: "java", name: "Java", icon: JavaIcon },
  supabase: {
    id: "supabase",
    name: "Supabase",
    icon: IconBrandSupabase,
    parentId: ["postgresql", "s3"],
  },
  jenkins: {
    id: "jenkins",
    name: "Jenkins",
    icon: JenkinsIcon,
  },
  ansible: {
    id: "ansible",
    name: "Ansible",
    icon: AnsibleIcon,
  },
  vitest: { id: "vitest", name: "Vitest", icon: VitestIcon },
  cypress: { id: "cypress", name: "Cypress", icon: IconBrandCypress },
  openai: {
    id: "openai",
    name: "OpenAI Agents SDK",
    icon: IconBrandOpenai,
  },
  "cloudflare-pages": {
    id: "cloudflare-pages",
    name: "Cloudflare Pages",
    icon: CloudflarePagesIcon,
  },
  "cloudflare-r2": {
    id: "cloudflare-r2",
    name: "Cloudflare R2",
    icon: CloudflareIcon,
    parentId: "s3",
  },
} satisfies Record<string, Technology>

export type TechnologyId = keyof typeof technologies

export function getTechnology(id: TechnologyId): Technology {
  return technologies[id]
}

export function getDescendants(id: TechnologyId): Array<TechnologyId> {
  const result: Array<TechnologyId> = []
  for (const tech of Object.values(technologies) as Array<Technology>) {
    const parentIds = Array.isArray(tech.parentId)
      ? tech.parentId
      : tech.parentId
        ? [tech.parentId]
        : []
    if (parentIds.includes(id)) {
      result.push(tech.id as TechnologyId)
      result.push(...getDescendants(tech.id as TechnologyId))
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
  return (Object.values(technologies) as Array<Technology>).filter(
    (t) => !t.parentId
  )
}
