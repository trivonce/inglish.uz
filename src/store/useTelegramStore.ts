import { create } from "zustand";

type TelegramUser = {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
};

type TelegramStore = {
  user: TelegramUser | null;
  setUser: (user: TelegramUser) => void;
};

export const useTelegramStore = create<TelegramStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
