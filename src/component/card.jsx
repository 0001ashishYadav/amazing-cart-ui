import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border shadow rounded p-2">
      <img src={product.thumbnail} />
      <h4>{product.product_code}</h4>
      <p>{`Rs ${product.price}`}</p>
      <Link href={`/products/${product.slug}`} className="font-medium">
        {product.product_name}
      </Link>
    </div>
  );
};

export default ProductCard;
