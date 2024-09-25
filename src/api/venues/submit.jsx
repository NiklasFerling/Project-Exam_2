import { load } from "../../storage/load";

export async function submitVenue(data, method, id) {
  const url = `https://v2.api.noroff.dev/holidaze/venues/${id ? id : ""}`;
  const apiKey = load("API_KEY");
  const profile = load("profile");

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
    return error;
  }
}
