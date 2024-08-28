import { remove } from "../../storage/remove";

export function logout() {
  remove("accessToken");
}
