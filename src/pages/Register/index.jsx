import RegisterForm from "../../components/RegisterForm";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="h-screen pt-36">
      <Link to={"/"}>
        <h1 className="text-3xl text-center mb-20">Hollidaze</h1>
      </Link>
      <div className="flex flex-col mx-auto w-96 p-5 border border-white rounded-xl overflow-hidden bg-green-200/25 drop-shadow-3xl backdrop-blur-lg">
        <h2 className="text-xl my-4 text-center">New Account</h2>
        <RegisterForm />
      </div>
      <p className="text-neutral-600 mt-3 text-center">
        Already have an account?
        <Link to={"/login"} className="text-blue-500 ml-3">
          Log in here
        </Link>
      </p>
    </div>
  );
}
export default Register;
