import type { NavigateFunction } from "react-router-dom";

export const gotoPageWithParams = (navigate: NavigateFunction, page: string, params?: Record<string, any>) => {
  const url = new URL(window.location.origin + '/' + page);
  
  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });
  }
  
   navigate(url.pathname + url.search);
}

export const gotoPage = (navigate: NavigateFunction, page: string) => {
  navigate("/" + page);
}