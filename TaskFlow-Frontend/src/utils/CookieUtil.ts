import Cookies from "js-cookie";

export function setCookie(token: string) {
  Cookies.set("token", token, {
    secure: true,
    sameSite: "strict",
  });
}
export function getCookie(): string {
  return Cookies.get("token") as string;
}
