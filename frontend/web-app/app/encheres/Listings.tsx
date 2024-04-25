import React from "react";
import EnchereCard from "./EnchereCard";

async function getData() {
  const res = await fetch("http://localhost:6001/recherche?pageSize=10");

  if (!res.ok) throw new Error("Erreur lors de la récupération des données");

  return res.json();
}

export default async function Listings() {
  const data = await getData();
  return (
    <div className="grid grid-cols-4 gap-6">
      {data &&
        data.results.map((enchere: any) => (
          <EnchereCard enchere={enchere} key={enchere.id} />
        ))}
    </div>
  );
}
