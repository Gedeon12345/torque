import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/common/Section";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { products } from "@/data/products";
import { fadeUp, revealOnScroll, staggerContainer } from "@/utils/motion";

export default function ProductsSection() {
  return (
    <Section id="produits" aria-labelledby="products-title">
      <SectionHeading
        id="products-title"
        title="Produits populaires"
        description="Les pièces les plus demandées, avec leur compatibilité indiquée."
        action={
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 border-b-2 border-accent pb-0.5 font-semibold transition-colors hover:text-accent"
          >
            Voir toutes les pièces
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        }
      />

      <motion.ul
 role="list"
        variants={staggerContainer(0.08)}
        {...revealOnScroll}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5"
      >
        {products.map((product) => (
          <motion.li key={product.id} variants={fadeUp}>
            <ProductCard product={product} />
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
