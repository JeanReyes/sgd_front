import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieTheme = (): {[id: string]: number} => {

  if(hasCookie('theme')) {
    const cookiesCart = JSON.parse(getCookie('theme') as string ?? '') 
    return cookiesCart;
  }

  return {}
}

export const ChangeTheme = (theme: string) => {
  console.log(theme);
  
  setCookie("theme", JSON.stringify(theme));
}
