"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Dropdown } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  AiFillDollarCircle,
  AiFillTrophy,
  AiOutlineLogout,
} from "react-icons/ai";
import { HiCog, HiUser } from "react-icons/hi";

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore((state) => state.setParams);

  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathname !== "/") router.push("/");
  }

  function setSeller() {
    setParams({ seller: user.username, winner: undefined });
    if (pathname !== "/") router.push("/");
  }
  return (
    <Dropdown label={`Bienvenue ${user.name}`} inline>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        Mes enchères
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
        Enchères remportées
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillDollarCircle}>
        <Link href={"/encheres/create"}>Vendre un produit</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Déconnexion
      </Dropdown.Item>
    </Dropdown>
  );
}
