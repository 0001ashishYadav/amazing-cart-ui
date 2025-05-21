import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Eye,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function CardSlider({ arr }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);

  const categories = arr;

  const scrollToActive = (index) => {
    if (sliderRef.current) {
      const cards = sliderRef.current.querySelectorAll(".category-card");
      if (cards[index]) {
        const containerWidth = sliderRef.current.offsetWidth;
        const cardWidth = cards[index].offsetWidth;
        const cardLeft = cards[index].offsetLeft;

        // Calculate center position - account for multiple visible cards
        const scrollPosition = cardLeft - containerWidth / 2 + cardWidth / 2;

        sliderRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (activeIndex < categories.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const handlePrev = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(categories.length - 1);
    }
  };

  // Reset auto-scroll when user interacts
  const handleCardClick = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveIndex(index);
  };

  // Auto-scroll functionality
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 4000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex]);

  useEffect(() => {
    scrollToActive(activeIndex);
  }, [activeIndex]);

  // For visible cards calculation
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 5;
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 3; // Default for SSR
  };

  return (
    <div className="w-full  py-10">
      <div className=" max-w-7xl bg-red-100/30 rounded-2xl py-5 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Shop by Category
            </h2>
            <p className="text-gray-500 text-sm">
              Explore our collection of premium products
            </p>
          </div>

          <div className="flex items-center mt-4 sm:mt-0">
            <span className="mr-4 text-sm font-medium text-gray-500">
              {activeIndex + 1} / {categories.length}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Previous category"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Next category"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto  gap-4 pb-6 pt-2 scrollbar-hide scroll-smooth snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`category-card flex-shrink-0 snap-center transition-all duration-300
                  w-40 sm:w-56 md:w-64
                  ${
                    index === activeIndex
                      ? "transform scale-105 shadow-lg"
                      : "shadow-md hover:shadow-lg"
                  }
                `}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-all">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} mix-blend-multiply opacity-75`}
                    ></div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <span className="text-white text-xs font-medium">
                        {category.name}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <Eye size={16} className="text-gray-700" />
                        </button>
                        <button className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
                          <ShoppingBag size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-3">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile indicators */}
          <div className="flex justify-center mt-4 space-x-1 sm:hidden">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-4 bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to category ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="flex justify-center sm:justify-end mt-6">
          <a
            href="#"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View All Categories
            <ArrowRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
