import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./components/FireBase";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/checkout");
      setEmail("");
      setPassword("");
    } catch (error) {
      handleFirebaseError(error.code);
    } finally {
      setLoading(false);
    }
  };
  const handleFirebaseError = (code) => {
    const errorMessages = {
      "auth/invalid-email": "Invalid email format.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password. Try again.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
    };
    setError(errorMessages[code] || "An error occurred. Please try again.");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login To Your Account
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={signIn} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg text-white font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p
            className="text-blue-500 text-center cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
          <p className="text-center text-gray-700 mt-4">
          Don't have an account?
            <span
              className="text-blue-500 cursor-pointer hover:underline ml-1"
              onClick={() => navigate("/register")}
            >
              Register now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
