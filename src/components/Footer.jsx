import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
const Footer = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_3kuhzzp",
        "template_94cnqup",
        e.target,
        "R2LwfBs0dRdBfcJbN"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("✅ Message sent successfully!");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log(error.text);
          setStatus("❌ An error occurred, please try again.");
        }
      );
  };
  return (
    <footer className="bg-gray-800 text-white py-8" id="contactSection">
  <div className="container mx-auto px-4 flex flex-col justify-center items-center space-y-6">  
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Your Name"
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Your Email"
          />
        </div>
        <div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
            placeholder="Your Message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
        >
          <FaPaperPlane /> Send Message
        </button>
        {status && (
          <div
            className={`mt-4 text-center p-2 rounded-lg ${
              status.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </div>
        )}
      </form>
    </div>
    <div className="flex space-x-6 text-lg">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all duration-300">
        <FaFacebook />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all duration-300">
        <FaInstagram />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all duration-300">
        <FaGithub />
      </a>
    </div>
  </div>
  <div className="text-center text-sm text-gray-400 mt-6">
    © {new Date().getFullYear()} MyWebsite. All rights reserved.
  </div>
</footer>

  );
};
export default Footer;