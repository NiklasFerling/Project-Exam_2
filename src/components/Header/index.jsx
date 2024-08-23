import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 px-10 bg-green-100/50 backdrop-blur-sm z-50 border border-b-green-200">
      <nav className="flex justify-between py-5 text-sm font-semibold">
        <Link to="/">
          <p>Hollidaze</p>
        </Link>
        <div className="flex gap-3">
          <Link to="profile">
            <i className="fa-regular fa-user"></i>
          </Link>
          <Link to="login">Log in</Link>
          <Link to="register">Register</Link>
        </div>
      </nav>
    </header>
  );
}
export default Header;
