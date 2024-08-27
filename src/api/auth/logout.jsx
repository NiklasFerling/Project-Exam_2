import { remove } from "../../storage/remove";

export function logout() {
  remove("accessToken");
  console.log("Logged out");
}
