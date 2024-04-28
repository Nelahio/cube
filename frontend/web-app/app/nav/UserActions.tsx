"use client";
import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

export default function UserActions() {
  return (
    <Button outline color={"purple"}>
      <Link href={"/session"}>Session</Link>
    </Button>
  );
}
