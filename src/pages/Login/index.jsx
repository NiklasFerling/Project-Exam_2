import React from "react";
import LoginForm from "../../components/LoginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen pt-36">
      <Link to={"/"}>
        <h1 className="text-3xl text-center mb-20">LOGO</h1>
      </Link>
      <div className="flex flex-col mx-auto w-96 p-5 border border-white rounded-xl overflow-hidden bg-green-200/25 drop-shadow-3xl backdrop-blur-lg">
        <h2 className="text-xl my-4 text-center">Log In</h2>
        <LoginForm />
      </div>
    </div>
  );
}
export default Login;
