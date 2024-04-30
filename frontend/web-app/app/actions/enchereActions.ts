"use server";

import { Enchere, PagedResult } from "@/types";
import { getTokenWorkaround } from "./authActions";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Enchere>> {
  return await fetchWrapper.get(`recherche${query}`);
}

export async function UpdateEnchereTest() {
  const data = {
    size: Math.floor(Math.random() * 10000) + 1,
  };

  const token = await getTokenWorkaround();

  const res = await fetch(
    "http://localhost:6001/encheres/6a5011a1-fe1f-47df-9a32-b5346b289391",
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) return { status: res.status, message: res.statusText };

  return res.statusText;
}
