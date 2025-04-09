import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "../components/ProductContext";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "./AuthContext"; 

const ProductList = () => {
  const { products, cart, addToCart, removeFromCart } = useContext(ProductContext);
  const { authUser } = useAuth(); 
  const navigate = useNavigate(); 
  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const handleCartButtonClick = (product) => {
    if (!authUser) {
      alert("You need to be logged in to add products to your cart.");
      navigate("/login");
      return;
    }

    if (isProductInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="container mx-auto px-8 py-8 bg-gradient-to-r from-blue-500 to-indigo-700 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 pt-[70px]">
        Product List
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 flex flex-col justify-between h-full"
          >
            <div className="relative mb-4 overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-contain transform transition duration-500"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h2>
            <NavLink
              to={`/product/${product.id}`}
              className="text-blue-500 text-sm mb-4 cursor-pointer"
            >
              More details
            </NavLink>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-lg font-semibold text-gray-900">
                ${product.price}
              </span>
              <button
                onClick={() => handleCartButtonClick(product)}
                className={`bg-blue-500 text-white text-sm py-2 px-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
                  isProductInCart(product.id) ? "bg-red-500 hover:bg-red-600" : ""
                }`}
              >
                {isProductInCart(product.id) ? "✔ Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
