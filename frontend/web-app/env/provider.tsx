"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Env, getEnv } from "./env";

export const EnvContext = createContext<Env>({});

export const EnvProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [env, setEnv] = useState<Env>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEnv().then((env) => {
      console.log(env, "neeext");
      setEnv(env);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Chargement des configurations...</div>;
  }

  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = (): Env => {
  return useContext(EnvContext);
};
