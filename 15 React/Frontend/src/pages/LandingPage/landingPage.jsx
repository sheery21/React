// src/pages/LandingPage.jsx
import React from "react";
import Logo from "../../assets/logo.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <img
              src={Logo}
              alt="State Bank of Pakistan"
              className="h-16 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center bg-white text-center px-4">
        <h2 className="text-4xl font-bold mb-4 text-primary">
          Welcome to State Bank of Pakistan
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-xl">
          This is the official landing page of the State Bank of Pakistan. You
          can access banking services, learn about monetary policies, and find
          official announcements.
        </p>

        <div className="space-x-4">
          <a
            href="/user-login"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
          >
            User Login
          </a>
          <a
            href="/bank-officer-login"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
          >
            Bank Officer Login
          </a>
          <a
            href="/admin-login"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
          >
            Admin Login
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-4 text-gray-600">
        &copy; {new Date().getFullYear()} State Bank of Pakistan. All rights
        reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
