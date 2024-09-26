import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

// The form displayed on register page

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

  const [registerMessage, setRegisterMessage] = useState(null);

  async function onRegister({ name, email, password }) {
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
      if (data.data) {
        setRegisterMessage(
          <p className="p-2 bg-green-200 border border-green-600 rounded-lg">
            User registered sucessfully!
            <Link to="/login" className="text-blue-500 ml-3">
              login
            </Link>
          </p>
        );
      } else if (data.errors) {
        setRegisterMessage(
          <p className="p-2 bg-red-200 border border-red-600 rounded-lg">
            {data.errors[0].message}
          </p>
        );
        throw new Error(data.errors[0].message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onRegister)} className="flex flex-col">
      {registerMessage ? registerMessage : null}
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
