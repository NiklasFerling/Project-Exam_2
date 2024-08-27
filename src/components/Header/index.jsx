import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useEffect } from "react";
import { load } from "../../storage/load";

function Header() {
  const { isLoggedIn } = useContext(AuthContext);
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = load("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [load, setIsLoggedIn]);

  return (
    <header className="sticky top-0 px-10 bg-green-100/50 backdrop-blur-sm z-50 border border-b-green-200">
      <nav className="flex justify-between py-5 text-sm font-semibold">
        <Link to="/">
          <p>Hollidaze</p>
        </Link>
        {isLoggedIn ? (
          <Link to="profile">
            <i className="fa-regular fa-user"></i>
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
