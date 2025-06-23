import Cookies from "js-cookie";

export function setCookie(token: string) {
  Cookies.set("token", `Bearer ${token}`, {
    secure: true,
    sameSite: "strict",
  });
}
export function getCookie(): string {
  return Cookies.get("token") as string;
}

export function removeCookie() {
  Cookies.remove("token");
}
