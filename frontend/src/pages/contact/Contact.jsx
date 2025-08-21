import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! 🚀 (You can connect backend API here)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-700">
            <div className="flex items-center space-x-4">
              <Mail className="text-indigo-600" />
              <span>support@reactnodeblog.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-green-600" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-pink-600" />
              <span>Bangalore, India</span>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
