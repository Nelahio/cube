"use client";

import Image from "next/image";
import logo from "../../public/logoCube.png";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  const reset = useParamsStore((state) => state.reset);

  function doReset() {
    if (pathname !== "/") router.push("/");
    reset();
  }

  return (
    <div onClick={doReset} className="cursor-pointer flex w-[10%] items-center">
      <div>
        <Image src={logo.src} alt="Logo" width={60} height={60} />
      </div>
      {/* <div>Cube</div> */}
    </div>
  );
}
