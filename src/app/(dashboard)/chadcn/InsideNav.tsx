import Link from "next/link"

const navMap = [
  {
    name: "accordion",
    path: "/chadcn/accordion",
  },
  {
    name: "alert",
    path: "/chadcn/alert",
  },
  {
    name: "button",
    path: "/chadcn/button",
  },
  {
    name: "alert dialog",
    path: "/chadcn/alert-dialog",
  },
  {
    name: "dialog",
    path: "/chadcn/dialog",
  },
  {
    name: "badge",
    path: "/chadcn/badge",
  },
  {
    name: "calendar",
    path: "/chadcn/calendar",
  },
  {
    name: "card",
    path: "/chadcn/card",
  },
  {
    name: "carousel",
    path: "/chadcn/carousel",
  },
  {
    name: "checkbok",
    path: "/chadcn/checkbox",
  },
  {
    name: "command",
    path: "/chadcn/comman",
  },
  {
    name: "context menu",
    path: "/chadcn/context-menu",
  },
  {
    name: "menu bar",
    path: "/chadcn/menu-bar",
  },
  {
    name: "input otp",
    path: "/chadcn/input-otp",
  },
  {
    name: "progress",
    path: "/chadcn/progress",
  },
  {
    name: "sheet",
    path: "/chadcn/sheet",
  },
  {
    name: "skeleton",
    path: "/chadcn/skeleton",
  },
  {
    name: "slider",
    path: "/chadcn/slider",
  },
  {
    name: "sonner",
    path: "/chadcn/sonner",
  },
  {
    name: "toast",
    path: "/chadcn/toast",
  },
  {
    name: "tabs",
    path: "/chadcn/tabs",
  },
];

export const InsideNav = () => {
  return (
    <ul className="flex flex-col gap-2 mb-4">
      {
        navMap.map((nav, i) => (
          <li key={i} className="w-[130px] ">
          <Link 
            className="flex border justify-center dark:border-red-600 px-3 border-sky-600 dark:text-white text-black w-full"
            href={nav.path}
          >
              {nav.name}
          </Link>
          </li>
        ))
      }
    </ul>
  )
}
