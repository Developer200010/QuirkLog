import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import { Upload, Loader2, Rocket } from "lucide-react"; // 👈 lucide icons

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("title", title);
      formData.append("desc", desc);
      if (file) formData.append("photo", file);

      const res = await axios.post("/api/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploading(false);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error(err);
      setUploading(false);
      setError("⚠️ Failed to publish post. Try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Image Preview */}
        {file && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-full max-h-[400px] object-cover rounded-xl shadow"
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-indigo-50 border-2 border-dashed border-indigo-300 hover:bg-indigo-100 transition p-4 rounded-xl text-center text-indigo-600 font-semibold flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {file ? "✅ Image Selected" : "Click to Upload"}
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {/* Title Input */}
            <input
              className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-medium"
              placeholder="Enter a catchy title..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          {/* Description */}
          <textarea
            className="w-full h-60 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none text-base leading-relaxed"
            placeholder="Start writing your story..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={uploading}
              className={`flex items-center gap-2 ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-xl cursor-pointer"
              } text-white px-8 py-3 rounded-lg shadow-lg transition text-lg font-semibold`}
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Uploading...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  Publish
                </>
              )}
            </motion.button>
          </div>

          {/* Error + Upload Info */}
          {error && (
            <p className="text-red-600 text-sm font-medium text-center">
              {error}
            </p>
          )}
          {uploading && (
            <p className="text-indigo-600 text-sm font-medium text-center">
              ⏳ Upload in progress... please wait.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
