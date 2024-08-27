import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import login from "../../api/auth/login";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginForm() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onLogin({ email, password }) {
    console.log(email, password);
    try {
      await login(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onLogin)} className="flex flex-col">
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
      <button type="submit" className="mt-5">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
