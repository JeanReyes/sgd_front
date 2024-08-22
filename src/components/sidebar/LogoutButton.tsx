'use client'

import { useSession, signOut, signIn } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";

interface Props {
  collapse?: boolean;
}

export const LogoutButton = ({collapse = false}: Props) => {

  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md group">
        {/* <IoShieldOutline /> */}
        <span className="dark:group-hover:text-gray-400">Espere...</span>
      </button>
    );
  }

    if (status === "unauthenticated") {
      return (
        <button
          onClick={() => signIn()}
          className="px-4 py-3 flex items-center space-x-4 rounded-md group border-2 border-white"
        >
          {/* <CiLogout /> */}
          <span className="dark:group-hover:text-gray-400">Ingresar</span>
        </button>
      );
    }

  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md group"
    >
      {/* <CiLogout /> */}
      {!collapse && <span className="dark:group-hover:text-gray-400">Logout</span>}
    </button>
  );
}
