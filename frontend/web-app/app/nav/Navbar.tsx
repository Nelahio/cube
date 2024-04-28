import React from "react";
import { GiDelicatePerfume } from "react-icons/gi";
import Recherche from "./Recherche";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { getCurrentUser } from "../actions/authActions";
import UserActions from "./UserActions";

export default async function Navbar() {
  const user = await getCurrentUser();
  return (
    <header className="header sticky top-0 z-50 flex justify-between bg-white p-5 items-center shadow-md">
      <Logo />
      <Recherche />
      {user ? <UserActions /> : <LoginButton />}
    </header>
  );
}
