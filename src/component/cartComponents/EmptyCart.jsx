import React from "react";
import { ShoppingBag } from "lucide-react";
import RecommendedItems from "./RecommendedItems";

const EmptyCart = ({ recommendedItems }) => {
  return (
    <div className="flex flex-col items-center py-12">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <ShoppingBag size={40} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-medium text-gray-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Looks like you haven't added anything to your cart yet. Browse our
        collection and find something you'll love.
      </p>
      <button className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
        Start Shopping
      </button>

      <div className="w-full mt-16">
        <h3 className="text-xl font-medium text-gray-900 mb-6">
          You might also like
        </h3>
        <RecommendedItems items={recommendedItems} />
      </div>
    </div>
  );
};

export default EmptyCart;
