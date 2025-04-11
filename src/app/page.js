"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://api.store.inflection.org.in/products/public?limit=20"
        );

        const data = await res.json();

        console.log(data);

        setProducts(data);
      } catch (error) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="grid md:grid-cols-6 gap-3 p-5">
      {products.map((product) => (
        <div key={product.product_code} className="border shadow rounded p-2">
          <img src={product.thumbnail} />
          <h4>{product.product_code}</h4>
          <h3 className="font-medium">{product.product_name}</h3>
        </div>
      ))}
    </div>
  );
}
