import { Offre } from "@/types";
import { createWithEqualityFn } from "zustand/traditional";

type State = {
  offres: Offre[];
};

type Actions = {
  setOffres: (offres: Offre[]) => void;
  addOffre: (offre: Offre) => void;
};

export const useOffreStore = createWithEqualityFn<State & Actions>((set) => ({
  offres: [],
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
}));
