

import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieCollapse = ():boolean => {
  if(hasCookie('collapse')) {
    const cookiesCart = JSON.parse(getCookie('collapse') as string ?? '') 
    return cookiesCart;
  }

  return false
}

export const changeCollapseMenu = (collapse: boolean) => {
  setCookie("collapse", JSON.stringify(collapse));
}
