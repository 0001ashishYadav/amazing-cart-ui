"use client";

import ProductCard from "@/component/card";
import HeroSection from "@/component/home/HeroSection";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://api.store.inflection.org.in/products/public?limit=20"
        );

        const data = await res.json();

        console.log(data);

        setProduct(data);
      } catch (error) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <section>
        <HeroSection />
      </section>

      <ProductCard product={product} />
    </>
  );
}
