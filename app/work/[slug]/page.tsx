import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getProject, getAdjacentProjects } from "@/lib/projects";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { TldrCallout } from "@/components/TldrCallout";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.descriptor,
  };
}

type Loaded = { default: React.ComponentType };

async function loadMdx(slug: string): Promise<Loaded | null> {
  try {
    return (await import(`@/content/projects/${slug}.mdx`)) as Loaded;
  } catch {
    return null;
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const mod = await loadMdx(slug);
  if (!mod) notFound();
  const Content = mod.default;
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <CaseStudyNav title={project.title} />
      <main className="relative">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-14">
          {/* Header */}
          <header className="pt-16 md:pt-24 pb-10 md:pb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft mb-8">
              Work / {project.title}
            </p>
            <h1 className="font-display font-medium tracking-[-0.035em] leading-[1.02] text-[clamp(2.5rem,7vw,5.5rem)] text-ink max-w-[12ch] text-balance">
              {project.title}
            </h1>
            <p
              className="mt-5 text-xl md:text-2xl text-ink-mute italic max-w-[42ch] text-pretty"
              style={{ fontFamily: "var(--font-prose)" }}
            >
              {project.descriptor}
            </p>

            <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl border-t border-rule pt-6">
              <Meta label="Role" value={project.role} />
              <Meta label="Timeframe" value={project.timeframe} />
              <Meta label="Status" value={project.status} />
              <MetaLink
                label="Link"
                href={project.liveUrl}
                value={project.liveLabel}
              />
            </dl>
          </header>

          {/* TL;DR */}
          <div className="mx-auto max-w-[68ch]">
            <TldrCallout text={project.tldr} />

            {/* Body */}
            <article className="prose-editorial">
              <Content />
            </article>
          </div>

          {/* Bottom nav */}
          <nav className="mt-24 mb-20 border-t border-rule pt-8 flex flex-wrap items-center justify-between gap-6">
            <Link
              href="/#work"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <span aria-hidden>←</span>
              <span>Back to work</span>
            </Link>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em]">
              {prev && (
                <Link
                  href={`/work/${prev.slug}`}
                  className="text-ink-soft hover:text-accent transition-colors"
                >
                  <span className="block text-[10px] text-ink-soft mb-0.5">
                    Previous
                  </span>
                  <span className="text-ink">← {prev.title}</span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/work/${next.slug}`}
                  className="text-ink-soft hover:text-accent transition-colors text-right"
                >
                  <span className="block text-[10px] text-ink-soft mb-0.5">
                    Next
                  </span>
                  <span className="text-ink">{next.title} →</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </main>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft mb-1">
        {label}
      </dt>
      <dd className="text-[14px] text-ink">{value}</dd>
    </div>
  );
}

function MetaLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft mb-1">
        {label}
      </dt>
      <dd className="text-[14px]">
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-ink hover:text-accent transition-colors inline-flex items-center gap-1.5"
        >
          {value}
          <ArrowUpRight size={12} weight="regular" />
        </a>
      </dd>
    </div>
  );
}
