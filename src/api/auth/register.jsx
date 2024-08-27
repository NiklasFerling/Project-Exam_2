import { useState } from "react";

export async function register(name, email, password) {
  console.log("name, email, password");
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!data.ok) {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}
