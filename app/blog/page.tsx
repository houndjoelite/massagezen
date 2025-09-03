"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  publishedAt: string
  author: string
  category: string
  image: string
  tags: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch("/api/wordpress/posts")
        if (!response.ok) {
          throw new Error("Failed to fetch articles")
        }
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error("Error loading articles:", error)
        setArticles([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }
    loadArticles()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Blog Massage & Bien-être</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Guides d'experts, comparatifs détaillés et conseils professionnels pour optimiser votre bien-être
            </p>
          </div>

          {loading ? (
            <div className="text-center">Chargement des articles...</div>
          ) : articles.length === 0 ? (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Aucun article disponible</h2>
              <p className="text-muted-foreground">Les articles seront bientôt disponibles. Revenez plus tard !</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.image || "/massage-article.png"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>

                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </div>
                          <span>{new Date(post.publishedAt).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
