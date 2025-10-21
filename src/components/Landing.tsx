import React, { useEffect, useState } from 'react';
import Spinner from './spinner';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-6">
          {/* Main Content Container */}
          <div className="text-center max-w-md mx-auto">
            {/* Logo/Title Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-3">
                Vuduka
              </h1>
              <div className="w-20 h-1 bg-blue-300 mx-auto mb-4 rounded-full"></div>
              <p className="text-xl font-semibold text-white mb-2">
                School Management
              </p>
              <p className="text-blue-100 text-sm leading-relaxed">
                Streamlining educational journeys so you can focus on what matters most
              </p>
            </div>

            {/* Loading Section */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Spinner />
                <span className="text-white font-medium text-sm">Initializing System</span>
              </div>
      
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 opacity-20">
              <div className="w-8 h-8 border-2 border-white rounded-lg transform rotate-12"></div>
            </div>
            <div className="absolute bottom-16 left-10 opacity-20">
              <div className="w-6 h-6 border-2 border-white rounded-full"></div>
            </div>
            <div className="absolute top-20 left-20 opacity-15">
              <div className="w-12 h-12 border-2 border-white rounded-lg transform -rotate-6"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-blue-200 text-xs font-light">
              Secure • Reliable • Efficient
            </p>
          </div>
        </div>
    </>
  );
}

export default Landing;