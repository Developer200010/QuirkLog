import React from "react";
import { motion } from "framer-motion";
import { Code, Users, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 md:px-12 lg:px-24">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Welcome to our <span className="font-semibold">React & Node Blog</span>, 
          where we share knowledge, tutorials, and resources about 
          <span className="font-semibold"> web development</span>.  
          Our mission is to make coding simple, engaging, and fun for 
          developers worldwide 🌍.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
        >
          <Code size={40} className="text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Learn Coding</h3>
          <p className="text-gray-600">
            Step-by-step tutorials and projects to strengthen your coding skills.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
        >
          <Users size={40} className="text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
          <p className="text-gray-600">
            Join a vibrant community of learners and share your journey.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
        >
          <Globe size={40} className="text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h3>
          <p className="text-gray-600">
            We aim to empower developers across the globe with free resources.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
