import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  // Background images
  const images = [
    "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg",
    "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
    "https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg",
    "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  ];

  // Rotating quotes/lines
  const quotes = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "Talk is cheap. Show me the code.",
    "First, solve the problem. Then, write the code.",
    "Programs must be written for people to read.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 flex flex-col items-center shadow-md">
      {/* Header Title */}
      <div className="text-center">
        <span className="block text-sm sm:text-base md:text-lg font-light tracking-wide text-gray-300">
          React & Node
        </span>
        <span className="block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-1">
          BLOG
        </span>
      </div>

      {/* Rotating Image */}
      <div className="relative mt-6 w-full max-w-3xl h-52 sm:h-60 md:h-72 overflow-hidden rounded-xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="header"
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </div>

      {/* Rotating Quotes */}
      <div className="mt-5 text-center max-w-2xl px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="italic text-base sm:text-lg md:text-xl text-gray-300 font-light"
          >
            “{quotes[currentIndex]}”
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
