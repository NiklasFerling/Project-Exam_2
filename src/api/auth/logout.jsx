import { remove } from "../../storage/remove";

export function logout() {
  remove("accessToken");
  remove("profile");
  remove("API_KEY");
}
