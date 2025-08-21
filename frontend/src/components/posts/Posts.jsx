import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Posts({ posts }) {

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white w-[280px] h-[350px] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Post Image */}
      <img
        className="w-full h-44 object-cover"
        src={
          posts.photo
            ?  posts.photo
            : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        }
        alt={posts.title}
      />

      {/* Post Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition line-clamp-1">
          {posts.title}
        </h3>

        {/* Date */}
        <span className="text-sm text-gray-500 mt-1">
          {new Date(posts.updatedAt).toDateString()}
        </span>

        {/* Description */}
        <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-2 flex-1">
          {posts.desc}
        </p>

        {/* View Button */}
        <Link
          to={`/post/${posts._id}`}
          className="mt-3 text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          View Blog
        </Link>
      </div>
    </motion.div>
  );
}
