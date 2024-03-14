"use client";

import cookies from "cookie-cutter";

const action = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      cookies.set("token", token, {});
      return token;
    } else {
      console.error("JWT token not found in localStorage");
    }
  } else {
    console.error("This code can only be executed in the client-side context");
  }
};

export const setTokenInCookie = () => {
  const token = action();
  console.log(token);
  return token;
};
