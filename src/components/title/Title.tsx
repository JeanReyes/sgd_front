import { titleFont } from "@/app/config/fonts";

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}

export const Title = ({title, subTitle, className}: Props) => {
  return (
    <div className={`${className} mb-5`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold`}
      >
        {title}
      </h1>
      {subTitle && <h3 className="text-md hidden sm:flex"> {subTitle} </h3>}
    </div>
  );
}
