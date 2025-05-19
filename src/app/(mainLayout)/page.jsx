"use client";

import ProductCard from "@/component/card";
import HeroSection from "@/component/home/HeroSection";
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.product_id} />
        ))}
      </div>

      <div>
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
      </div>

      {loading && (
        <div className="flex items-center justify-center bg-white fixed inset-0 z-10 h-screen w-full">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
}
