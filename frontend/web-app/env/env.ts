"use server";

export interface Env {
  NEXTAUTH_SECRET?: string;
  NEXTAUTH_URL?: string;
  API_URL?: string;
  AUTH_URL?: string;
  NEXT_PUBLIC_NOTIFY?: string;
}

export const getEnv = async (): Promise<Env> => ({
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  API_URL: process.env.API_URL,
  AUTH_URL: process.env.AUTH_URL,
  NEXT_PUBLIC_NOTIFY: process.env.NEXT_PUBLIC_NOTIFY,
});
