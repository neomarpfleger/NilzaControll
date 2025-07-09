import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import EPIs from "../pages/EPIs/EPIs";
import Colaboradores from "../pages/Colaboradores/Colaboradores";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/epis" element={<EPIs />} />
      <Route path="/colaboradores" element={<Colaboradores />} />
    </Routes>
  );
}

export default AppRoutes;
