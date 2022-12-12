import React, { useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import { useAuthContext } from "app/contexts/auth-context";
import { useNavigate } from "react-router-dom";

import Logo from "assets/vectors/paradox-logo.svg";
import authService from "app/services/auth.service";


const CreateCode: React.FC = () => 
{
  const navigate = useNavigate();

  const [christmasCode, setChristmasCode] = useState<string>();
  const [callbackMessage, setCallbackMessage] = useState<string>();

  const handleLoginSubmit = (): void => {
    authService.generateChristmasCode().then(response => {
      if(response.success) {
        setChristmasCode(response.content);
        setCallbackMessage("");
      } else setCallbackMessage("");
    })
  }

  useEffect(handleLoginSubmit, [setChristmasCode, setCallbackMessage]);

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

          <div className="flex justify-center items-center bg-gray-900 bg-opacity-50 border-solid border-gray-800 border-opacity-30 border-[1px] w-full p-2 rounded">
            <p>Unten steht nun dein Login-Code: Bitte notiere dir diesen - er ist sehr wichtig! Zu Release hast du einmalig im Spiel die Chance diesen Code einzulösen um all' deine gesammelten Geschenke zu erhalten</p>
          </div>

          <Input 
            value={christmasCode && "Code: " + christmasCode} 
            fullWidth={true}
            />

          <Button fullWidth={true} onClick={() => navigate("/login", { replace: true })}>Ich habe den Code notiert!</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCode;