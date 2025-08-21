import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password validation function
  const validatePassword = (pwd) => {
    const minLength = /.{8,}/; // at least 8 characters
    const hasLetter = /[A-Za-z]/; // at least one letter
    const hasNumber = /\d/; // at least one number
    const hasSpecialChar = /[@$!%*?&]/; // at least one special char

    if (!minLength.test(pwd)) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasLetter.test(pwd) || !hasNumber.test(pwd) || !hasSpecialChar.test(pwd)) {
      return "Password must include letters, numbers, and special characters.";
    }
    return ""; // valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      if (res.data) {
        setSuccess(true);
        setError("");
        window.location.replace("/login");
      }
    } catch (err) {
      setError("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username..."
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be 8+ characters, include letters, numbers & a special character.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          {/* Success Message */}
          {success && (
            <p className="text-green-500 text-sm text-center mt-2">
              Registration successful! Redirecting...
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <button
            className="text-indigo-600 hover:underline font-medium"
            onClick={() => window.location.replace("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}
