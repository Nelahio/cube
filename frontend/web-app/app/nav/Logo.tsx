"use client";

import logo from "../../public/logoCube.png";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GiDelicatePerfume } from "react-icons/gi";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  const reset = useParamsStore((state) => state.reset);

  function doReset() {
    if (pathname !== "/") router.push("/");
    reset();
  }

  return (
    <div onClick={doReset} className="cursor-pointer flex w-[3%] items-center">
      <div>
        <img src={logo.src} alt="Logo" />
      </div>
      {/* <div>Cube</div> */}
    </div>
  );
}
