"use server";

import { Enchere, PagedResult } from "@/types";

export async function getData(
  pageNumber: number = 1
): Promise<PagedResult<Enchere>> {
  const res = await fetch(
    `http://localhost:6001/recherche?pageSize=5&pageNumber=${pageNumber}`
  );

  if (!res.ok) throw new Error("Erreur lors de la récupération des données");

  return res.json();
}
