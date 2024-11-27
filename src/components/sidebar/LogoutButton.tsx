'use client'

import { useSession } from "@/store/session/session.store";
import { CiLogout } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  collapse?: boolean;
}

export const LogoutButton = ({collapse = false}: Props) => {
  const router = useRouter()
  const signOut = useSession((state) => state.signOut);

  const handleSignOut = () => {
    signOut();
    router.refresh();
  }

  return (
    <Button
      onClick={handleSignOut}
      className=" flex items-center space-x-4 rounded-md group w-full"
    >
      {/* <CiLogout /> */}
      {!collapse && (
        <>
          <LogOut />
          <span>Cerrar sesión</span>
        </>
      )}
    </Button>
  );
}
