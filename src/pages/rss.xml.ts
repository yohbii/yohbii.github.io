import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { getPostUrl, isPublished, sortPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export async function GET(context: { site: URL }) {
  const posts = sortPosts((await getCollection("blog")).filter(isPublished));

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: getPostUrl(post)
    }))
  });
}
