import { create } from "zustand";

export interface MusicState {
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;
  togglePlay: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isPlaying: false,
  setPlaying: (playing) => set({ isPlaying: playing }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
