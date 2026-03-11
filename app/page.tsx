"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* ================= PARTICLE BACKGROUND ================= */

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      alphaDir: number;
    }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.5,
        alpha: Math.random(),
        alphaDir: Math.random() > 0.5 ? 0.003 : -0.003,
      });
    }

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;

        if (p.alpha >= 1 || p.alpha <= 0) p.alphaDir *= -1;

        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.6})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ================= SKILL NODE ================= */

function Node({
  label,
  sub,
  style,
}: {
  label: string;
  sub?: string[];
  style?: React.CSSProperties;
}) {
  return (
    <div className="absolute flex flex-col items-center gap-2" style={style}>
      <div className="px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-sm md:text-base text-white font-medium shadow-[0_0_18px_rgba(255,255,255,0.18)] whitespace-nowrap">
        {label}
      </div>

      {sub && (
        <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
          {sub.map((s) => (
            <span
              key={s}
              className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-400"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= GRAPH LINES ================= */

function GraphLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 440 440">
      <defs>
        <linearGradient id="lineGrad">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <line x1="220" y1="40" x2="220" y2="400" stroke="url(#lineGrad)" strokeWidth="1" />
      <line x1="40" y1="220" x2="400" y2="220" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    </svg>
  );
}

/* ================= MAIN PAGE ================= */

export default function Home() {
  return (
    <main className="relative w-full bg-black overflow-hidden min-h-[calc(100vh-64px)]">
      <ParticleCanvas />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 md:px-12 lg:px-20 py-12">
        {/* LEFT SIDE */}

        <div className="flex flex-col justify-center gap-8">
          {/* HERO */}

          <div className="flex items-center gap-6">
            <img
              src="/Profile.jpeg"
              alt="Arya"
              className="w-24 h-24 object-cover rounded-xl border border-zinc-700 shadow-xl"
            />

            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
                Arya Raghavendra Adkoli
              </h1>

              <p className="text-sm md:text-lg text-zinc-400 mt-2">
                Machine Learning · Backend Systems · Distributed Infrastructure
              </p>
            </div>
          </div>

          <p className="text-base md:text-lg text-zinc-500 max-w-lg">
            Building intelligent systems and scalable software platforms.
          </p>

          {/* EXPERIENCE */}

          <div className="space-y-3 text-sm md:text-base">
            <RoleRow
              role="M.Sc. Computer Science"
              org="Technische Universität Dresden"
              period="Oct 2025 – Present"
            />
            <RoleRow
              role="Lead Software Engineer"
              org="Parallel Parking Solutions"
              period="Sept 2024 – Sept 2025"
            />

            <RoleRow
              role="Software Engineer Intern"
              org="Bosch Global Software Technologies"
              period="Jan – May 2024"
            />
          </div>

          {/* SKILLS */}

          <div className="flex flex-wrap gap-2 max-w-xl">
            {[
              "Java",
              "Spring Boot",
              "Python",
              "PostgreSQL",
              "AWS",
              "Docker",
              "Kubernetes",
              "React",
              "TypeScript",
              "REST APIs",
              "PyTorch",
              "OpenCV",
            ].map((s) => (
              <span
                key={s}
                className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300"
              >
                {s}
              </span>
            ))}
          </div>

          {/* BUTTONS */}

          <div className="flex gap-4">
            <Link
              href="/projects"
              className="px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition"
            >
              Projects
            </Link>

            <Link
              href="/about"
              className="px-6 py-2 border border-zinc-700 text-zinc-300 rounded-lg text-sm hover:border-zinc-500 transition"
            >
              About
            </Link>
          </div>

          {/* PUBLICATIONS */}

          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3">
              Featured Publications
            </p>

            <div className="space-y-3">
              <PubCard
                title="Optimal Urban Emergency Routing using Real-Time Audio Recognition"
                venue="ICICC 2024 · Springer"
                type="audio"
              />

              <PubCard
                title="Real-Time Intelligent Surveillance System using Machine Learning"
                venue="IEEE ICASI 2024 · Kyoto"
                type="vision"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex flex-col items-center justify-center gap-10">
          {/* SKILL GRAPH */}

          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px]">
            <GraphLines />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-5 py-3 bg-zinc-800 border border-zinc-500 rounded-xl text-base text-white font-semibold shadow-[0_0_26px_rgba(255,255,255,0.22)] text-center">
                Core Systems
                <p className="text-xs text-zinc-500 mt-1">
                  ML · Backend · Distributed
                </p>
              </div>
            </div>

            <Node
              label="Machine Learning"
              sub={["PyTorch", "OpenCV", "Scikit-Learn", "NumPy"]}
              style={{ top: 8, left: "50%", transform: "translateX(-50%)" }}
            />

            <Node
              label="Backend Systems"
              sub={[
                "Java & Spring Boot",
                "REST APIs",
                "PostgreSQL",
                "Microservices",
              ]}
              style={{ top: "50%", right: "-30px", transform: "translateY(-50%)" }}
            />

            <Node
              label="Infrastructure"
              sub={["Docker", "Kubernetes", "AWS", "CI/CD"]}
              style={{ bottom: 8, left: "50%", transform: "translateX(-50%)" }}
            />

            <Node
              label="Frontend"
              sub={["React", "Next.js", "TypeScript", "Tailwind"]}
              style={{ top: "50%", left: "-20px", transform: "translateY(-50%)" }}
            />
          </div>

          {/* CARDS */}

          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <InfoCard
              title="Engineering Notebook"
              desc="System design notes, ML infrastructure, distributed systems research."
              href="/notebook"
            />

            <InfoCard
              title="Projects"
              desc="Autonomous vehicles, distributed simulators, secure auth systems."
              href="/projects"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= SMALL COMPONENTS ================= */

function RoleRow({
  role,
  org,
  period,
}: {
  role: string;
  org: string;
  period: string;
}) {
  return (
    <div className="flex justify-between text-sm md:text-base">
      <div>
        <span className="text-zinc-300">{role}</span>
        <span className="text-zinc-500"> — </span>
        <span className="text-white font-medium">{org}</span>
      </div>
      <span className="text-zinc-600 text-xs whitespace-nowrap">{period}</span>
    </div>
  );
}

function PubCard({
  title,
  venue,
  type,
}: {
  title: string;
  venue: string;
  type: "audio" | "vision";
}) {
  return (
    <div className="relative bg-zinc-900/70 border border-zinc-800 rounded-lg px-4 py-3 hover:border-zinc-600 transition flex items-start gap-3">

      <div className="flex-shrink-0 mt-1">
        {type === "audio" ? (
          <svg className="w-12 h-5 opacity-70" viewBox="0 0 60 24">
            <path
              d="M0 12 Q10 2 20 12 T40 12 T60 12"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <animate
                attributeName="d"
                dur="1.8s"
                repeatCount="indefinite"
                values="M0 12 Q10 2 20 12 T40 12 T60 12;M0 12 Q10 22 20 12 T40 12 T60 12;M0 12 Q10 2 20 12 T40 12 T60 12"
              />
            </path>
          </svg>
        ) : (
          <div className="w-5 h-5 border border-zinc-400 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-zinc-400 rounded-full" />
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-white">{title}</p>
        <p className="text-xs text-zinc-500 mt-1">{venue}</p>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 hover:border-zinc-600 transition"
    >
      <p className="text-sm text-white font-medium mb-1">{title}</p>
      <p className="text-xs text-zinc-500">{desc}</p>
      <p className="text-xs text-zinc-400 mt-2">Explore →</p>
    </Link>
  );
}