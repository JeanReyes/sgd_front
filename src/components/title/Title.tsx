import { titleFont } from "@/app/config/fonts";

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}

export const Title = ({title, subTitle, className}: Props) => {
  return (
    <div className={`${className}`}>
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-3`}>
        {title}
      </h1>
      {
        subTitle && (
          <h3 className="text-xl mb-5"> {subTitle} </h3>
        )
      }
    </div>
  );
}
