import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Menu, X } from "lucide-react";

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

        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-wider"
        >
          <img src="/logo2.svg" alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <Link to="/" className="hover:text-indigo-400 transition">HOME</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">ABOUT</Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">CONTACT</Link>
          <Link to="/write" className="hover:text-indigo-400 transition">WRITE</Link>
          {user && (
            <span
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-400 transition"
            >
              LOGOUT
            </span>
          )}
        </div>

        {/* Right Section: Profile + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Profile or Login */}
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

          {/* Hamburger / Close Toggle */}
          <motion.button
            className="md:hidden flex justify-center items-center w-9 h-9 rounded-lg border border-white/20 hover:bg-white/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            initial={false}
            animate={menuOpen ? "open" : "closed"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-amber-50/30 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-64 bg-indigo-950 text-white shadow-lg z-50 flex flex-col"
            >
              {/* Close Button inside sidebar */}
              <div className="flex justify-end px-5 pt-4">
                <button onClick={() => setMenuOpen(false)}>
                  <X className="w-7 h-7 text-white hover:text-red-400 transition" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col items-center gap-6 py-10 text-lg font-medium">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="relative text-lg tracking-wide after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:rounded after:transition-all after:duration-300 hover:after:w-full"
                >
                  HOME
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="relative text-lg tracking-wide after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:rounded after:transition-all after:duration-300 hover:after:w-full"
                >
                  ABOUT
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="relative text-lg tracking-wide after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:rounded after:transition-all after:duration-300 hover:after:w-full"
                >
                  CONTACT
                </Link>
                <Link
                  to="/write"
                  onClick={() => setMenuOpen(false)}
                  className="relative text-lg tracking-wide after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:rounded after:transition-all after:duration-300 hover:after:w-full"
                >
                  WRITE
                </Link>

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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
