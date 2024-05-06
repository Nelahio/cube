import { Offre } from "@/types";
import { createWithEqualityFn } from "zustand/traditional";

type State = {
  offres: Offre[];
  open: boolean;
};

type Actions = {
  setOffres: (offres: Offre[]) => void;
  addOffre: (offre: Offre) => void;
  setOpen: (value: boolean) => void;
};

export const useOffreStore = createWithEqualityFn<State & Actions>((set) => ({
  offres: [],
  open: true,

  setOffres: (offres: Offre[]) => {
    set(() => ({
      offres,
    }));
  },

  addOffre: (offre: Offre) => {
    set((state) => ({
      offres: !state.offres.find((x) => x.id === offre.id)
        ? [offre, ...state.offres]
        : [...state.offres],
    }));
  },

  setOpen: (value: boolean) => {
    set(() => ({
      open: value,
    }));
  },
}));
