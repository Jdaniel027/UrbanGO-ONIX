import { create } from "zustand";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

type SelectingMode = "origin" | "destination" | null;

type TripState = {
  userLocation: Coordinates | null;
  origin: Coordinates | null;
  destination: Coordinates | null;
  selecting: SelectingMode;

  setUserLocation: (coords: Coordinates) => void;
  setOrigin: (coords: Coordinates) => void;
  setDestination: (coords: Coordinates) => void;
  setSelecting: (mode: SelectingMode) => void;
  resetTrip: () => void;
};

export const useTripStore = create<TripState>((set) => ({
  userLocation: null,
  origin: null,
  destination: null,
  selecting: null,

  setUserLocation: (coords) => set({ userLocation: coords }),

  setOrigin: (coords) => set({ origin: coords }),

  setDestination: (coords) => set({ destination: coords }),

  setSelecting: (mode) => set({ selecting: mode }),

  resetTrip: () =>
    set({
      origin: null,
      destination: null,
      selecting: null,
    }),
}));
