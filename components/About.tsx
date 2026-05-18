import { RevealGroup, RevealItem } from "./RevealOnScroll";

const currently: { label: string; value: string }[] = [
  { label: "Location", value: "Toronto, ON" },
  { label: "Building", value: "Donna — private beta" },
  { label: "Open to", value: "Founding PM / product engineer" },
  { label: "Outside work", value: "Stand-up, yoga, two shepherd-husky mixes" },
];

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 border-t border-rule scroll-mt-20">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft mb-10 md:mb-14">
        About
      </h2>

      <RevealGroup className="grid grid-cols-12 gap-x-6 gap-y-10">
        <RevealItem className="col-span-12 md:col-span-7 lg:col-span-7">
          <div className="space-y-5 text-lg md:text-xl leading-relaxed text-ink-mute max-w-[58ch]">
            <p>
              I&apos;m a product person who builds. Babson undergrad, Master&apos;s
              in AI from Queen&apos;s. Earlier PM stints at{" "}
              <span className="text-ink">Bravado</span> and{" "}
              <span className="text-ink">Experfy</span>, freelance AI consulting
              on the side, and a long-running interest in how AI changes what
              one person can build alone.
            </p>
            <p>
              Outside of work I do stand-up in Toronto, practice yoga, and live
              with two shepherd-husky mixes. I write occasionally about ADHD,
              productivity, and the weird things AI is making possible.
            </p>
            <p>
              If you&apos;re hiring for a founding PM or product engineer role,
              building something and want a partner, or want to talk about any
              of this —{" "}
              <a
                href="mailto:yuchenzhang23@gmail.com"
                className="text-ink underline decoration-accent underline-offset-4 hover:text-accent transition-colors"
              >
                say hi
              </a>
              .
            </p>
          </div>
        </RevealItem>

        <RevealItem className="col-span-12 md:col-span-5 lg:col-start-9 lg:col-span-4">
          <dl className="border-t border-rule">
            {currently.map((c) => (
              <div
                key={c.label}
                className="grid grid-cols-3 gap-3 py-4 border-b border-rule"
              >
                <dt className="col-span-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft pt-0.5">
                  {c.label}
                </dt>
                <dd className="col-span-2 text-[15px] text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
