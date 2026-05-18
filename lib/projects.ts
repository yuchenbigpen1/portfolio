import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  order: number;
  title: string;
  descriptor: string;
  role: string;
  timeframe: string;
  liveUrl: string;
  liveLabel: string;
  status: string;
  blurb: string;
  tldr: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

let cache: Project[] | null = null;

export function getProjects(): Project[] {
  if (cache) return cache;
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));
  cache = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw);
      return data as Project;
    })
    .sort((a, b) => a.order - b.order);
  return cache;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const all = getProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null,
  };
}
