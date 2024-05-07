import { Enchere, PagedResult } from "@/types";
import { createWithEqualityFn } from "zustand/traditional";

type State = {
  encheres: Enchere[];
  totalCount: number;
  pageCount: number;
};

type Actions = {
  setData: (data: PagedResult<Enchere>) => void;
  setCurrentPrice: (enchereId: string, montant: number) => void;
};

const initialState: State = {
  encheres: [],
  pageCount: 0,
  totalCount: 0,
};

export const useEnchereStore = createWithEqualityFn<State & Actions>((set) => ({
  ...initialState,

  setData: (data: PagedResult<Enchere>) => {
    set(() => ({
      encheres: data.results,
      totalCount: data.totalCount,
      pageCount: data.pageCount,
    }));
  },

  setCurrentPrice: (enchereId: string, montant: number) => {
    set((state) => ({
      encheres: state.encheres.map((enchere) =>
        enchere._id === enchereId
          ? { ...enchere, currentHighBid: montant }
          : enchere
      ),
    }));
  },
}));
