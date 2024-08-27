import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState(null);

  function onRegister({ name, email, password }) {
    async function register(name, email, password) {
      console.log("name, email, password");
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }
        );
        const data = await response.json();
        if (!data.ok) {
          throw new Error(data.errors[0].message);
        } else if (data.ok) {
          console.log(data);
        }
      } catch (err) {
        setError(err);
      }
    }
    register(name, email, password);
  }

  return (
    <form onSubmit={handleSubmit(onRegister)} className="flex flex-col">
      {error ? (
        <p className="bg-red-100 border border-red-400 rounded-md p-2">
          {error.message}
        </p>
      ) : null}
      <label htmlFor="name" className="mt-3">
        Name
      </label>
      <input
        {...register("name")}
        placeholder="Name"
        className="focus:outline-none px-2 py-1 rounded-lg border border-green-200"
      />
      <label htmlFor="email" className="mt-3">
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
      <label htmlFor="confirmPassword" className="mt-3">
        Confirm Password
      </label>
      <input
        {...register("confirmPassword")}
        placeholder="Password"
        type="password"
        className="focus:outline-none px-2 py-1 rounded-lg border border-green-200"
      />
      <p>{errors.confirmPassword?.message}</p>
      <button type="submit" className="mt-5">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
