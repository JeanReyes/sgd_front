import { initSession, removeSession } from "@/actions/auth/cookies";
import { Session, UserLogin } from "@/interfaces/session";
import { create } from "zustand";


interface State {
  session: Session;
  signIn: (data : Session) => void;
  signOut: () => void;
  setSession: (session: Session) => void;
}


export const useSession = create<State>()((set) => ({
  session: {} as Session,
  signIn: async (user: Session) => {
    initSession(user);
    set({ session: user });
  },
  signOut: () => {
    removeSession();
    set({ session: {} as Session });
  },
  setSession: (session: Session) => set({ session: session }),
}));
