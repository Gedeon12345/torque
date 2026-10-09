import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from "@/components/common/Section";
import CategoryCard from "@/components/home/CategoryCard";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Spinner from "@/components/ui/Spinner";
import { useCategories } from "@/hooks/useCategories";
import { fadeUp, revealOnScroll, staggerContainer } from "@/utils/motion";

export default function CategoriesSection() {
  const { categories, isLoading } = useCategories();

  return (
    <Section id="categories" aria-labelledby="categories-title">
      <SectionHeading id="categories-title" title="Explorez nos catégories" description="Huit familles de pièces pour entretenir ou réparer votre véhicule." />
      {isLoading ? (
        <div className="flex justify-center py-10"><Spinner /></div>
      ) : (
        <motion.ul variants={staggerContainer(0.06)} {...revealOnScroll} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((category) => (
            <motion.li key={category.slug} variants={fadeUp}><CategoryCard category={category} /></motion.li>
          ))}
        </motion.ul>
      )}
      <div className="mt-7 text-center"><Button as={Link} to="/products" variant="ghost">Voir toutes les catégories</Button></div>
    </Section>
  );
}
