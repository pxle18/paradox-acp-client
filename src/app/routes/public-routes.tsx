import CreateCode from "pages/create-code";
import Login from "pages/login";
import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-code" element={<CreateCode />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;