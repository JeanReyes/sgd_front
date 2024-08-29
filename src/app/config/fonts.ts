import { Inter as FontSans, Montserrat_Alternates } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const titleFont = Montserrat_Alternates({ 
  subsets: ["latin"],
  weight: ["500", "700"]
}); 


 