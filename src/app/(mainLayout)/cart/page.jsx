"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import CartItem from "@/component/cartComponents/CartItem";
import OrderSummary from "@/component/cartComponents/OrderSummery";
import EmptyCart from "@/component/cartComponents/EmptyCart";
import SavedItems from "@/component/cartComponents/SavedItems";
import { useCart } from "@/hooks/useCart";
import { recommendedItems } from "@/data/cartData";
import { paiseToRupee } from "@/utils/calculation";
import ProtectedRoutes from "@/component/ProtectedRoutes";

const MyCartPage = () => {
  const {
    cart,
    savedItems,
    updateQuantity,
    removeItem,
    saveForLater,
    moveToCart,
    getSubtotal,
    getItemCount,
  } = useCart();

  return (
    <ProtectedRoutes>
      <div className="min-h-screen bg-gray-50">
        {/* <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">AmazingCart</h1>
            <div className="flex items-center">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingBag size={22} />
              </button>
            </div>
          </div>
        </div>
      </header> */}

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-medium text-gray-900">
              Shopping Cart
            </h1>
            {cart.length > 0 && (
              <span className="text-gray-600">{getItemCount()} items</span>
            )}
          </div>

          {cart.length === 0 ? (
            <EmptyCart recommendedItems={recommendedItems} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        saveForLater={saveForLater}
                      />
                    ))}
                  </div>
                </div>

                <SavedItems
                  items={savedItems}
                  moveToCart={moveToCart}
                  removeItem={(id) => {
                    const index = savedItems.findIndex(
                      (item) => item.id === id
                    );
                    if (index !== -1) {
                      const newSavedItems = [...savedItems];
                      newSavedItems.splice(index, 1);
                    }
                  }}
                />

                <div className="mt-12">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">
                    You might also like
                  </h2>
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {recommendedItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="group">
                          <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-3 aspect-square">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                            <button
                              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-2 px-4 
                                      flex items-center justify-center transform translate-y-full 
                                      group-hover:translate-y-0 transition-transform duration-300"
                            >
                              <ShoppingBag size={16} className="mr-2" />
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
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={paiseToRupee(getSubtotal())}
                  itemCount={getItemCount()}
                />
              </div>
            </div>
          )}
        </main>

        <footer className="bg-white border-t border-gray-200 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Shop</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Women
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Men
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Accessories
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Support
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Returns
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Company
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-pink-600 transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Connect
                </h3>
                <div className="flex space-x-4 mb-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </a>
                </div>
                <p className="text-sm text-gray-600">
                  Subscribe to our newsletter for the latest updates.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 mt-8 text-sm text-gray-500 text-center">
              <p>© 2025 FASHION. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoutes>
  );
};

export default MyCartPage;
