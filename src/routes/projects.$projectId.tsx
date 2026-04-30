import { createFileRoute, notFound, Link } from "@tanstack/react-router"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectDetail } from "@/components/project-detail"
import { projects } from "@/data/projects"
import { IconArrowLeft } from "@tabler/icons-react"

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetailPage,
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId)
    if (!project) throw notFound()
    return { project }
  },
})

function ProjectDetailPage() {
  const { project } = Route.useLoaderData()

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />
      <main className="pt-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to work
          </Link>
          <ProjectDetail project={project} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
