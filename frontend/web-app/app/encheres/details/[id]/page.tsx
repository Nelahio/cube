import React from "react";

export default function Details({ params }: { params: { id: string } }) {
  return <div>Détails pour {params.id}</div>;
}