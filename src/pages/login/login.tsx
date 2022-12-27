import React, { useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import { useAuthContext } from "app/contexts/auth-context";

import Logo from "assets/vectors/paradox-logo-big.svg";
import authService from "app/services/auth.service";

import { useNavigate } from "react-router-dom";

const Login: React.FC = () => 
{
  const navigate = useNavigate();

  const { setAuthUser } = useAuthContext();
  
  const [userAlias, setUserAlias] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [error, setError] = useState<string>();

  const handleLoginSubmit = (): void => {
    setAuthUser({
      id: 1,
      username: "Walid_Mohammad",
      teamRank: "Founder"
    });

    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="flex justify-center items-center h-full backdrop-blur-sm flex-col">
      <img src="/images/paradox-title-logo.png" className="w-96" alt="Logo" />

      <div className="w-96">
        <div className="flex flex-row gap-3 my-5">
          <Input
            label="Nutzername" />
          
          <Input
            label="Passwort" />
        </div>

        <Button 
          fullWidth={true}
          onClick={handleLoginSubmit}>
            Einloggen
        </Button>
      </div>
    </div>
  );
};

export default Login;