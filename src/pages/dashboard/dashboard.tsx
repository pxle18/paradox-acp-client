import React, { useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/present.service";
import { Link, Route, Routes } from "react-router-dom";
import Login from ".";
import UserInfo from "pages/user-info";

const Dashboard: React.FC = () => 
{
  const { currentAuthUser } = useAuthContext();

  return (
    <div className="flex w-full h-screen">
      <div className="lg:flex lg:w-64 hidden bg-dark-800 h-full py-20 px-7">
        <div className="flex flex-col w-64">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-24 h-24" />

            <p className="font-semibold text-center text-red">{ currentAuthUser.teamRank }</p>
            <p className="font-normal text-center -mt-1">{ currentAuthUser.username }</p>

          </div>

          <div className="flex flex-col items-start mt-4 gap-2 overflow-y-auto">
            <p className="font-semibold text-xl uppercase tracking-wider">Navigation</p>

            <Link to="/" className="w-full">
              <Button fullWidth={true}>Dashboard</Button>
            </Link>
            
            <Link to="user-info" className="w-full">
              <Button fullWidth={true}>Spieler</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-28 w-full">
        <Routes>
          <Route path="user-info" element={<UserInfo />} />
          <Route path="vehicle-info" element={<UserInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;