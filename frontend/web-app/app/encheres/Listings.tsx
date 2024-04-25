"use client";

import React, { useEffect, useState } from "react";
import EnchereCard from "./EnchereCard";
import { Enchere } from "@/types";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/enchereActions";

export default function Listings() {
  const [encheres, setEncheres] = useState<Enchere[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getData(pageNumber).then((data) => {
      setEncheres(data.results);
      setPageCount(data.pageCount);
    });
  }, [pageNumber]);

  if (encheres.length === 0) return <h3>Chargement...</h3>;

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {encheres.map((enchere) => (
          <EnchereCard enchere={enchere} key={enchere._id} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={pageNumber}
          pageCount={pageCount}
          pageChanged={setPageNumber}
        />
      </div>
    </>
  );
}
