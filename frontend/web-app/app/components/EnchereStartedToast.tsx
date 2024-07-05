import { Enchere, EnchereStarted } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  enchere: Enchere;
};

export default function EnchereFinishedToast({ enchere }: Props) {
  return (
    <Link
      href={`/encheres/details/${enchere.id}`}
      className="flex flex-col items-center"
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={enchere.imageUrl}
          alt="Image"
          height={80}
          width={80}
          className="rounded-lg w-auto h-auto"
        />
        <span>
          L&apos;enchère{" "}
          <strong>
            {enchere.make} {enchere.name}
          </strong>{" "}
          vient de commencer !
        </span>
      </div>
    </Link>
  );
}
