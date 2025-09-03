import { type NextRequest, NextResponse } from "next/server"

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "https://your-domain.com/wp-json/wp/v2"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "10"
    const category = searchParams.get("category")

    let url = `${WORDPRESS_API_URL}/posts?per_page=${limit}&_embed`

    if (category) {
      url += `&categories=${category}`
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`)
    }

    const posts = await response.json()

    // Transform WordPress posts to match our Article interface
    const transformedPosts = posts.map((post: any) => ({
      id: post.id.toString(),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""), // Strip HTML
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
    }))

    return NextResponse.json(transformedPosts)
  } catch (error) {
    console.error("Error fetching WordPress posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
