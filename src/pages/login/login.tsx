import React, { useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import { useAuthContext } from "app/contexts/auth-context";

import Logo from "assets/vectors/paradox-logo-big.svg";
import authService from "app/services/auth.service";

import { useNavigate } from "react-router-dom";
import { KeyIcon, UserIcon } from "@heroicons/react/outline";

const Login: React.FC = () => 
{
  const navigate = useNavigate();

  const { setAuthUser } = useAuthContext();
  
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [error, setError] = useState<string>();

  const handleLoginSubmit = (): void => {
    authService.login(username, password).then(response => {
      if(response.data) {
        var accessTokenModel = response.data;

        localStorage.setItem("accessToken", accessTokenModel.accessToken);
        
        checkLoggedIn();
      } else setError(response.error ?? "Fehler: Bitte versuchen Sie es erneut.");
    });
  }

  const checkLoggedIn = () : void => {
    authService.checkLoggedIn().then(response => {
      if(response.data !== undefined) {
        var account = response.data;

        setAuthUser({
          id: account.id,
          username: account.username,
          adminRank: account.adminRank,
          rankId: account.rankId
        })

        navigate("/dashboard", { replace: true });
      }
    })
  }

  useEffect(() => {
    checkLoggedIn();
  }, [setAuthUser]);

  return (
    <div className="flex justify-center items-center h-full backdrop-blur-sm flex-col">
      <img src="/images/paradox-title-logo.png" className="w-96" alt="Logo" />

      <div className="w-96">
        <div className="flex flex-row gap-3 my-5">
          <Input
            icon={<UserIcon />}
            placeholder="Nutzername:"
            onChange={username => setUsername(username.target.value)} />
          
          <Input
            icon={<KeyIcon />}
            type="password"
            placeholder="Passwort:"
            onChange={password => setPassword(password.target.value)} />
        </div>

        <Button 
          className="relative -top-2"
          fullWidth={true}
          onClick={handleLoginSubmit}>
            Einloggen
        </Button>

        { error && 
          <p className="text-[#ffb7b7]">{ error }</p>
        }
      </div>
    </div>
  );
};

export default Login;