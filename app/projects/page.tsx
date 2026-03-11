export default function Projects() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16">

      <h1 className="text-4xl font-semibold text-white mb-10">
        Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <ProjectCard
          title="Distributed Systems Simulator"
          description="Simulation platform for testing consistency models, node failures, and network partitions."
        />

        <ProjectCard
          title="Fake Currency Detector"
          description="Machine learning system to detect counterfeit notes using image processing."
        />

        <ProjectCard
          title="FPGA Hardware Project"
          description="Custom hardware implementation exploring digital logic and performance optimization."
        />

        <ProjectCard
          title="Autonomous Vehicle"
          description="Raspberry Pi based autonomous navigation using computer vision and ML."
        />

      </div>

    </main>
  )
}

function ProjectCard({
  title,
  description
}: {
  title: string
  description: string
}) {

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition">

      <h2 className="text-xl text-white mb-2">
        {title}
      </h2>

      <p className="text-zinc-400">
        {description}
      </p>

    </div>
  )
}