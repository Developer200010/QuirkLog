import React, { useEffect, useState, useMemo } from "react";
import { Header } from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { motion } from "framer-motion";
import Posts from "../../components/posts/Posts";
import Search from "../../components/search/Search";
import Pagination from "../pagination/Pagination";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false); // 👈 new state
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/post`);
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // ✅ simulate search delay (loading effect)
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    setSearching(true);
    const delay = setTimeout(() => {
      if (!input.trim()) {
        setFilteredPosts(posts); // reset to all posts
      } else {
        setFilteredPosts(
          posts.filter((post) => {
            const titleMatch = post.title
              ?.toLowerCase()
              .includes(input.toLowerCase());
            const userMatch = post.username
              ?.toLowerCase()
              .includes(input.toLowerCase());
            return titleMatch || userMatch;
          })
        );
      }
      setSearching(false);
      setCurrentPage(1); // reset to first page after search
    }, 500); // 500ms "searching..." delay for better UX

    return () => clearTimeout(delay);
  }, [input, posts]);

  // ✅ paginate filtered posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-12 py-8 bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen">
        {/* Posts section */}
        <div className="w-full md:w-3/4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800 text-center"
          >
            ✍️ Explore Blog Posts
          </motion.h2>

          {/* Search box */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Search input={input} setInput={setInput} />
          </div>

          {/* Loading while fetching posts initially */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600 font-medium">
                Fetching posts...
              </span>
            </div>
          ) : searching ? (
            // 🔎 Loading while searching/filtering
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600 italic">
                Searching posts...
              </span>
            </div>
          ) : currentPosts.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              🚫 No posts found.
            </p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
            >
              {currentPosts.map((post, index) => (
                <Posts key={post._id || index} posts={post} />
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !searching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/4"
        >
          <Sidebar />
        </motion.div>
      </div>
    </>
  );
};

export default Homepage;
