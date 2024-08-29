import { InsideNav } from "./InsideNav";

export default function ChadcnLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <InsideNav/>
      <div className="ml-5 mr-5 w-full">
        {children}
      </div>
    </div>
  );
}