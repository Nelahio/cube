"use client";

import { Button, TextInput } from "flowbite-react";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import TextareaInput from "../components/TextareaInput";
import DateInput from "../components/DateInput";
import { useRouter } from "next/navigation";
import { createEnchere } from "../actions/enchereActions";

export default function EnchereForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    setFocus("make");
  }, [setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      const res = await createEnchere(data);
      if (res.error) {
        throw new Error(res.error);
      }
      router.push(`/encheres/details/${res.id}`);
    } catch (error) {
      console.log(error);
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
      <Input
        label="Couleur"
        name="color"
        control={control}
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

      <div className="flex justify-between">
        <Button outline color={"gray"}>
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
