import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../components/ProductContext";
const ProductDetails = () => {
  const { products, addToCart, cart, removeFromCart } = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id, products]);
  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };
  const handleAddToCart = (product) => {
    if (isProductInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Product not found.</div>;
  }
  return (
    <div className="container mx-auto pt-[100px] p-6 flex flex-col md:flex-row items-center gap-10">
      <img
        src={product.image}
        alt={product.title}
        className="w-full object-contain md:w-1/2 rounded-lg shadow-lg"
      />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <p className="text-xl font-semibold text-blue-500 mt-4">
          Price: ${product.price}
        </p>
        <button
          onClick={() => handleAddToCart(product)}
          className={`mt-6 w-full text-white py-3 rounded-lg transition duration-300 ${
            isProductInCart(product.id)
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isProductInCart(product.id) ? "✔ Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
export default ProductDetails; 