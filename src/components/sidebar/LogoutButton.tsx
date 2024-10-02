'use client'

import { useSession } from "@/store/session/session.store";
import { CiLogout } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

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

  // if (status === 'loading') {
  //   return (
  //     <button className="px-4 py-3 flex items-center space-x-4 rounded-md group">
  //       {/* <IoShieldOutline /> */}
  //       <span className="dark:group-hover:text-gray-400">Espere...</span>
  //     </button>
  //   );
  // }

  //   if (status === "unauthenticated") {
  //     return (
  //       <button
  //         onClick={() => signIn()}
  //         className="px-4 py-3 flex items-center space-x-4 rounded-md group border-2 border-white"
  //       >
  //         {/* <CiLogout /> */}
  //         <span className="dark:group-hover:text-gray-400">Ingresar</span>
  //       </button>
  //     );
  //   }

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-3 flex items-center space-x-4 rounded-md group"
    >
      {/* <CiLogout /> */}
      {!collapse && (
        <span>Logout</span>
      )}
    </button>
  );
}
