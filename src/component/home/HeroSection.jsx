import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample slide data - replace with your actual content
const slides = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/736x/34/e3/63/34e3637add139dd9eb7d3b98998f422e.jpg",
    title: "Modern Web Solutions",
    description: "Creating cutting-edge experiences for the digital world",
    buttonText: "Learn More",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-photo/beautiful-blonde-woman-blue-light_23-2149478924.jpg",
    title: "Responsive Design",
    description: "Beautiful on every device, from mobile to desktop",
    buttonText: "Our Work",
  },
  {
    id: 3,
    image:
      "https://t3.ftcdn.net/jpg/03/33/81/02/360_F_333810258_5gP2SBYroH0jtgAtI2ANibRRDe2YY7dU.jpg",
    title: "Performance First",
    description: "Optimized for speed and conversion rates",
    buttonText: "Get Started",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg?cs=srgb&dl=pexels-pixabay-247204.jpg&fm=jpg",
    title: "Performance First",
    description: "Optimized for speed and conversion rates",
    buttonText: "Get Started",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrent((current) =>
          current === slides.length - 1 ? 0 : current + 1
        );
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Navigation functions
  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
    setIsAutoPlaying(false); // Pause autoplay when manually navigating
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full bg-black">
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover object-center w-full h-full opacity-70"
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-xl mx-auto">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transform transition-all duration-700 translate-y-0 opacity-100">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 transform transition-all duration-700 delay-100 translate-y-0 opacity-100">
                    {slide.description}
                  </p>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
