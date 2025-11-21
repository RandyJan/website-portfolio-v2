// store.ts or globalStore.ts
import { create } from "zustand";

export interface GlobalState {
  is_mobile: boolean;
  is_dark: boolean;
  set_is_mobile: (is_mobile: boolean) => void;
  set_is_dark: (is_dark: boolean) => void;
}

export const GlobalStore = create<GlobalState>((set) => ({
  is_mobile: false,
  is_dark: false,
  set_is_mobile: (is_mobile) => set({ is_mobile }),
  set_is_dark: (is_dark) => set({ is_dark }),
}));
