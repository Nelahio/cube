import {
  getDetailedViewData,
  getOffresForEnchere,
} from "@/app/actions/enchereActions";
import Heading from "@/app/components/Heading";
import React from "react";
import CountdownTimer from "../../CountdownTimer";
import EnchereImage from "../../EnchereImage";
import DetailedSpecs from "./DetailedSpecs";
import { getCurrentUser } from "@/app/actions/authActions";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import OffreList from "./OffreList";

export default async function Details({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);
  const user = await getCurrentUser();
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Heading title={`${data.make} ${data.name}`} />
          {user?.username === data.seller && (
            <>
              <EditButton id={data.id} />
              <DeleteButton id={data.id} />
            </>
          )}
        </div>

        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Temps restant :</h3>
          <CountdownTimer
            auctionEnd={data.auctionEnd}
            auctionStart={data.auctionStart}
            updatedAt={data.updatedAt}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-2">
        <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
          <EnchereImage imageUrl={data.imageUrl} />
        </div>
        <DetailedSpecs enchere={data} />
        <OffreList user={user} enchere={data} />
      </div>
    </div>
  );
}
