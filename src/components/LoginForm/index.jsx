import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { save } from "../../storage/save";
import { useState } from "react";
import { fetchApiKey } from "../../api/auth/ApiKey";

// The form displayed on login page

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginForm() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setErrors] = useState(null);

  async function onLogin({ email, password }) {
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.data) {
        setErrors(null);
        setIsLoggedIn(true);
        save("profile", data.data);
        save("accessToken", data.data.accessToken);
        await fetchApiKey().then((data) => {
          save("API_KEY", data.data.key);
        });
        window.location.href = "/";
      } else if (!data.ok) {
        setErrors(data.errors[0].message);
        throw new Error(data.errors[0].message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onLogin)} className="flex flex-col">
      {error ? (
        <p className="p-2 bg-red-200 border border-red-600 rounded-lg">
          {error}
        </p>
      ) : null}
      <label htmlFor="email" className="mt-1">
        Email
      </label>
      <input
        {...register("email")}
        placeholder="Email"
        className="focus:outline-none px-2 py-1 rounded-lg border border-green-200"
      />
      <p>{errors.email?.message}</p>
      <label htmlFor="password" className="mt-3">
        Password
      </label>
      <input
        {...register("password")}
        placeholder="Password"
        type="password"
        className="focus:outline-none px-2 py-1 rounded-lg border border-green-200"
      />
      <p>{errors.password?.message}</p>
      <button type="submit" className="mt-5">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
