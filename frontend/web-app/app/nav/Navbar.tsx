import React from "react";
import { GiDelicatePerfume } from "react-icons/gi";

export default function Navbar() {
  return (
    <header className="header sticky top-0 z-50 flex justify-between bg-white p-5 items-center shadow-md">
      <div className="flex items-center gap-2 text-3xl font-semibold text-purple-700 tracking-tight hover:text-yellow-400 transition-colors">
        <GiDelicatePerfume size={40} />
        <div>Cube Enchères</div>
      </div>
      <div className="flex gap-2">
        <button className="search-btn hover:bg-gray-100 hover:text-gray-600 transition duration-200 ease-in-out px-4 py-2 rounded-md text-base font-medium">
          Rechercher
        </button>
        <button className="login-btn hover:bg-gray-100 hover:text-gray-600 transition duration-200 ease-in-out px-4 py-2 rounded-md text-base font-medium">
          Connexion
        </button>
      </div>
    </header>
  );
}
