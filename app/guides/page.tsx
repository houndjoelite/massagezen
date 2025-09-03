import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = {
  title: "Guides d'Achat Massage | Conseils Experts | MassageZen",
  description:
    "Guides d'achat complets pour choisir vos appareils de massage. Conseils d'experts, critères de sélection et recommandations personnalisées.",
}

const guides: any[] = []

const difficultyColors = {
  Facile: "bg-green-100 text-green-800",
  Intermédiaire: "bg-yellow-100 text-yellow-800",
  Avancé: "bg-red-100 text-red-800",
}

export default function GuidesPage() {
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
                <BreadcrumbPage>Guides</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Guides d'Achat Experts</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Conseils professionnels et guides détaillés pour faire les meilleurs choix selon vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.length === 0 ? (
              <div className="md:col-span-2">
                <Card className="text-center py-12">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">Aucun guide disponible</h3>
                    <p className="text-muted-foreground">
                      Les guides d'achat pour appareils de massage seront bientôt disponibles.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              guides.map((guide) => (
                <Link key={guide.title} href={guide.href}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={guide.image || "/placeholder.svg"}
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{guide.category}</Badge>
                          <Badge className={difficultyColors[guide.difficulty as keyof typeof difficultyColors]}>
                            {guide.difficulty}
                          </Badge>
                        </div>

                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {guide.title}
                        </h3>

                        <p className="text-muted-foreground line-clamp-3">{guide.excerpt}</p>

                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Guide complet
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {guide.readTime}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
