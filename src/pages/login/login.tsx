import React, { useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import { useAuthContext } from "app/contexts/auth-context";

import Logo from "assets/vectors/paradox-logo.svg";
import authService from "app/services/auth.service";
import { useNavigate } from "react-router-dom";

export enum LoginModes {
  CREDENTIALS,
  CODE
}

const Login: React.FC = () => 
{
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  
  const [christmasCode, setChristmasCode] = useState<string>();

  const [userAlias, setUserAlias] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const [loginMode, setLoginMode] = useState<LoginModes>(LoginModes.CREDENTIALS);

  const handleLoginSubmit = (): void => {
    if(loginMode == LoginModes.CODE) {
      authService.loginWithCode(christmasCode).then(response => {
        if(response.success) {
          var account = response.content;
  
          setAuthUser({
            id: account.id,
            username: account.name,
            giftClaimed: account.giftClaimed,
            hasGiftClaimed: account.hasGiftClaimed,
            christmasCode: account.christmasCode
          })
  
          localStorage.setItem("accessToken", response.accessToken);
        } else setError(response.content);
      });

      return;
    }

    authService.login(userAlias, password).then(response => {
      if(response.success) {
        var account = response.content;

        setAuthUser({
          id: account.id,
          username: account.name,
          giftClaimed: account.giftClaimed,
          hasGiftClaimed: account.hasGiftClaimed,
          christmasCode: account.christmasCode
        })

        localStorage.setItem("accessToken", response.accessToken);
      } else setError(response.content);
    });
  }

  useEffect(() => {
    authService.checkLoggedIn().then(response => {
      if(response.success) {
        var account = response.content;

        setAuthUser({
          id: account.id,
          username: account.name,
          giftClaimed: account.giftClaimed,
          hasGiftClaimed: account.hasGiftClaimed,
          christmasCode: account.christmasCode
        })

        localStorage.setItem("accessToken", response.accessToken);
      }
    })
  });

  return (
    <div className="flex justify-center items-center h-full backdrop-blur-sm">
      <div className="flex bg-primary bg-opacity-30 h-full 2xl:w-3/12 xl:w-1/3 w-full justify-center items-center">
        <div className="flex flex-col items-center justify-center w-full p-16 gap-3">
          <div className="text-center">
            <img src={Logo} alt="Logo" className="w-36"/>
          </div>

          <div className="text-center">
            <p className="font-medium text-3xl">Adventskalender</p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 w-full h-[1px]" />

          <div className="flex justify-center items-center bg-gray-900 bg-opacity-50 border-solid border-gray-800 border-opacity-30 border-[1px] w-full h-12 rounded">
            <p className="font-default text-base">Bitte mit den IC-Logindaten einloggen.</p>
          </div>

          <div className="flex flex-row gap-2">
            <Button onClick={() => setLoginMode(LoginModes.CREDENTIALS)}>Mit Nutzerdaten</Button>
            <Button onClick={() => setLoginMode(LoginModes.CODE)}>Mit Code</Button>
          </div>

          { loginMode == LoginModes.CREDENTIALS ? (
            <>
              <Input 
                label="Nutzername:" 
                fullWidth={true}
                onChange={userAlias => setUserAlias(userAlias.target.value)} />
              
              <Input 
                label="Passwort:" 
                fullWidth={true}
                type="password"
                onChange={password => setPassword(password.target.value)} />
            </>
          ): (
            <>
            <Input 
                label="Login-Code:" 
                fullWidth={true}
                onChange={loginCode => setChristmasCode(loginCode.target.value)} />
            </>
          ) }
          <p>{error}</p>
          <Button fullWidth={true} onClick={handleLoginSubmit}>Einloggen</Button>

          <p className="opacity-80 underline" onClick={() => navigate("/create-code", { replace: true })}>Ich habe keinen Account, bzw. Daten vergessen:</p>
        </div>
      </div>
    </div>
  );
};

export default Login;