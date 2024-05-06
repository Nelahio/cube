"use client";

import React, { useEffect, useState } from "react";
import EnchereCard from "./EnchereCard";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/enchereActions";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { shallow } from "zustand/shallow";
import qs from "query-string";
import EmptyFilter from "../components/EmptyFilter";
import { useEnchereStore } from "@/hooks/useEnchereStore";

export default function Listings() {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }),
    shallow
  );
  const data = useEnchereStore(
    (state) => ({
      encheres: state.encheres,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }),
    shallow
  );
  const setData = useEnchereStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [setData, url]);

  if (loading) return <h3>Chargement...</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.encheres.map((enchere) => (
              <EnchereCard enchere={enchere} key={enchere._id} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              pageChanged={setPageNumber}
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
            />
          </div>
        </>
      )}
    </>
  );
}
