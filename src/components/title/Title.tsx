
import { titleFont } from "@/app/config/fonts";
import { ButtonBack } from "../button-back/ButtonBack";

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}

export const Title = ({title, subTitle, className}: Props) => {
  return (
    <div className={`${className} md:mb-5 flex gap-4`}>
      <ButtonBack />

      <h1
        className={`antialiased text-2xl md:text-3xl font-semibold`}
      >
        {title}
      </h1>
      {subTitle && <h3 className="text-md hidden sm:flex"> {subTitle} </h3>}
    </div>
  );
}
