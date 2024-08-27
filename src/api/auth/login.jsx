import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import save from "../../storage/save";

async function login(email, password) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.data) {
      console.log(data.data.accessToken);
    } else if (data.errors) {
      return data.errors[0].message;
    }
    save("accessToken", data.data.accessToken);
    console.log("logged in");
    return data;
  } catch (error) {
    return error;
  }
}

export default login;
