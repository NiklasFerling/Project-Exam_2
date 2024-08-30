import { load } from "../../storage/load";

export async function fetchApiKey() {
  const profile = load("profile");
  const response = await fetch(
    "https://v2.api.noroff.dev/auth/create-api-key",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${profile.accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
