import React, { useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/user.service";
import { Link, Route, Routes } from "react-router-dom";
import Login from ".";
import UserInfo from "pages/user-info";
import Hud from "layouts/hud/hud-full-screen";
import UserInfoDashboard from "pages/user-info/user-info-dashboard";
import VehicleDashboard from "pages/vehicles/vehicle-dashboard";
import TeamDashboard from "pages/team/team-dashboard";

const Dashboard: React.FC = () => 
{
  const { currentAuthUser } = useAuthContext();

  return (
    <div className="flex w-full h-screen">
      <Hud />

      <div className="lg:flex lg:w-64 hidden bg-[#0f0e0e] border-r-dark-700 border-solid border-r-[1px] h-full py-20 px-7">
        <div className="flex flex-col w-64">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-24 h-24" />

            <p className="font-semibold text-center text-xl text-white">{ currentAuthUser.adminRank }</p>
            <p className="font-normal text-center text-sm text-gray-900 leading-3">{ currentAuthUser.username }</p>

          </div>

          <div className="flex flex-col items-start mt-4 gap-2 overflow-y-auto">
            <p className="font-semibold text-xl text-white">Navigation</p>

            <Link to="/" className="w-full">
              <Button fullWidth={true}>Dashboard</Button>
            </Link>
            
            <Link to="users" className="w-full">
              <Button fullWidth={true}>Spieler</Button>
            </Link>

            <Link to="vehicles" className="w-full">
              <Button fullWidth={true}>Fahrzeuge</Button>
            </Link>

            <Link to="teams" className="w-full">
              <Button fullWidth={true}>Fraktionen</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-28 w-full overflow-y-auto">
        <Routes>
          <Route path="users/*" element={<UserInfoDashboard />} />
          <Route path="vehicles/*" element={<VehicleDashboard />} />
          <Route path="teams/*" element={<TeamDashboard />} />
          <Route path="/" element={
            <div className="flex flex-col w-full justify-center items-center bg-dark-800 rounded-sm text-white p-4">
              <p className="font-twk text-5xl">PARADOX Role Play</p>
              <p className="font-twk text-3xl">Admin-Control-Panel</p>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;