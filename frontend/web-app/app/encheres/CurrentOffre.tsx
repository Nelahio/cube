import React from "react";

type Props = {
  montant?: number;
  reservePrice: number;
};

export default function CurrentOffre({ montant, reservePrice }: Props) {
  console.log(`${montant} et ${reservePrice}`);
  const text = montant ? "€" + montant : "Aucune offre";
  const color = montant
    ? montant > reservePrice
      ? "bg-green-600"
      : "bg-amber-600"
    : "bg-red-600";
  return (
    <div
      className={`border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center ${color}`}
    >
      {text}
    </div>
  );
}
