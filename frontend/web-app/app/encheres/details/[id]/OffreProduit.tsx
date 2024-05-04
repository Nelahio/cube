import { Offre } from "@/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React from "react";

type Props = {
  offre: Offre;
};

export default function OffreProduit({ offre }: Props) {
  function getOffreInfo() {
    let bgColor = "";
    let text = "";
    switch (offre.bidStatus) {
      case "Accepted":
        bgColor = "bg-green-200";
        text = "Offre acceptée";
        break;
      case "AcceptedBelowReserve":
        bgColor = "bg-amber-500";
        text = "Réserve non atteinte";
        break;
      case "TooLow":
        bgColor = "bg-red-200";
        text = "Offre trop basse";
        break;
      default:
        bgColor = "bg-red-200";
        text = "Offre faite après que l'enchère soit terminée";
        break;
    }
    return { bgColor, text };
  }

  return (
    <div
      className={`border-gray-300 border-2 px-3 py-2 rounded-lg flex justify-between items-center mb-2 ${
        getOffreInfo().bgColor
      }`}
    >
      <div className="flex flex-col">
        <span>Enchérisseur : {offre.bidder}</span>
        <span className="text-gray-700 text-sm">
          Le{" "}
          {format(new Date(offre.bidTime), "dd MMMM yyyy HH:mm", {
            locale: fr,
          })}
        </span>
      </div>
      <div className="flex flex-col text-right">
        <div className="text-xl font-semibold">{offre.amount}€</div>
        <div className="flex flex-row items-center">
          <span>{getOffreInfo().text}</span>
        </div>
      </div>
    </div>
  );
}
