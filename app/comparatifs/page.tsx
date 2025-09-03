import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = {
  title: "Comparatifs Appareils de Massage | Tests & Avis Experts | MassageZen",
  description:
    "Comparatifs détaillés et tests professionnels des meilleurs appareils de massage. Avis d'experts pour vous aider à choisir.",
}

const comparisons: any[] = []

export default function ComparatifsPage() {
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
                <BreadcrumbPage>Comparatifs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Comparatifs Experts</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Tests approfondis et comparaisons objectives pour vous aider à faire le meilleur choix
            </p>
          </div>

          <div className="space-y-12">
            {comparisons.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">Aucun comparatif disponible</h3>
                  <p className="text-muted-foreground">
                    Les comparatifs d'appareils de massage seront bientôt disponibles.
                  </p>
                </CardContent>
              </Card>
            ) : (
              comparisons.map((comparison) => (
                <Card key={comparison.title} className="overflow-hidden">
                  <CardHeader className="bg-secondary/30">
                    <CardTitle className="text-2xl">{comparison.title}</CardTitle>
                    <p className="text-muted-foreground">{comparison.subtitle}</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {comparison.products.map((product, index) => (
                        <div
                          key={product.name}
                          className={`p-4 rounded-lg border-2 ${index === 0 ? "border-primary bg-primary/5" : "border-border"}`}
                        >
                          {index === 0 && <Badge className="mb-2">🏆 Gagnant</Badge>}
                          <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-bold text-primary">{product.price}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-medium">{product.rating}</span>
                            </div>
                          </div>
                          <ul className="space-y-1 text-sm">
                            {product.pros.map((pro) => (
                              <li key={pro} className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Notre recommandation :</p>
                        <p className="font-semibold">{comparison.winner}</p>
                      </div>
                      <Button asChild>
                        <a href={comparison.href}>
                          Voir le comparatif complet
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
