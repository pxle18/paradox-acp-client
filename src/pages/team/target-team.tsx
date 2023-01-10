import React, { useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/user.service";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Login from ".";
import { UserModel } from "app/models/user.model";
import { CheckIcon, TicketIcon, XIcon } from "@heroicons/react/outline";
import Hud from "layouts/hud/hud-full-screen";
import { useHudContext } from "app/contexts/hud-context";
import notificationService from "app/services/notification.service";
import usersService from "app/services/user.service";
import { useUserContext } from "app/contexts/user-context";
import vehicleService from "app/services/vehicle.service";
import teamService from "app/services/team.service";
import TeamVehicles from "./components/team-vehicles";
import TeamMembers from "./components/team-members";

export enum CategoryTabs {
  NOTES,
  INVENTORY,
  VEHICLES,
  MEMBERS
};

const TargetVehicle: React.FC = () => {
  const navigate = useNavigate();

  const { currentAuthUser } = useAuthContext();
  const { currentTeam, setCurrentTeam } = useUserContext();

  const { id } = useParams();

  const [currentTab, setTab] = useState<CategoryTabs | null>();

  useEffect(() => {
    teamService.getTeam(
      parseInt(id)
    ).then(response => {
      if(response.data !== undefined) {
        var team = response.data;

        setCurrentTeam(team);
      }
    })
  }, [setCurrentTeam]);

  const getBooleanIcon = (state: boolean) => {
    return state ? <CheckIcon className="text-[#b6ffba] w-3" scale={1}/> :
      <XIcon className="text-[#ffb6c8] w-3" scale={1}/>;
  }
  
  return (
    <div className="user-info">
      {
        currentTeam &&
        <div className="flex flex-col gap-3">
          <div className="flex flex-row flex-wrap gap-10 items-center">
            <img src={`/images/teams/${currentTeam.id}.png`} className="w-12 h-12" alt="Logo" />

            <div className="flex flex-col justify-center">
              <p className="text-4xl font-medium font-twk">Name</p>
              <p className="font-normal text-sm text-gray-900">{currentTeam?.name}</p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-4xl font-medium font-twk">Kürzel</p>
              <p className="font-normal text-sm text-gray-900">{currentTeam?.shortName}</p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-4xl font-medium font-twk">Bank</p>
              <p className="font-normal text-sm text-gray-900">$ {currentTeam?.balance.toLocaleString('de-DE') }</p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-4xl font-medium font-twk">Mitglieder</p>
              <p className="font-normal text-sm text-gray-900">{currentTeam?.memberCount} / {currentTeam?.maxCount}</p>
            </div>

            <div className="flex flex-col justify-center">
            <p className="text-4xl font-medium font-twk">Warns</p>
              <p className="font-normal text-sm text-gray-900 flex flex-row items-center h-full">
                {[...Array(currentTeam?.warns)].map((x, i) =>
                  <span key={i}><CheckIcon className="text-[#b6ffba] w-3" scale={1}/></span>
                )}

                {[...Array(5 - currentTeam?.warns)].map((x, i) =>
                  <span key={i}><XIcon className="text-[#ffb6c8] w-3" scale={1}/></span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-12 p-6 bg-dark-800 rounded-sm mt-5">
            <div className="flex flex-col flex-[0_0_19.5em]">
              <div className="flex flex-row gap-2 mb-1">
                <div className="w-1.5 h-full" style={{"backgroundColor": `rgb(${currentTeam.rgbColor})`}} />
                <p className="text-4xl font-medium">{currentTeam.shortName}</p>
              </div>
              <p className="font-normal text-sm text-gray-900">ID: {currentTeam?.id}</p>
              <p className="font-normal text-sm text-gray-900">Leader: {currentTeam?.leader}</p>
              <p className="font-normal text-sm text-gray-900">Munitionspakete: {currentTeam?.packets}</p>
              <p className="font-normal text-sm text-gray-900">Fraktionsmediziner: {currentTeam?.medicSlots}/{currentTeam?.medicMaxSlots}</p>

              <div className="flex flex-col mt-3 gap-2">
                <Button>Fraktionsfahrzeuge einparken</Button>
                {
                  /* 
                   * <Button onClick={() => navigate(`/dashboard/users/${currentVehicle?.ownerId}`, { replace: true })}>Besitzerprofil aufrufen</Button>
                   * <Button>Fahrzeug respawnen</Button>
                   */
                }
              </div>
            </div>

            <div className="w-full h-full flex flex-col">
              <div className="flex flex-row gap-2 flex-wrap">
                <Button onClick={() => setTab(CategoryTabs.INVENTORY)}>Akte</Button>
                <Button onClick={() => setTab(CategoryTabs.VEHICLES)}>Fahrzeuge</Button>
                <Button onClick={() => setTab(CategoryTabs.INVENTORY)}>Inventar</Button>
                <Button onClick={() => setTab(CategoryTabs.MEMBERS)}>Mitglieder</Button>
                <Button onClick={() => setTab(CategoryTabs.INVENTORY)}>Kleidung</Button>
                <Button onClick={() => setTab(CategoryTabs.INVENTORY)}>Bankhistorie</Button>
                <Button onClick={() => setTab(CategoryTabs.INVENTORY)}>Logs (Invite)</Button>
                <Button onClick={() => setTab(CategoryTabs.INVENTORY)}>Logs (Item)</Button>
              </div>

              {{
                [ CategoryTabs.VEHICLES ]: <TeamVehicles />,
                [ CategoryTabs.MEMBERS ]: <TeamMembers />
              }[currentTab]}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default TargetVehicle;