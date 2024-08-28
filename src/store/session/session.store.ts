import { SessionSgd, UserLogin } from "@/interfaces/session";
import { create } from "zustand";
import { getCookie } from 'cookies-next';
import { apiLoginFake, initSession, removeSession } from "@/actions/auth/actions";


interface State {
  session: SessionSgd;
  signIn: ({ user }: SessionSgd) => void;
  signOut: () => void;
  setSession: (session: SessionSgd) => void;
}


export const useSession = create<State>()((set) => ({
  session: {} as SessionSgd,
  signIn: async (user: SessionSgd) => {
    initSession(user);
    set({ session: user });
  },
  signOut: () => {
    removeSession();
    set({ session: {} as SessionSgd });
  },
  setSession: (session: SessionSgd) => set({ session: session }),
}));
