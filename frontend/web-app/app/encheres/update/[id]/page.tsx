import Heading from "@/app/components/Heading";
import React from "react";
import EnchereForm from "../../EnchereForm";
import { getDetailedViewData } from "@/app/actions/enchereActions";

export default async function Update({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Edition de l'enchère"
        subtitle="Indiquez ce que vous voulez éditer"
      />
      <EnchereForm enchere={data} />
    </div>
  );
}
