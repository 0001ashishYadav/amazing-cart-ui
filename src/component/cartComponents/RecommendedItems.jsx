import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const RecommendedItems = ({ items }) => {
  const { moveToCart } = useCart;

  const handleMovedToCart = (id) => {
    moveToCart(id);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="group">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3 aspect-square">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <button
              onClick={() => handleMovedToCart(item.id)}
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-2 px-4 
                         flex items-center justify-center transform translate-y-full 
                         group-hover:translate-y-0 transition-transform duration-300"
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm font-medium text-gray-900">
            ${item.price.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecommendedItems;
