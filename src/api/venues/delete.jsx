import { load } from "../../storage/load";

export async function deleteVenue(id) {
  const profile = load("profile");
  const apiKey = load("API_KEY");
  const url = "https://v2.api.noroff.dev/holidaze/venues/" + id;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
}
