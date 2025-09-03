import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Product {
  id: string
  name: string
  description: string
  price: string
  originalPrice?: string
  image: string
  category: string
  rating: number
  reviews: number
  features: string[]
  amazonUrl: string
  inStock: boolean
  badge?: string
}

const categoryData = {
  "dos-nuque": {
    name: "Massages pour le dos et la nuque",
    description:
      "Découvrez notre sélection d'appareils de massage spécialement conçus pour soulager les tensions du dos et de la nuque. Des solutions professionnelles pour votre bien-être quotidien.",
    image: "/massage-device-for-back-and-neck.png",
  },
  pieds: {
    name: "Massages des pieds",
    description:
      "Offrez-vous un moment de détente avec nos appareils de massage pour les pieds. Améliorez votre circulation sanguine et soulagez la fatigue de vos pieds.",
    image: "/foot-massage-device.png",
  },
  "pistolets-massage": {
    name: "Pistolets de massage musculaire",
    description:
      "Découvrez la puissance du massage percussif avec nos pistolets de massage professionnels. Parfaits pour la récupération sportive et le soulagement musculaire.",
    image: "/massage-gun-percussion-device.png",
  },
  "fauteuils-massage": {
    name: "Fauteuils de massage",
    description:
      "Transformez votre salon en spa privé avec nos fauteuils de massage haut de gamme. Massage complet du corps pour une relaxation totale.",
    image: "/luxury-massage-chair.png",
  },
  "jambes-mollets": {
    name: "Appareils de massage pour les jambes et mollets",
    description:
      "Soulagez vos jambes lourdes et améliorez votre circulation avec nos appareils spécialisés pour les jambes et mollets.",
    image: "/leg-and-calf-massage-device.png",
  },
  "massage-oculaire": {
    name: "Appareils de massage oculaires",
    description:
      "Détendez vos yeux fatigués avec nos masques et appareils de massage oculaires. Anti-fatigue et relaxation garanties.",
    image: "/eye-massage-device-mask.png",
  },
  "tete-cuir-chevelu": {
    name: "Massage de la tête et cuir chevelu",
    description:
      "Stimulez votre cuir chevelu et détendez-vous avec nos appareils de massage pour la tête. Bien-être et stimulation capillaire.",
    image: "/head-and-scalp-massage-device.png",
  },
  pressotherapie: {
    name: "Appareils de pressothérapie",
    description:
      "Découvrez les bienfaits de la pressothérapie avec nos bottes de compression professionnelles pour la récupération et le drainage lymphatique.",
    image: "/pressotherapy-compression-boots.png",
  },
  mains: {
    name: "Massages des mains",
    description:
      "Soulagez vos mains fatiguées et douloureuses avec nos appareils de massage spécialisés. Parfaits pour l'arthrite et les tensions.",
    image: "/hand-massage-device.png",
  },
  "coussinets-ceintures": {
    name: "Coussinets et ceintures de massage",
    description:
      "Massage portable et chauffant pour tous vos besoins. Utilisez-les partout pour un soulagement instantané.",
    image: "/massage-cushion-and-belt.png",
  },
  multifonctions: {
    name: "Appareils de massage multifonctions",
    description: "Solutions complètes tout-en-un pour tous vos besoins de massage. Polyvalence et efficacité réunies.",
    image: "/multifunction-massage-device.png",
  },
}

export async function generateStaticParams() {
  return Object.keys(categoryData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categoryData[params.slug as keyof typeof categoryData]

  if (!category) {
    return {
      title: "Catégorie non trouvée | MassageZen",
      description: "Cette catégorie n'existe pas.",
    }
  }

  return {
    title: `${category.name} | MassageZen`,
    description: category.description,
  }
}

async function getCategoryProducts(categorySlug: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/wordpress/products?category=${categorySlug}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    if (!response.ok) {
      return []
    }

    const products = await response.json()
    return products
  } catch (error) {
    console.error("Error fetching category products:", error)
    return []
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryData[params.slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Catégorie non trouvée</h1>
          <p className="text-muted-foreground mb-8">Cette catégorie n'existe pas.</p>
          <Link href="/categories">
            <Button>Retour aux catégories</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const products = await getCategoryProducts(params.slug)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/categories">Catégories</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">{category.name}</h1>
                <p className="text-xl text-muted-foreground text-pretty">{category.description}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-sm">
                    {products.length} produit{products.length > 1 ? "s" : ""} disponible
                    {products.length > 1 ? "s" : ""}
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <>
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nos produits recommandés</h2>
                  <p className="text-xl text-muted-foreground">Sélection des meilleurs appareils de cette catégorie</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden rounded-t-lg relative">
                          <Image
                            src={product.image || "/massage-device.png"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.badge && (
                            <div className="absolute top-3 left-3">
                              <Badge variant="default" className="shadow-lg">
                                {product.badge}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-6 space-y-4">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {product.rating} ({product.reviews} avis)
                            </span>
                          </div>

                          <div className="space-y-2">
                            {product.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="text-sm text-muted-foreground">
                                • {feature}
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-primary">{product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    {product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <Button className="w-full" asChild>
                            <Link href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Voir sur Amazon
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Produits bientôt disponibles</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Nous travaillons actuellement sur la sélection des meilleurs produits pour cette catégorie.
                </p>
                <Link href="/categories">
                  <Button variant="outline">Découvrir d'autres catégories</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
