"use client";

import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import TextareaInput from "../components/TextareaInput";
import DateInput from "../components/DateInput";
import { usePathname, useRouter } from "next/navigation";
import { createEnchere, updateEnchere } from "../actions/enchereActions";
import toast from "react-hot-toast";
import { Enchere } from "@/types";

type Props = {
  enchere?: Enchere;
};

export default function EnchereForm({ enchere }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (enchere) {
      const {
        make,
        name,
        state,
        category,
        description,
        year,
        color,
        imageUrl,
      } = enchere;
      reset({
        make,
        name,
        state,
        category,
        description,
        year,
        color,
        imageUrl,
      });
    }
    setFocus("make");
  }, [enchere, reset, setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      let id = "";
      let res;
      if (pathname === "/encheres/create") {
        res = await createEnchere(data);
        id = res.id;
      } else {
        console.log(enchere);
        if (enchere) {
          res = await updateEnchere(data, enchere.id);
          console.log(data, "res");
          id = enchere.id;
        }
      }
      if (res.error) {
        throw res.error;
      }
      router.push(`/encheres/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  }

  const categoryOptions = [
    { value: "", label: "Sélectionnez une catégorie" },
    { value: "Parfum", label: "Parfums" },
    { value: "Accessoire", label: "Accessoires" },
    { value: "Vêtement", label: "Vêtements" },
    { value: "Bijou", label: "Bijoux" },
  ];
  const stateOptions = [
    { value: "", label: "Sélectionnez un état" },
    { value: "New", label: "Neuf" },
    { value: "LikeNew", label: "Comme neuf" },
    { value: "GoodCondition", label: "Bon état" },
    { value: "Worn", label: "Usé" },
  ];
  const colorOptions = [
    { value: "", label: "Sélectionnez une couleur" },
    { value: "Rouge", label: "Rouge" },
    { value: "Orange", label: "Orange" },
    { value: "Jaune", label: "Jaune" },
    { value: "Vert", label: "Vert" },
    { value: "Bleu", label: "Bleu" },
    { value: "Violet", label: "Violet" },
    { value: "Rose", label: "Rose" },
    { value: "Marron", label: "Marron" },
    { value: "Gris", label: "Gris" },
    { value: "Noir", label: "Noir" },
    { value: "Blanc", label: "Blanc" },
  ];
  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Marque"
        name="make"
        control={control}
        rules={{ required: "La marque est obligatoire" }}
      />
      <Input
        label="Nom du produit"
        name="name"
        control={control}
        rules={{ required: "Le nom du produit est obligatoire" }}
      />
      <SelectInput
        label="Couleur"
        name="color"
        control={control}
        options={colorOptions}
        rules={{ required: "La couleur est obligatoire" }}
      />

      <div className="grid grid-cols-3 gap-3">
        <Input
          label="Année"
          name="year"
          control={control}
          type="number"
          rules={{ required: "L'année est obligatoire" }}
        />
        <SelectInput
          label="Catégorie"
          name="category"
          control={control}
          options={categoryOptions}
          rules={{ required: "La catégorie est obligatoire" }}
        />
        <SelectInput
          label="Etat"
          name="state"
          control={control}
          options={stateOptions}
          rules={{ required: "L'état du produit est obligatoire" }}
        />
      </div>

      <TextareaInput
        id="description"
        label="Description"
        name="description"
        control={control}
        rules={{ required: "La description du produit est obligatoire" }}
      />
      <Input
        label="Url de l'image"
        name="imageUrl"
        control={control}
        rules={{ required: "L'image est obligatoire" }}
      />
      {pathname === "/encheres/create" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Prix de réserve (entrez 0 si pas de réserve)"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: "Le prix de réserve est obligatoire" }}
            />
            <DateInput
              label="Fin de l'enchère"
              name="auctionEnd"
              control={control}
              dateFormat={"dd MMMM yyyy HH:mm"}
              showTimeSelect
              rules={{ required: "La fin de l'enchère est obligatoire" }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button outline color={"gray"} onClick={router.back}>
          Annuler
        </Button>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type="submit"
          outline
          color={"success"}
        >
          Envoyer
        </Button>
      </div>
    </form>
  );
}
