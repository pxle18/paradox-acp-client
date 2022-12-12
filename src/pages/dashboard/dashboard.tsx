import React, { useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/present.service";

const Dashboard: React.FC = () => 
{
  const { setAuthUser, currentAuthUser } = useAuthContext();

  const [callbackMessage, setCallbackMessage] = useState<string>();

  const openPresent = (): void => {
     presentService.openPresent().then(response => {
      if(response.success) {
        var present = response.content;

        currentAuthUser.hasGiftClaimed = true;
        currentAuthUser.giftClaimed = present.item;

        setAuthUser(currentAuthUser);
        setCallbackMessage("");
      } else setCallbackMessage(response.content);
    });
  }

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

          <div className="text-center">
            <p className="font-default text-base">Willkommen, { currentAuthUser?.username }.</p>
            <p className="font-default text-sm">
              {
                currentAuthUser.hasGiftClaimed ? 
                  "Du hast bereits dein Geschenk abgeholt." :
                  "Bist du bereit dein tägliches Geschenk abzuholen?"
              }
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img src="/images/gift-icon.png" className="w-1/3" alt="Geschenk" />
            <div className="flex flex-col">
              <p className="font-semibold uppercase tracking-widest">TAG { new Date().getDate() }</p>
              <p className="font-medium spacing tracking-tight uppercase -my-2">
                {
                  currentAuthUser.hasGiftClaimed ? 
                    currentAuthUser.giftClaimed :
                    "Unbekannter Inhalt"
                }
              </p>
            </div>
          </div>
          { callbackMessage }
          <p>
              { 
                currentAuthUser.christmasCode != "" && ("Dein Code: " + currentAuthUser.christmasCode)
              }
            </p>
          { !currentAuthUser?.hasGiftClaimed && <Button className="!mt-3" fullWidth={true} onClick={() => openPresent()}>Geschenk öffnen</Button>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;