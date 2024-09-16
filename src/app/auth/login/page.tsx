import { LoginGrid } from "@/components/auth/LoginGrid";
import { titleFont } from "../../config/fonts";

export default function HomeAuht() {
  return (
    <>
      {process.env.BACK_URL_FOR_FRONT}
      <LoginGrid />
    </>
  );
}
