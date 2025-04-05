
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../components/ProductContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase"; 
const Checkout = () => {
  const { cart, setCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); 
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const handleConfirmOrder = () => {
    console.log("🟡 Order confirmation has started...");
    if (!authUser) {
      console.log("🔴 User is not logged in!");
      setErrorMessage("⚠️ You must log in before completing the order!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    console.log("✅ User logged in. Confirm order...");
    alert("✅ Your order has been successfully confirmed!");
    console.log("🟠 Cart before emptying:", cart);
    localStorage.removeItem("cart");
    setTimeout(() => {
      setCart([]);
    }, 100);
    console.log("🟢 The Cart after emptying:", cart);
    setTimeout(() => {
      console.log("🔄 Redirection...");
      navigate("/");
    }, 500);
    setTimeout(() => {
      console.log("🔄 Reload the page...");
      window.location.href = "/";
    }, 1500);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Checking authentication...</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Checkout</h1>
      {errorMessage && (
        <p className="text-center text-red-500 font-semibold text-lg mb-4">{errorMessage}</p>
      )}
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty. Please add some products first.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-3 flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span>{product.title}</span>
                  </td>
                  <td className="p-3 text-gray-600">${product.price.toFixed(2)}</td>
                  <td className="p-3 text-gray-800">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            Total Price: <span className="text-blue-500">${totalPrice.toFixed(2)}</span>
          </h2>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Confirm Order
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Back to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Checkout;
