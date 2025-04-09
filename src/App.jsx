import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './components/AuthContext';  // استيراد AuthProvider هنا فقط
import ProductProvider from './components/ProductContext'; 
import Home from './Home'; 
import ProductDetails from './components/ProductDetails'; 
import Cart from './components/Cart'; 
import Footer from './components/Footer'; 
import NavBar from './components/NavBar'; 
import RegisterPage from './RegisterPage'; 
import LoginPage from './LoginPage'; 
import Checkout from './components/Checkout'; 
import AuthDetails from './components/AuthDetails';

const App = () => {
  return ( 
    <BrowserRouter>
      <AuthProvider>  
        <ProductProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} /> 
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/Checkout" element={<Checkout />} /> 
                <Route path="/AuthDetails" element={<AuthDetails />} /> 
              </Routes>
            </div>
            <Footer />
          </div>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  ); 
}

export default App;
