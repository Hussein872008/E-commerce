
import React, { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./FireBase";  
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 

const AuthDetails = () => {
  const { authUser, loading } = useAuth(); 
  const navigate = useNavigate();

  const userSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
        navigate("/login", { replace: true });
      })
      .catch((error) => console.log(error));
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        {authUser ? (
          <>
            <p className="text-lg font-semibold text-gray-800">
              Signed In As <span className="text-blue-500">{authUser.email}</span>
            </p>
            <button
              onClick={userSignOut}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Sign Out
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-600">Redirecting to Login...</p>
        )}
      </div>
    </div>
  );
};

export default AuthDetails;
