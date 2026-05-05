import { createFileRoute, notFound, Link } from "@tanstack/react-router"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExperienceDetail } from "@/components/experience-detail"
import { experiences } from "@/data/experiences"
import { IconArrowLeft } from "@tabler/icons-react"

export const Route = createFileRoute("/experiences/$experienceId")({
  component: ExperienceDetailPage,
  loader: ({ params }) => {
    const experience = experiences.find((e) => e.id === params.experienceId)
    if (!experience) throw notFound()
    return { experience }
  },
})

function ExperienceDetailPage() {
  const { experience } = Route.useLoaderData()

  return (
    <div className="min-h-svh bg-background/88 text-foreground">
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
          <ExperienceDetail experience={experience} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
