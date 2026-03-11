export default function Experience() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16">

      <h1 className="text-4xl font-semibold text-white mb-10">
        Experience
      </h1>

      <div className="space-y-8">

        <ExperienceItem
          company="Parallel Parking Solutions"
          role="Software Engineer"
          description="Built scalable backend systems, rule engines for parking sessions, and event-driven data pipelines."
        />

        <ExperienceItem
          company="Bosch"
          role="Software Engineer Intern"
          description="Developed real-time sensor analytics pipelines and anomaly detection systems."
        />

      </div>

    </main>
  )
}

function ExperienceItem({
  company,
  role,
  description
}: {
  company: string
  role: string
  description: string
}) {

  return (
    <div className="border border-zinc-800 rounded-xl p-6">

      <h2 className="text-white text-xl">
        {role}
      </h2>

      <p className="text-zinc-400 mt-1">
        {company}
      </p>

      <p className="text-zinc-500 mt-3">
        {description}
      </p>

    </div>
  )
}