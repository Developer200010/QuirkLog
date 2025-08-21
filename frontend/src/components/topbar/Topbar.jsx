import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "logout" });
    window.location.replace("/login");
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-white">

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-wider"
        >
          <img src="/logo2.svg" alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <Link to="/" className="hover:text-indigo-400 transition">
            HOME
          </Link>
          <Link to="/about" className="hover:text-indigo-400 transition">
            ABOUT
          </Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">
            CONTACT
          </Link>
          <Link to="/write" className="hover:text-indigo-400 transition">
            WRITE
          </Link>
          {user && (
            <span
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-400 transition"
            >
              LOGOUT
            </span>
          )}
        </div>

        {/* Right (Profile + Hamburger) */}
        <div className="flex items-center gap-4">
          {/* Profile or Login Icon */}
          {user ? (
            <Link to="/settings">
              <img
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-400 hover:scale-105 transition-transform"
                src={
                  user.profilePic
                    ? user.profilePic
                    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt="Profile"
              />
            </Link>
          ) : (
            <Link to="/login">
              <User className="w-7 h-7 text-indigo-300 hover:text-indigo-400 transition cursor-pointer" />
            </Link>
          )}

          {/* Hamburger */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
            initial={false}
            animate={menuOpen ? "open" : "closed"}
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6 },
              }}
              className="w-6 h-0.5 bg-white rounded mb-1"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="w-6 h-0.5 bg-white rounded mb-1"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6 },
              }}
              className="w-6 h-0.5 bg-white rounded"
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden text-white bg-indigo-950 flex flex-col items-center gap-6 py-6 text-lg font-medium"
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>
            <Link to="/write" onClick={() => setMenuOpen(false)}>WRITE</Link>

            {user ? (
              <span
                onClick={handleLogout}
                className="cursor-pointer text-red-400"
              >
                LOGOUT
              </span>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>LOGIN</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>REGISTER</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
