import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useEffect } from "react";
import { load } from "../../storage/load";

function Header() {
  const { isLoggedIn } = useContext(AuthContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const profile = load("profile");

  useEffect(() => {
    const token = load("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  return (
    <header className="sticky top-0 px-10 bg-green-100/50 backdrop-blur-md z-50 border border-b-green-200">
      <nav className="flex justify-between py-5 text-sm font-semibold">
        <Link to="/">
          <p>Holidaze</p>
        </Link>
        {isLoggedIn ? (
          <Link to="profile">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-user"></i>
              <p className="ml-2">{profile.name}</p>
            </div>
          </Link>
        ) : (
          <div className="flex gap-3">
            <Link to="login">Log in</Link>
            <Link to="register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
export default Header;
