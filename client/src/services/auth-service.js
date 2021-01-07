import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
const tokenKey = "dibToken";

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (ex) {
    return false;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function checkLogin() {
  if (hasToken()) {
    const token = jwtDecode(getJwt());
    // console.log("hastoken");
    try {
      if (Date.now() >= token.exp * 1000) return false;
      else {
        // console.log(jwt.verify(getJwt(), "secret"));
        return jwt.verify(getJwt(), "secret", () => {
          // console.log("token verified");
          return true;
        });
      }
    } catch (e) {
      return false;
    }
  } else return false;
}

export function hasToken() {
  if (localStorage.getItem(tokenKey) === null) return false;
  else return true;
}

export function getPatientId() {
  const token = jwtDecode(getJwt());
  return token.userId;
}

export default {
  logout,
  getCurrentUser,
  getJwt,
  checkLogin,
  getPatientId
};
