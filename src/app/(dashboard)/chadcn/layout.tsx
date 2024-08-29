import { InsideNav } from "./InsideNav";

export default function ChadcnLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-2">
      <InsideNav/>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}