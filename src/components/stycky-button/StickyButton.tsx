import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function StickyButton({children} : {children: React.ReactNode}) {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    // Detecta si el botón ha alcanzado el borde superior
    if (window.scrollY > 200) {
      // Ajusta este valor según la posición donde quieras que el botón se fije
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
     <div
      className={`transition-all ${
        isSticky
          ? "fixed top-0  transform shadow-lg z-50"
          : "relative"
      }`}
    >
      {children}
    </div>
  );
}
