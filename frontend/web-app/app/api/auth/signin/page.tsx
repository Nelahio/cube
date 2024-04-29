import EmptyFilter from "@/app/components/EmptyFilter";
import React from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <EmptyFilter
      title="Vous avez besoin de vous connecter pour effectuer cette action"
      subtitle="Cliquez pour vous connecter"
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
}
