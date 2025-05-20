import React from "react";
import { ShoppingBag } from "lucide-react";

const OrderSummary = ({ subtotal, itemCount }) => {
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="font-medium">₹{shipping.toFixed(2)}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Estimated tax</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">
              ₹{total.toFixed(2)}
            </span>
          </div>
          {shipping === 0 && (
            <p className="text-green-600 text-sm mt-1">
              You've qualified for free shipping!
            </p>
          )}
        </div>
      </div>

      <button className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors duration-300 flex items-center justify-center">
        <ShoppingBag size={18} className="mr-2" />
        Proceed to Checkout
      </button>

      <div className="mt-4">
        <button className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
          Continue Shopping
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p className="mb-2">We accept:</p>
        <div className="flex space-x-2">
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
          <div className="w-10 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
