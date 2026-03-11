"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="
      navbar-animated
      w-full
      flex items-center justify-between
      h-16
      px-6 md:px-12 lg:px-16
      bg-gradient-to-r from-black via-zinc-950 to-black
      backdrop-blur-xl
      border-b border-zinc-800
      sticky top-0 z-50
      "
    >
      {/* Logo */}

      <Link
        href="/"
        className="flex items-center h-full"
        onClick={() => setMenuOpen(false)}
      >
        <img
          src="/signature.svg"
          alt="Arya"
          className="
          h-14 md:h-16
          w-auto
          brightness-0
          invert
          opacity-95
          hover:opacity-100
          transition
          "
        />
      </Link>

      {/* Desktop Navigation */}

      <div className="hidden md:flex items-center gap-10 text-sm text-zinc-400">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/experience">Experience</NavItem>
        <NavItem href="/notebook">Notebook</NavItem>
        <NavItem href="/publications">Publications</NavItem>
        <NavItem href="/about">About</NavItem>
      </div>

      {/* Mobile Menu Button */}

      <button
        className="md:hidden text-zinc-400 hover:text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}

      {menuOpen && (
        <div
          className="
          absolute
          top-16 left-0
          w-full
          bg-black/95 backdrop-blur-xl
          border-b border-zinc-800
          flex flex-col items-center
          gap-6 py-8
          md:hidden
          text-zinc-400
          "
        >
          <NavItem href="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavItem>
          <NavItem href="/projects" onClick={() => setMenuOpen(false)}>
            Projects
          </NavItem>
          <NavItem href="/experience" onClick={() => setMenuOpen(false)}>
            Experience
          </NavItem>
          <NavItem href="/notebook" onClick={() => setMenuOpen(false)}>
            Notebook
          </NavItem>
          <NavItem href="/publications" onClick={() => setMenuOpen(false)}>
            Publications
          </NavItem>
          <NavItem href="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavItem>
        </div>
      )}
    </nav>
  );
}


function NavItem({
  href,
  children,
  onClick
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {

  return (
    <Link
      href={href}
      onClick={onClick}
      className="
      relative
      hover:text-white
      transition duration-300
      after:absolute
      after:left-0
      after:-bottom-1
      after:h-[1px]
      after:w-0
      after:bg-gradient-to-r
      after:from-transparent
      after:via-white
      after:to-transparent
      after:transition-all
      after:duration-300
      hover:after:w-full
      "
    >
      {children}
    </Link>
  )
}