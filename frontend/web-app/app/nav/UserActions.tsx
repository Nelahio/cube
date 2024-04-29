"use client";
import { Dropdown } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  AiFillDollarCircle,
  AiFillTrophy,
  AiOutlineLogout,
} from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi";

type Props = {
  user: Partial<User>;
};

export default function UserActions({ user }: Props) {
  return (
    <Dropdown label={`Bienvenue ${user.name}`} inline color={"purple"}>
      <Dropdown.Item icon={HiUser}>
        <Link href={"/"}>Mes enchères</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy}>
        <Link href={"/"}>Enchères remportées</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillDollarCircle}>
        <Link href={"/"}>Vendre un produit</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href={"/session"}>Session (dev only)</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <Link href={"/session"}>Déconnexion</Link>
      </Dropdown.Item>
    </Dropdown>
  );
}
