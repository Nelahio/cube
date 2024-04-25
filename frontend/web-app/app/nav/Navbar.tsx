import React from "react";
import { GiDelicatePerfume } from "react-icons/gi";

export default function Navbar() {
  return (
    <header
      className="
        sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md
        "
    >
      <div className="flex items-center gap-2 text-3xl font-semibold text-purple-700 tracking-tight hover:text-yellow-600 transition-colors">
        <GiDelicatePerfume size={40} />
        <div>Cube Enchères</div>
      </div>
      <div>Rechercher</div>
      <div>Login</div>
    </header>
  );
}
