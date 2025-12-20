import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 75);

    const timer = setTimeout(() => {
      navigate("/Login");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="text-center max-w-md mx-auto">
        {/* Logo / Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Vuduka</h1>
          <div className="w-20 h-1 bg-blue-300 mx-auto mb-4 rounded-full"></div>
          <p className="text-xl font-semibold text-white mb-2">School Management</p>
          <p className="text-blue-100 text-sm">
            Streamlining educational journeys so you can focus on what matters most
          </p>
        </div>

        {/* Bouncing Split Ball Loader */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-32 w-32">
            {/* Main ball */}
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="ball"></div>
            </div>

            {/* Split pieces */}
            <div className="absolute inset-0 flex items-end justify-center gap-2">
              <div className="piece piece-left"></div>
              <div className="piece piece-right"></div>
            </div>
          </div>

          <p className="text-white text-xs tracking-wider">Loading {progress}%</p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-blue-200 text-xs font-light">Secure • Reliable • Efficient</p>
      </div>

      {/* Component styles */}
      <style>{`
        .ball {
          width: 28px;
          height: 28px;
          background: white;
          border-radius: 9999px;
          animation: bounce 1.2s ease-in-out infinite;
        }

        .piece {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 9999px;
          opacity: 0;
        }

        .piece-left {
          animation: splitLeft 1.2s ease-in-out infinite;
        }

        .piece-right {
          animation: splitRight 1.2s ease-in-out infinite;
        }

        @keyframes bounce {
          0% { transform: translateY(0); }
          40% { transform: translateY(-70px); }
          50% { transform: translateY(-70px); }
          100% { transform: translateY(0); }
        }

        @keyframes splitLeft {
          0%, 45% { opacity: 0; transform: translate(0, 0); }
          55% { opacity: 1; transform: translate(-16px, -10px); }
          100% { opacity: 0; transform: translate(-24px, 0); }
        }

        @keyframes splitRight {
          0%, 45% { opacity: 0; transform: translate(0, 0); }
          55% { opacity: 1; transform: translate(16px, -10px); }
          100% { opacity: 0; transform: translate(24px, 0); }
        }
      `}</style>
    </div>
  );
}

export default Landing;
