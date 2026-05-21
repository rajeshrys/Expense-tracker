import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden">
      
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            FinTrack
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-500/30"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Gradient Glow */}
        <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl text-center">
          <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
            Smart Finance Management
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
            Take Control <br />
            Of Your <span className="text-blue-500">Money</span>
          </h1>

          <p className="mt-8 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Track expenses, manage income, and build better financial habits
            with a clean and intelligent personal finance dashboard.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-500/30 transition"
            >
              Start Saving Today
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border border-white/20 hover:bg-white/10 rounded-2xl text-lg font-semibold transition"
            >
              Explore Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-[#111827]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose FinTrack?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">💰</div>
              <h3 className="text-2xl font-bold mb-3">Expense Tracking</h3>
              <p className="text-gray-400">
                Monitor every transaction and understand where your money goes.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">📊</div>
              <h3 className="text-2xl font-bold mb-3">Visual Analytics</h3>
              <p className="text-gray-400">
                Beautiful charts and reports to analyze your spending habits.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Savings Goals</h3>
              <p className="text-gray-400">
                Set targets and achieve your financial goals smarter and faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold">FinTrack</h1>
            <p className="text-gray-400 mt-2">
              Smart spending starts here.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/rajeshrys"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                className="w-10 h-10 rounded-full"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/thati-rajesh-b25aa62b3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-10 h-10"
              />
            </a>

            <a
              href="mailto:rajeshthati535@gmail.com"
              className="hover:scale-110 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                alt="Email"
                className="w-10 h-10"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;