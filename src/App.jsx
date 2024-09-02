import "./components/Calendar/calendar.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Venue from "./pages/Venue";

function App() {
  return (
    <div className="bg-[url('./assets/beams-home@95.jpg')] bg-no-repeat bg-top bg-contain">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="venue/:id" element={<Venue />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
