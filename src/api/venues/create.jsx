import { load } from "../../storage/load";

export async function createVenue(data, method) {
  const url = "https://v2.api.noroff.dev/holidaze/venues/";
  const apiKey = load("API_KEY");
  const profile = load("profile");

  console.log(data);

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating venue:", error);
  }
}
