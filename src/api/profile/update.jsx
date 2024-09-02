import { load } from "../../storage/load";

const profile = load("profile");
const token = load("accessToken");
const apiKey = load("API_KEY");

export async function updateProfile({ avatar, venueManager }) {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/holidaze/profiles/" + profile.name,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({
          avatar: {
            url: avatar,
            alt: "profile image",
          },
          venueManager: venueManager,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
