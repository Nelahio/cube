import React from "react";

export default function Details({ params }: { params: { id: string } }) {
  return <div>Mise à jour pour {params.id}</div>;
}
