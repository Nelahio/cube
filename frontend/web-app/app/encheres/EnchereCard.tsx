import React from "react";
import CountdownTimer from "./CountdownTimer";
import EnchereImage from "./EnchereImage";
import { Enchere } from "@/types";
import Link from "next/link";
import CurrentOffre from "./CurrentOffre";

type Props = {
  enchere: Enchere;
};

export default function EnchereCard({ enchere }: Props) {
  return (
    <Link href={`encheres/details/${enchere._id}`} className="group">
      <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
        <div>
          <EnchereImage imageUrl={enchere.imageUrl} />
          <div className="absolute bottom-2 left-2">
            <CountdownTimer
              auctionEnd={enchere.auctionEnd}
              auctionStart={enchere.auctionStart}
              updatedAt={enchere.updatedAt}
            />
          </div>
          <div className="absolute top-2 right-2">
            <CurrentOffre
              reservePrice={enchere.reservePrice}
              montant={enchere.currentHighBid}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {enchere.make} {enchere.name}
        </h3>
        <p className="font-semibold text-sm"> {enchere.year} </p>
      </div>
    </Link>
  );
}
