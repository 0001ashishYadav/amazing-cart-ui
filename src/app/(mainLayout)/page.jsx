"use client";

import ProductCard from "@/component/card";
import CardSlider from "@/component/cardSlider";
import HeroSection from "@/component/home/HeroSection";
import Loader from "@/component/loader";
import { useGlobalContext } from "@/context/GlobalContext";
import { apiClient } from "@/utils/apiClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categories } = useGlobalContext();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getProducts();
      console.log(data);

      if (data.error) {
        alert(data.message);
        setLoading(false);
        return;
      }

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <section>
        <HeroSection />
      </section>

      {/* category section */}
      <section>
        <CardSlider arr={categories} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 px-5">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.product_id}
            discount={product.discount}
          />
        ))}
      </div>

      {/* <div>
        <h3 className="text-2xl font-semibold">Categories</h3>
        <ul className="list-disc">
          {categories.map((category) => (
            <li key={category.id} className="text-lg">
              <Link
                href={`/categories/${category.slug}`}
                className="text-blue-500 hover:underline"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div> */}

      {loading && <Loader />}
    </>
  );
}
