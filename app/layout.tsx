import "./globals.css"
import Navbar from "../components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-hidden">

        <Navbar />

        <main className="w-full min-h-screen">
          {children}
        </main>

      </body>
    </html>
  )
}