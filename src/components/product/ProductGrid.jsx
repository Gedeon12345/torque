import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { fadeUp, revealOnScroll, staggerContainer } from "@/utils/motion";

export default function ProductGrid({ products }) {
  return (
    <motion.ul
      role="list"
      variants={staggerContainer(0.06)}
      {...revealOnScroll}
      className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
    >
      {products.map((product) => (
        <motion.li key={product.id} variants={fadeUp}>
          <ProductCard product={product} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
