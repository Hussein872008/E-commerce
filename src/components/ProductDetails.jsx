import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductContext } from "../components/ProductContext";
// تعديل الاستيراد ليكون default import
import AuthContext from "../components/AuthContext"; // هنا الاستيراد الصحيح

const ProductDetails = () => {
  const { products, addToCart, cart, removeFromCart } = useContext(ProductContext);
  const { authUser, loading } = useContext(AuthContext); // هنا نستخدم authUser و loading من AuthContext
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // رسالة الخطأ

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [id, products]);

  const checkIfInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const handleAddToCart = (product) => {
    if (!authUser) { // هنا نتحقق من وجود المستخدم
      setErrorMessage("⚠️ لازم تسجل دخول الأول علشان تضيف المنتج للسلة.");
      return;
    }

    setErrorMessage(""); // لو مسجل دخول امسح الخطأ

    if (checkIfInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  if (loadingProduct) return <div className="text-center mt-10">Loading...</div>;

  if (!product) {
    return (
      <div className="text-center text-gray-500 mt-10">
        😕 Sorry, this product doesn't exist.
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-[100px] p-6">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* صورة المنتج */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={product.image}
          alt={product.title}
          className="w-full object-contain md:w-1/2 rounded-lg shadow-lg"
        />

        {/* تفاصيل المنتج */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2"
        >
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-xl font-semibold text-blue-500 mt-4">
            Price: ${product.price}
          </p>

          {errorMessage && (
            <div className="mt-4 text-red-600 font-semibold bg-red-100 p-2 rounded">
              {errorMessage}
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleAddToCart(product)}
            className={`mt-6 w-full text-white py-3 rounded-lg transition duration-300 ${
              checkIfInCart(product.id)
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {checkIfInCart(product.id) ? "✔ Remove from Cart" : "Add to Cart"}
          </motion.button>
        </motion.div>
      </div>

      {/* منتجات مشابهة */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 3)
            .map((related) => (
              <Link to={`/product/${related.id}`} key={related.id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 h-full"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-40 object-contain mb-3"
                  />
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-blue-600 font-bold">${related.price}</p>
                </motion.div>
              </Link>
            ))}

          {products.filter((p) => p.category === product.category && p.id !== product.id).length === 0 && (
            <div className="text-gray-500 text-center col-span-full">
              No related products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
