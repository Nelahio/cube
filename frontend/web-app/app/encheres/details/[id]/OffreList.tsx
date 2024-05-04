"use client";

import { getOffresForEnchere } from "@/app/actions/enchereActions";
import Heading from "@/app/components/Heading";
import { useOffreStore } from "@/hooks/useOffreStore";
import { Enchere, Offre } from "@/types";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OffreProduit from "./OffreProduit";

type Props = {
  user: User | null;
  enchere: Enchere;
};

export default function OffreList({ user, enchere }: Props) {
  const [loading, setLoading] = useState(true);
  const offres = useOffreStore((state) => state.offres);
  const setOffres = useOffreStore((state) => state.setOffres);

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

  if (loading) return <span>Chargement des offres...</span>;

  return (
    <div className="border-2 rounded-lg p-2 bg-gray-100">
      <Heading title="Offres" />
      {offres.map((offre) => (
        <OffreProduit key={offre.id} offre={offre} />
      ))}
    </div>
  );
}
