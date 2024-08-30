import { load } from "../../storage/load";

export async function fetchProfile() {
  try {
    const profile = load("profile");
    const apiKey = load("API_KEY");

    const response = await fetch(
      "https://v2.api.noroff.dev/holidaze/profiles/" + profile.name,
      {
        headers: {
          Authorization: `Bearer ${profile.accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
