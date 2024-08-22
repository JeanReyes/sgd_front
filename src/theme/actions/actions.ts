import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieTheme = () => {

  if(hasCookie('theme')) {
    const cookiesCart = JSON.parse(getCookie('theme') as string ?? '') 
    return cookiesCart;
  }

  return ''
}

export const changeTheme = (theme: string) => {
  console.log(theme);
  
  setCookie("theme", JSON.stringify(theme));
}
