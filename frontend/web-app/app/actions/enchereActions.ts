"use server";

import { Enchere, Offre, PagedResult } from "@/types";
import { getTokenWorkaround } from "./authActions";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";
import { revalidatePath } from "next/cache";

export async function getData(query: string): Promise<PagedResult<Enchere>> {
  return await fetchWrapper.get(`recherche${query}`);
}

export async function updateEnchereTest() {
  const data = {
    description: "Nouvelle description",
  };

  return await fetchWrapper.put(
    "encheres/6a5011a1-fe1f-47df-9a32-b5346b289391",
    data
  );
}

export async function createEnchere(data: FieldValues) {
  return await fetchWrapper.post("encheres", data);
}

export async function getDetailedViewData(id: string): Promise<Enchere> {
  return await fetchWrapper.get(`encheres/${id}`);
}

export async function updateEnchere(data: FieldValues, id: string) {
  const res = await fetchWrapper.put(`encheres/${id}`, data);
  revalidatePath(`/encheres/${id}`);
  return res;
}

export async function deleteEnchere(id: string) {
  return await fetchWrapper.del(`encheres/${id}`);
}

export async function getOffresForEnchere(id: string): Promise<Offre[]> {
  return await fetchWrapper.get(`offres/${id}`);
}
