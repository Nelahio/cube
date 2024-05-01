"use server";

import { Enchere, PagedResult } from "@/types";
import { getTokenWorkaround } from "./authActions";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValue, FieldValues } from "react-hook-form";

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
