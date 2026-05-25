import React from 'react';
import { FaCogs, FaBell, FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 1. Import hook

const Home = () => {
  const navigate = useNavigate(); // 2. Initialize hook

  return (
    <div className="bg-black text-white font-sans selection:bg-cyan-500/30 min-h-screen w-full pl-64">
      <div className="w-full max-w-5xl border-x border-gray-900/50">
        
        {/* HERO SECTION */}
        <section className="px-6 py-12 lg:py-16 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
              Detect Anomalies <br />
              <span className="text-cyan-400">Automatically</span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
              As soon as you begin sending your data, Anomaly will start learning from it. 
              Detect unusual patterns as they occur.
            </p>
            
            {/* 3. Add the onClick Navigate logic */}
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Hero Illustration */}
          <div className="flex-1 w-full max-w-sm bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 relative overflow-hidden min-h-[200px] flex flex-col justify-center items-center">
              <div className="w-full h-16 flex items-end gap-1 px-2">
                  {[30, 60, 40, 80, 50, 70, 20, 40, 75, 40].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className={`flex-1 ${i === 7 ? 'bg-orange-500' : 'bg-gray-800'} rounded-t-sm`} />
                  ))}
              </div>
              <div className="mt-4 text-orange-500 font-mono text-[10px] tracking-widest uppercase text-center">
                  .. learning ..
              </div>
          </div>
        </section>

        {/* REST OF YOUR HOME SECTIONS (Learning, Detection, etc) ... */}
        <section className="px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-900">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mb-4">
              <FaCogs className="text-2xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Learning</h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Our algorithms learn from your data and become ever more accurate over time.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mb-4">
              <FaBell className="text-2xl text-cyan-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Detection</h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Real-time monitoring of every data point with instant anomaly alerts.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;