import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/common/Section";
import ErrorState from "@/components/common/ErrorState";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import Spinner from "@/components/ui/Spinner";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsSection() {
  const { products, isLoading, error } = useProducts({ sort: "rating", limit: 6 });

  return (
    <Section id="produits" aria-labelledby="products-title">
      <SectionHeading
        id="products-title"
        title="Produits populaires"
        description="Les pièces les plus demandées, avec leur compatibilité indiquée."
        action={
          <Link to="/products" className="inline-flex items-center gap-1.5 border-b-2 border-accent pb-0.5 font-semibold transition-colors hover:text-accent">
            Voir toutes les pièces<ArrowRight size={18} aria-hidden="true" />
          </Link>
        }
      />
      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : error ? <ErrorState message={error.message} /> : <ProductGrid products={products} />}
    </Section>
  );
}
