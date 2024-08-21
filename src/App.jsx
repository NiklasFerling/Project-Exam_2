import background from "./assets/beams-home@95.jpg";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="bg-[url('./assets/beams-home@95.jpg')] bg-no-repeat bg-top bg-contain">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
