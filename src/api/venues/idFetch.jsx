import { useLocation } from "react-router-dom";

export async function idFetch() {
  const id = window.location.search.replace("?", "");
  const response = await fetch(
    `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`
  );
  const data = await response.json();
  return data;
}
