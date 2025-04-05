import React, { useContext } from "react";
import { ProductContext } from "../components/ProductContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, addToCart, removeFromCart, removeProductCompletely } = useContext(ProductContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div className="container mx-auto p-6 mt-[100px]">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-300">
            {cart.map((product) => (
              <li key={product.id} className="flex flex-col sm:flex-row items-center justify-between py-4 sm:py-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-contain rounded-md mb-4 sm:mb-0"
                />
                <div className="flex-1 sm:ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                  <p className="text-gray-800 font-medium">Quantity: {product.quantity}</p>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{product.quantity}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeProductCompletely(product.id)}
                  className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition duration-300 mt-4 sm:mt-0 sm:ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            Total Price: <span className="text-blue-500">${totalPrice.toFixed(2)}</span>
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 px-2 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;