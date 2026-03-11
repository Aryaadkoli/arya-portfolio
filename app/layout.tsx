import "./globals.css"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <nav className="flex gap-6 p-6 border-b">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/notebook">Notebook</Link>
          <Link href="/publications">Publications</Link>
          <Link href="/about">About</Link>
        </nav>

        {children}

      </body>
    </html>
  )
}