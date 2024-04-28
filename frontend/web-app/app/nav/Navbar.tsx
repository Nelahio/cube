import React from "react";
import { GiDelicatePerfume } from "react-icons/gi";
import Recherche from "./Recherche";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="header sticky top-0 z-50 flex justify-between bg-white p-5 items-center shadow-md">
      <Logo />
      <Recherche />
      <button className="login-btn hover:bg-gray-100 hover:text-gray-600 transition duration-200 ease-in-out px-4 py-2 rounded-md text-base font-medium">
        Connexion
      </button>
    </header>
  );
}
