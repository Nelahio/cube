import { Enchere, EnchereFinished } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  finishedEnchere: EnchereFinished;
  enchere: Enchere;
};

export default function EnchereFinishedToast({
  enchere,
  finishedEnchere,
}: Props) {
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
        <div className="flex flex-col">
          <span>
            L&apos;enchère{" "}
            <strong>
              {enchere.make} {enchere.name}
            </strong>{" "}
            est terminée !
          </span>
          {finishedEnchere.itemSold && finishedEnchere.amount ? (
            <p>
              Félicitations à <strong>{finishedEnchere.winner}</strong> qui a
              gagné cette enchère pour{" "}
              <strong>{finishedEnchere.amount}€</strong> !
            </p>
          ) : (
            <p>Ce produit ne s&apos;est pas vendu.</p>
          )}
        </div>
      </div>
    </Link>
  );
}
