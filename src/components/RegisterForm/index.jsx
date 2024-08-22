import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
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

function onRegister(data) {
  console.log(data);
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onRegister)} className="flex flex-col">
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
