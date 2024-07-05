"use client";

import { getOffresForEnchere } from "@/app/actions/enchereActions";
import Heading from "@/app/components/Heading";
import { useOffreStore } from "@/hooks/useOffreStore";
import { Enchere, Offre } from "@/types";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OffreProduit from "./OffreProduit";
import EmptyFilter from "@/app/components/EmptyFilter";
import OffreForm from "./OffreForm";

type Props = {
  user: User | null;
  enchere: Enchere;
};

export default function OffreList({ user, enchere }: Props) {
  const [loading, setLoading] = useState(true);
  const offres = useOffreStore((state) => state.offres);
  const setOffres = useOffreStore((state) => state.setOffres);
  const open = useOffreStore((state) => state.open);
  const setOpen = useOffreStore((state) => state.setOpen);
  const openForOffres = new Date(enchere.auctionEnd) > new Date();

  const highBid = offres.reduce(
    (prev, current) =>
      prev > current.amount
        ? prev
        : current.bidStatus.includes("Accepted")
        ? current.amount
        : prev,
    0
  );

  useEffect(() => {
    getOffresForEnchere(enchere.id)
      .then((res: any) => {
        if (res.error) {
          throw res.error;
        }
        setOffres(res as Offre[]);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [enchere.id, setLoading, setOffres]);

  useEffect(() => {
    setOpen(openForOffres);
  }, [openForOffres, setOpen]);

  if (loading) return <span>Chargement des offres...</span>;

  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 bg-white p-2">
          <Heading
            title={`L'offre actuelle la plus élevée est de ${highBid}€`}
          />
        </div>
      </div>

      <div className="overflow-auto h-[400px] flex flex-col-reverse px-2">
        {offres.length === 0 ? (
          <EmptyFilter
            title="Aucune offre pour cette enchère"
            subtitle="N'hésitez pas à faire une offre"
          />
        ) : (
          <>
            {offres.map((offre) => (
              <OffreProduit key={offre.id} offre={offre} />
            ))}
          </>
        )}
      </div>
      <div className="px-2 pb-2 text-gray-500">
        {!open ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Cette enchère est terminée
          </div>
        ) : enchere.auctionStart &&
          new Date(enchere.auctionStart) > new Date() ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Cette enchère n'est pas commencée
          </div>
        ) : !user ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Connectez-vous pour faire une offre
          </div>
        ) : user && user.username === enchere.seller ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Vous ne pouvez pas enchérir sur votre propre enchère
          </div>
        ) : (
          <OffreForm enchereId={enchere.id} highBid={highBid} />
        )}
      </div>
    </div>
  );
}
