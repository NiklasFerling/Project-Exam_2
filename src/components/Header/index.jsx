import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 px-10 bg-green-100/50 backdrop-blur-sm z-50 border border-b-green-200">
      <nav className="flex justify-between py-5 text-sm font-semibold">
        <Link to="/">
          <p>LOGO</p>
        </Link>
        <Link to="profile">
          <i className="fa-regular fa-user"></i>
        </Link>
      </nav>
    </header>
  );
}
export default Header;
