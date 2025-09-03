import { type NextRequest, NextResponse } from "next/server"

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "https://your-domain.com/wp-json/wp/v2"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${params.slug}&_embed`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`)
    }

    const posts = await response.json()

    if (posts.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const post = posts[0]

    // Transform WordPress post to match our Article interface
    const transformedPost = {
      id: post.id.toString(),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
      content: post.content.rendered,
      slug: post.slug,
      publishedAt: post.date,
      author: post._embedded?.author?.[0]?.name || "Admin",
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Non classé",
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/massage-wellness-article.png",
      tags: post._embedded?.["wp:term"]?.[1]?.map((tag: any) => tag.name) || [],
      seo: {
        title: post.yoast_head_json?.title || post.title.rendered,
        description:
          post.yoast_head_json?.description || post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160),
        keywords: post.yoast_head_json?.keywords || [],
      },
    }

    return NextResponse.json(transformedPost)
  } catch (error) {
    console.error("Error fetching WordPress post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
