import React, { useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/user.service";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Login from ".";
import { UserModel } from "app/models/user.model";
import UserInfoNotes from "./components/user-info-notes";
import { CheckIcon, TicketIcon, XIcon } from "@heroicons/react/outline";
import Hud from "layouts/hud/hud-full-screen";
import { useHudContext } from "app/contexts/hud-context";
import notificationService from "app/services/notification.service";
import usersService from "app/services/user.service";
import { useUserContext } from "app/contexts/user-context";
import vehicleService from "app/services/vehicle.service";
import VehicleInventory from "./components/vehicle-inventory";
import VehicleLogItems from "./components/vehicle-log-items";

export enum CategoryTabs {
  NOTES,
  INVENTORY,
  LOG_ITEMS
};

const TargetVehicle: React.FC = () => {
  const navigate = useNavigate();

  const { currentAuthUser } = useAuthContext();
  const { currentVehicle, setCurrentVehicle } = useUserContext();

  const { id } = useParams();

  const [currentTab, setTab] = useState<CategoryTabs | null>();

  useEffect(() => {
    vehicleService.getVehicle(parseInt(id)).then(response => {
      if(response.data !== undefined) {
        var vehicle = response.data;

        setCurrentVehicle(vehicle);
      }
    })
  }, [setCurrentVehicle]);

  const getBooleanIcon = (state: boolean) => {
    return state ? <CheckIcon className="text-[#b6ffba] w-3" scale={1}/> :
      <XIcon className="text-[#ffb6c8] w-3" scale={1}/>;
  }
  
  return (
    <div className="user-info">
      {
        currentVehicle &&
        <div className="flex flex-col gap-3">
          <div className="flex flex-row flex-wrap gap-10">
            <img src="/images/vehicle-icon.png" className="w-36" alt="Logo" />

            <div className="flex flex-col justify-center w-28">
              <p className="text-4xl font-medium font-twk">Name</p>
              <p className="font-normal text-sm text-gray-900">{currentVehicle?.modelName}</p>
            </div>

            <div className="flex flex-col justify-center w-28">
              <p className="text-4xl font-medium font-twk">Wert</p>
              <p className="font-normal text-sm text-gray-900">$ {currentVehicle?.price.toLocaleString('de-DE')}</p>
            </div>

            <div className="flex flex-col justify-center w-56">
              <p className="text-4xl font-medium font-twk">Max-Speed</p>
              <p className="font-normal text-sm text-gray-900">{currentVehicle?.maxSpeed} km/h</p>
            </div>

            <div className="flex flex-col justify-center w-72">
              <p className="text-4xl font-medium font-twk">Mod-Fahrzeug</p>
              <p className="font-normal text-sm text-gray-900 flex flex-row">
                { getBooleanIcon(currentVehicle?.isModCar) }
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-12 p-6 bg-dark-800 rounded-sm mt-5">
            <div className="flex flex-col flex-[0_0_19.5em]">
              <p className="text-4xl font-medium">{currentVehicle.vehiclehash}</p>
              <p className="font-normal text-sm text-gray-900">ID: {currentVehicle?.id}</p>
              <p className="font-normal text-sm text-gray-900">Besitzer: {currentVehicle?.owner} ({currentVehicle?.ownerId})</p>
              <p className="font-normal text-sm text-gray-900 inline-flex gap-1">In Garage: {getBooleanIcon(currentVehicle?.inGarage)}</p>

              <div className="flex flex-col mt-3 gap-2">
                <Button onClick={() => navigate(`/dashboard/users/${currentVehicle?.ownerId}`, { replace: true })}>Besitzerprofil aufrufen</Button>
                {
                  /* 
                   * <Button>Fahrzeug in Garage setzen</Button>
                   * <Button>Fahrzeug respawnen</Button>
                   */
                }
              </div>
            </div>

            <div className="w-full h-full flex flex-col">
              <div className="flex flex-row gap-2 flex-wrap">
                { !(currentAuthUser.rankId <= 2) && <Button onClick={() => setTab(CategoryTabs.INVENTORY)}>Inventar</Button>}
                { !(currentAuthUser.rankId <= 2) && <Button onClick={() => setTab(CategoryTabs.LOG_ITEMS)}>Logs (Item)</Button>}
              </div>

              {{
                [ CategoryTabs.INVENTORY ]: <VehicleInventory />,
                [ CategoryTabs.LOG_ITEMS ]: <VehicleLogItems />
              }[currentTab]}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default TargetVehicle;