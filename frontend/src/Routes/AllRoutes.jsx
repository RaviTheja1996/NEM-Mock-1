import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contacts from "../pages/Contacts";
import Appointment from "../pages/Appointment";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  );
};

export default AllRoutes;
