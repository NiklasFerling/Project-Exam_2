import { load } from "../../storage/load";

export async function deleteBooking(id) {
  const apiKey = load("API_KEY");
  const token = load("accessToken");

  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/holidaze/bookings/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
