"use client";

type Props = {
  enchereId: string;
  highBid: number;
};

import { createOffreForEnchere } from "@/app/actions/enchereActions";
import { useOffreStore } from "@/hooks/useOffreStore";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function OffreForm({ enchereId, highBid }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addOffre = useOffreStore((state) => state.addOffre);

  function onSubmit(data: FieldValues) {
    if (data.amount <= highBid) {
      reset();
      return toast.error("L'offre doit être d'au moins " + (highBid + 1) + "€");
    }

    createOffreForEnchere(enchereId, +data.amount)
      .then((offre) => {
        if (offre.error) throw offre.error;
        addOffre(offre);
        reset();
      })
      .catch((err) => toast.error(err.message));
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 rounded-lg py-2"
    >
      <input
        type="number"
        {...register("amount")}
        className="input-custom text-sm text-gray-600"
        placeholder={`Saisissez votre offre (offre minimale de ${
          highBid + 1
        }€)`}
      />
    </form>
  );
}
