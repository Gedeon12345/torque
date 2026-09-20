import BrandsSection from "@/components/home/BrandsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import CtaSection from "@/components/home/CtaSection";
import Hero from "@/components/home/Hero";
import ProductsSection from "@/components/home/ProductsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import VehicleFinder from "@/components/home/VehicleFinder";
import WhySection from "@/components/home/WhySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VehicleFinder />
      <CategoriesSection />
      <ProductsSection />
      <WhySection />
      <BrandsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
