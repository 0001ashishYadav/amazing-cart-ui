"use client";
import { paiseToRupee } from "@/utils/calculation";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product, discount }) => {
  return (
    <>
      {/* // <div className="border shadow rounded p-2">
    //   <img src={product.thumbnail} />
    //   <h4>{product.product_code}</h4>
    //   <p>{`Rs ${product.price}`}</p>
    //   <Link href={`/products/${product.slug}`} className="font-medium">
    //     {product.product_name}
    //   </Link>
    // </div> */}

      <div className="bg-red-100 rounded-lg overflow-hidden shadow-lg ring-1 ring-red-200 ring-opacity-40 max-w-sm">
        <Link href={`/products/${product.slug}`} className="font-medium">
          <div className="relative">
            <img
              className="w-full"
              src={product.thumbnail}
              alt="Product Image"
            />
            <div className="absolute top-0 right-0 bg-red-400 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
              {discount ? `- ${product.discount} %` : "SALE"}
            </div>
          </div>
        </Link>
        <div className="p-4 ">
          <Link href={`/products/${product.slug}`} className="font-medium">
            <h3 className="text-lg font-medium mb-2">{product.product_code}</h3>
            <p className="text-gray-600 text-sm mb-4">{product.product_name}</p>
          </Link>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">{`Rs ${paiseToRupee(
              product.price
            )}`}</span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
