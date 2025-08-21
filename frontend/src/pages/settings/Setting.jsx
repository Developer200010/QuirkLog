import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation helper
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    // Detect if nothing changed
    if (
      username === user.username &&
      email === user.email &&
      !password &&
      !file
    ) {
      setError("✨ Nothing to update, you’re already awesome 😎");
      return;
    }

    // Validate password if provided
    if (password && !validatePassword(password)) {
      setError(
        "⚠️ Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    dispatch({ type: "UPDATE_START" });
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("username", username);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (file) formData.append("profilePic", file);

      const res = await axios.put(`/api/users/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setError("");
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      setError("❌ Something went wrong while updating profile!");
      setSuccess(false);
      dispatch({ type: "UPDATE_FAILURE" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Update Your Account
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Profile Pic Preview */}
          <div className="flex flex-col items-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic ||
                    "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
              }
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            />
            <label
              htmlFor="fileInput"
              className="mt-3 cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
            >
              Change Profile Picture
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="New password (optional)"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            animate={loading ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: loading ? Infinity : 0, duration: 0.8 }}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition-all duration-200 shadow-md 
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Updating...
              </>
            ) : (
              "Update"
            )}
          </motion.button>

          {/* Feedback Messages */}
          {success && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-medium text-sm text-center"
            >
              ✅ Profile updated successfully!
            </motion.span>
          )}
          {error && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 font-medium text-sm text-center"
            >
              {error}
            </motion.span>
          )}
        </form>
      </motion.div>
    </div>
  );
}
