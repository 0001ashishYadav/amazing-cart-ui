import React from "react";
import { Trash2, Heart } from "lucide-react";
import { paiseToRupee } from "@/utils/calculation";

const CartItem = ({ item, updateQuantity, removeItem, saveForLater }) => {
  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-6 group">
      <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
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
            ₹ {paiseToRupee(item.price.toFixed(2))}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value) || 1)
              }
              className="w-12 h-8 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => saveForLater(item.product_id)}
              className="flex items-center text-sm text-gray-500 hover:text-pink-600 transition-colors"
            >
              <Heart size={16} className="mr-1" />
              <span className="hidden sm:inline">Save for later</span>
            </button>
            <button
              onClick={() => removeItem(item.product_id)}
              className="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} className="mr-1" />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
