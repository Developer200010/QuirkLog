import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCat] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/api/categories");
      setCat(res.data);
    };
    getCat();
  }, []);

  return (
    <div className="w-full md:max-w-xs bg-white rounded-xl shadow-md p-6 space-y-8">
      {/* About Me */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-indigo-600 border-b pb-1">ABOUT ME</h2>
        <img
          className="w-full h-40 object-cover rounded-md shadow"
          src="https://cdn.pixabay.com/photo/2024/09/10/22/25/architectural-design-9038365_1280.jpg"
          alt="About"
        />
        <p className="text-gray-600 text-sm leading-relaxed">
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit amet ex esse. Sunt eu ut nostrud id quis proident.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-indigo-600 border-b pb-1">CATEGORIES</h2>
        <ul className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <Link key={c._id} to={`/?cat=${c.name}`}>
              <li className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full cursor-pointer hover:bg-indigo-200 transition">
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Social */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-indigo-600 border-b pb-1">FOLLOW US</h2>
        <div className="flex gap-4 text-xl text-gray-600">
          <i className="fab fa-facebook-square hover:text-indigo-600 cursor-pointer"></i>
          <i className="fab fa-instagram-square hover:text-pink-500 cursor-pointer"></i>
          <i className="fab fa-pinterest-square hover:text-red-500 cursor-pointer"></i>
          <i className="fab fa-twitter-square hover:text-blue-400 cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}
