import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getProjects();
  return (
    <main id="top" className="relative">
      <ScrollProgress />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-14">
        <Hero />
        <Work projects={projects} />
        <Contact />
        <Footer />
      </div>
      <Grain />
    </main>
  );
}

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
