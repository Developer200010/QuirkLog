import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userEmailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(""); // now a string

  const handleSubmit = async (e) => {
    console.log("login click")
    e.preventDefault();
    setError(""); // reset error before new login attempt
    dispatch({ type: "login_start" });
    try {
      const res = await axios.post("/api/auth/login", {
        email: userEmailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res)
      dispatch({ type: "login_success", payload: res.data });
    } catch (err) {
      dispatch({ type: "login_failure" });
      // Try to get the backend error message, otherwise show a generic one
      if (err.response && err.response.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Login failed"
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              ref={userEmailRef}
              placeholder="Enter your email..."
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Enter your password..."
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isFetching}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isFetching ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}
        </form>
        <div className="mt-6 text-center">
          <button
            className="text-indigo-600 hover:underline font-medium"
            onClick={() => window.location.replace("/register")}
          >
            New here? Register
          </button>
        </div>
      </div>
    </div>
  );
}
