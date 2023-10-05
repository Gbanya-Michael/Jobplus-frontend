import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

const AUTH_KEY = "jobplus-token";

export const useCookie = () => {
  //
  const saveAuthCookie = (token, expires = 4 / 24) => {
    cookie.set(AUTH_KEY, token, { expires: expires });
  };

  const deleteAuthCookie = () => {
    cookie.remove(AUTH_KEY);
  };
  //
  const getAuthCookie = () => {
    return cookie.get(AUTH_KEY);
  };
  //
  const isAuthCookieExpired = () => {
    const token = getAuthCookie();
    if (!token) return true;
    const { exp } = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  };
  //
  const hasValidAuthCookie = () => {
    return !isAuthCookieExpired();
  };

  return {
    saveAuthCookie,
    deleteAuthCookie,
    getAuthCookie,
    isAuthCookieExpired,
    hasValidAuthCookie,
  };
};
