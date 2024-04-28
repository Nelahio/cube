import { getSession } from "../actions/authActions";
import React from "react";
import Heading from "../components/Heading";

export default async function Session() {
  const session = await getSession();
  return (
    <div>
      <Heading title="Tableau de bord de session" />
      <div className="bg-blue-200 border-2 border-blue-500">
        <h3 className="text-lg">Données de session</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
