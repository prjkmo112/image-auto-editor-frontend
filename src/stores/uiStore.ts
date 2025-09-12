import { create } from "zustand"


interface UIState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))