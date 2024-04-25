import React from "react";

async function getData() {
  const res = await fetch("http://localhost:6001/recherche");

  if (!res.ok) throw new Error("Erreur lors de la récupération des données");

  return res.json();
}

export default async function Listings() {
  const data = await getData();
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
