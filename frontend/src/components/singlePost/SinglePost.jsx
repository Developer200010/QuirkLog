import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Pencil, Trash2, Share2, User, Calendar } from "lucide-react";

export default function SinglePost({ data }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const handleDelete = async () => {
    try {
      await axios.delete("/api/post/" + path, {
        data: { username: user.username },
      });
      toast.success("Post deleted successfully 🚀");
      setTimeout(() => {
        window.location.replace("/");
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong while deleting ❌");
    }
  };

  const shareableLink = `${window.location.origin}/post/${path}`;
  const copyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success("🔗 Link copied to clipboard!");
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/post/" + path);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleEdit = async () => {
    try {
      await axios.put(`/api/post/${data._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      toast.success("✅ Post updated successfully!");
    } catch {
      toast.error("⚠️ Failed to update post.");
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen py-8 px-3 sm:px-6">
      <Toaster position="top-right" reverseOrder={false} />
      <motion.div
        className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-5 sm:p-8 hover:shadow-2xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Post Image */}
        <motion.img
          key={data._id}
          className="w-full h-52 sm:h-72 md:h-96 object-cover rounded-xl mb-5 shadow-md hover:scale-[1.02] transition-transform duration-300"
          src={
            data.photo === ""
              ? "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              : data.photo
          }
          alt="Post"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Title + Actions */}
        {updateMode ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl sm:text-2xl md:text-3xl font-semibold w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-gray-900 break-words">{data.title}</span>
            <div className="flex flex-wrap gap-2 sm:gap-3 text-sm">
              {data.username === user?.username && (
                <>
                  <button
                    onClick={() => setUpdateMode(true)}
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    <Pencil size={18} /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </>
              )}
              <button
                onClick={copyLink}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <Share2 size={18} /> Share
              </button>
            </div>
          </h1>
        )}

        {/* Author + Date */}
        <div className="mt-3 text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
          <span className="flex items-center gap-1.5">
            <User size={16} className="text-indigo-600" />
            Author:{" "}
            <Link
              to={`/?user=${data.username}`}
              className="text-indigo-600 hover:underline font-medium"
            >
              {data.username}
            </Link>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-gray-500" />
            {new Date(data.createdAt).toDateString()}
          </span>
        </div>

        {/* Description / Edit */}
        {updateMode ? (
          <>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full mt-5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              rows={6}
            />
            <button
              onClick={handleEdit}
              className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition-all duration-300 cursor-pointer text-sm sm:text-base"
            >
              Update
            </button>
          </>
        ) : (
          <motion.p
            className="mt-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed hover:text-gray-900 transition-colors break-words"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {data.desc}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
