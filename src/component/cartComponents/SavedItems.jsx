import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { paiseToRupee } from "@/utils/calculation";

const SavedItems = ({ items, moveToCart, removeItem }) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-medium text-gray-900 mb-6">
        Saved for Later ({items.length})
      </h2>
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.product_id}
            className="flex flex-col sm:flex-row border-b border-gray-200 pb-6 group"
          >
            <div className="w-full sm:w-1/5 mb-4 sm:mb-0">
              <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-100">
                <img
                  src={item.product_thumbnail}
                  alt={item.product_name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="flex-1 sm:ml-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {item.product_name}
                </h3>
                <div className="mt-1 text-sm text-gray-500">
                  <span className="mr-4">Size: {item.size}</span>
                  <span>Color: {item.color}</span>
                </div>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ₹{paiseToRupee(item.price.toFixed(2))}
                </p>
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => moveToCart(item.product_id)}
                  className="flex items-center text-sm text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <ShoppingCart size={16} className="mr-1" />
                  Move to Cart
                </button>
                <button
                  onClick={() => removeItem(item.product_id)}
                  className="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} className="mr-1" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;
