"use client";

import { useEnchereStore } from "@/hooks/useEnchereStore";
import { useOffreStore } from "@/hooks/useOffreStore";
import { Offre } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function SignalRProvider({ children }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const setCurrentPrice = useEnchereStore((state) => state.setCurrentPrice);
  const addOffre = useOffreStore((state) => state.addOffre);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:6001/notifications")
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
            console.log("Evénement OffreCreated reçu");
            if (offre.bidStatus.includes("Accepted")) {
              setCurrentPrice(offre.auctionId, offre.amount);
            }
          });
        })
        .catch((error) => console.log(error));
    }

    return () => {
      connection?.stop();
    };
  }, [connection, setCurrentPrice]);

  return children;
}
