"use client";

import { useEnchereStore } from "@/hooks/useEnchereStore";
import { useOffreStore } from "@/hooks/useOffreStore";
import { Enchere, EnchereFinished, EnchereStarted, Offre } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "next-auth";
import React, { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import EnchereCreatedToast from "../components/EnchereCreatedToast";
import { getDetailedViewData } from "../actions/enchereActions";
import EnchereFinishedToast from "../components/EnchereFinishedToast";
import EnchereStartedToast from "../components/EnchereStartedToast";

type Props = {
  children: ReactNode;
  user: User | null;
};

export default function SignalRProvider({ children, user }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const setCurrentPrice = useEnchereStore((state) => state.setCurrentPrice);
  const addOffre = useOffreStore((state) => state.addOffre);
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.cubenchere.xyz/notifications"
      : process.env.NEXT_PUBLIC_NOTIFY_URL;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(apiUrl!)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connecté au hub de notification");

          connection.on("OffreCreated", (offre: Offre) => {
            if (offre.bidStatus.includes("Accepted")) {
              setCurrentPrice(offre.auctionId, offre.amount);
            }
            addOffre(offre);
          });

          connection.on("EnchereCreated", (enchere: Enchere) => {
            if (user?.username !== enchere.seller) {
              return toast(<EnchereCreatedToast enchere={enchere} />, {
                duration: 10000,
              });
            }
          });

          connection.on("EnchereStarted", (startedEnchere: EnchereStarted) => {
            const enchere = getDetailedViewData(startedEnchere.auctionId);
            return toast.promise(
              enchere,
              {
                loading: "Chargement",
                success: (enchere) => <EnchereStartedToast enchere={enchere} />,
                error: (err) => "Enchere commencée !",
              },
              { success: { duration: 10000, icon: null } }
            );
          });

          connection.on(
            "EnchereFinished",
            (finishedEnchere: EnchereFinished) => {
              const enchere = getDetailedViewData(finishedEnchere.auctionId);
              return toast.promise(
                enchere,
                {
                  loading: "Chargement",
                  success: (enchere) => (
                    <EnchereFinishedToast
                      finishedEnchere={finishedEnchere}
                      enchere={enchere}
                    />
                  ),
                  error: (err) => "Enchere terminée !",
                },
                { success: { duration: 10000, icon: null } }
              );
            }
          );
        })
        .catch((error) => console.log(error));
    }

    return () => {
      connection?.stop();
    };
  }, [addOffre, connection, setCurrentPrice, user?.username]);

  return children;
}
