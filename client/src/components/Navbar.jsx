import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Devlance</h1>
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
          <a href="/login" className="hover:text-gray-300">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
