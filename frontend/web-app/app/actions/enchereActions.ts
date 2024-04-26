"use server";

import { Enchere, PagedResult } from "@/types";

export async function getData(
  pageNumber: number,
  pageSize: number
): Promise<PagedResult<Enchere>> {
  const res = await fetch(
    `http://localhost:6001/recherche?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );

  if (!res.ok) throw new Error("Erreur lors de la récupération des données");

  return res.json();
}
