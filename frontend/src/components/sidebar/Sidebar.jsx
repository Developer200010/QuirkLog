import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,      // Corrected export name
  SiDocker,
  SiCloudinary,
  SiAppium,
  SiGithub
} from "react-icons/si";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCat(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    getCat();
  }, []);

  const skills = [
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
    { name: "React.js / Next.js", icon: <SiNextdotjs className="text-indigo-600" /> },
    { name: "Node.js / REST API", icon: <SiNodedotjs className="text-green-600" /> }, // Corrected usage
    { name: "Docker", icon: <SiDocker className="text-blue-600" /> },
    { name: "Cloudinary", icon: <SiCloudinary className="text-indigo-400" /> },
  ];

  return (
    <div className="w-full md:max-w-xs bg-white rounded-2xl shadow-lg p-6 space-y-8">

      {/* About Me */}
      <div className="text-center space-y-4">
        <h2 className="text-xl font-bold text-indigo-600 border-b pb-2">ABOUT ME</h2>
        <img
          className="w-full h-40 object-contain rounded-2xl shadow-lg bg-gray-200"
          src="https://media.licdn.com/dms/image/v2/D4E16AQHzP7JOjeZhFA/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1719356023536?e=1758758400&v=beta&t=OJuxWoLelaqi7Rzfpvo-AVtCsopy9S7veMPxIP2VUMs"
          alt="Profile"
        />
        <p className="text-gray-700 text-sm leading-relaxed">
          🚀 Lifelong Learner | 💻 Full-Stack Web Builder | ⚡ Fast & Adaptive
        </p>
      </div>

      {/* Elevator Pitch */}
      <div className="space-y-2 p-4 bg-indigo-50 rounded-xl shadow-inner">
        <h3 className="text-indigo-600 font-semibold">Elevator Pitch</h3>
        <p className="text-gray-700 text-sm">
          I thrive on building dynamic web apps using modern technologies. Quick learner, adaptable, and passionate about delivering high-quality code.
        </p>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h3 className="text-indigo-600 font-semibold border-b pb-1">SKILLS</h3>
        <ul className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <li
              key={skill.name}
              className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full flex items-center gap-1 hover:bg-indigo-200 transition"
            >
              {skill.icon} {skill.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Interests */}
      <div className="space-y-2">
        <h3 className="text-indigo-600 font-semibold border-b pb-1">INTERESTS</h3>
        <p className="text-gray-700 text-sm">
          Continuous learning 📚, Full-Stack Development 💻, Problem Solving 🔍, Tech Exploration 🌱
        </p>
      </div>

      {/* Categories */}

      {/* Connect / Contact */}
      <div className="text-center">
        <h3 className="text-indigo-600 font-semibold border-b pb-1">CONNECT</h3>
        <div className="flex justify-center mt-2 gap-4 text-indigo-600">
          <a href="https://www.linkedin.com/in/chandan-vishwakarma-38ba942bb/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-800 transition flex items-center gap-1">
            <FaLinkedin size={16} /> LinkedIn
          </a>
          <a href="https://cvlab.vercel.app/" className="hover:text-indigo-800 transition flex items-center gap-1">
            <SiAppium size={16} /> Portfolio
          </a>
          <a href="https://github.com/Developer200010" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-800 transition flex items-center gap-1">
            <SiGithub size={16} /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
