import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export const categoryLabels: Record<BlogPost["data"]["category"], string> = {
  research: "Research",
  notes: "Notes",
  life: "Life"
};

export function isPublished(post: BlogPost) {
  return !post.data.draft;
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
}

export function getPostUrl(post: BlogPost) {
  return `/blog/${post.id}/`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function collectTags(posts: BlogPost[]) {
  const tags = new Map<string, { label: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugify(tag);
      const existing = tags.get(slug);
      tags.set(slug, {
        label: existing?.label ?? tag,
        count: (existing?.count ?? 0) + 1
      });
    }
  }

  return [...tags.entries()]
    .map(([slug, tag]) => ({ slug, ...tag }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function collectCategories(posts: BlogPost[]) {
  return Object.entries(categoryLabels)
    .map(([category, label]) => ({
      category: category as BlogPost["data"]["category"],
      label,
      count: posts.filter((post) => post.data.category === category).length
    }))
    .filter((category) => category.count > 0);
}
