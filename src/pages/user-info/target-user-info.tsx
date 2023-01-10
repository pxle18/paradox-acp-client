import React, { useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/user.service";
import { Route, Routes, useParams } from "react-router-dom";
import Login from ".";
import { UserModel } from "app/models/user.model";
import UserInfoNotes from "./components/user-info-notes";
import { CheckIcon, ShieldCheckIcon, TicketIcon, XIcon } from "@heroicons/react/outline";
import UserInfoInventory from "./components/user-info-inventory";
import UserInfoLogKills from "./components/user-info-log-kills";
import Hud from "layouts/hud/hud-full-screen";
import { useHudContext } from "app/contexts/hud-context";
import notificationService from "app/services/notification.service";
import usersService from "app/services/user.service";
import { useUserContext } from "app/contexts/user-context";
import UserInfoLogItems from "./components/user-info-log-items";
import UserInfoVehicles from "./components/user-info-vehicles";
import modalService from "app/services/modal.service";
import { ModalType } from "app/models/modal.model";
import userActionService from "app/services/user-action.service";

export enum CategoryTabs {
  NOTES,
  INVENTORY,
  VEHICLES,
  LOG_KILLS,
  LOG_ITEMS
};

const UserInfo: React.FC = () => {
  const { currentAuthUser } = useAuthContext();
  const { currentUser, setCurrentUser } = useUserContext();

  const { id } = useParams();

  const [currentTab, setTab] = useState<CategoryTabs | null>();

  useEffect(() => {
    usersService.getUser(parseInt(id)).then(response => {
      if(response.data !== undefined) {
        var account = response.data;

        setCurrentUser(account);
      }
    })
  }, [setCurrentUser]);

  const getBooleanIcon = (state: boolean) => {
    return state ? <CheckIcon className="text-[#b6ffba] w-3" scale={1}/> :
      <XIcon className="text-[#ffb6c8] w-3" scale={1}/>;
  }

  const getOnlineIcon = (state: boolean) => {
    return state ? <ShieldCheckIcon className="text-[#b6ffba] w-3" scale={1}/> :
      <ShieldCheckIcon className="text-[#ffb6c8] w-3" scale={1}/>;
  }
  
  const requestKick =  async () => {
    const kickItems = [
      "Powernap",
      "AFK",
      "No-Voice",
      "Bad-Support",
      "Bad-Ad",
      "Bitte im Support melden!",
      "Unbekannt",
    ];

    modalService.showWithData(
      ModalType.SELECT, 
      "Spieler kicken", 
      "Mit welchem Grund möchten Sie den folgenden Spieler kicken?",
      kickItems,
      (input) => {
        if (typeof input == "boolean") return;

        userActionService.kick(currentUser.id, input).then(
          response => {
            if(response.data === undefined) return;     

            notificationService.pushNotification(response.data.message);
            modalService.close();

            setCurrentUser({
              ...currentUser,
              isOnline: false
            });
          }
        )
      }
    )
  }

  const requestTimeBanDuration =  async () => {
    modalService.show(
      ModalType.INPUT, 
      "Spieler bannen", 
      "Wie lange wollen Sie den folgenden Spieler bannen?",
      (input) => requestTimeBanReason(input)
    )
  }

  const requestTimeBanReason =  async (duration: string | boolean) => {
    if (typeof duration == "boolean") return;

    modalService.show(
      ModalType.INPUT, 
      "Spieler bannen", 
      "Mit welchem Grund wollen Sie den Spieler bannen?",
      (input) => timeBanPlayer(duration, input)
    )
  }

  const timeBanPlayer =  async (duration: string | boolean, reason: string | boolean) => {
    if (typeof duration == "boolean") return;
    if (typeof reason == "boolean") return;

    userActionService.timeBan(currentUser.id, parseInt(duration), reason).then(
      response => {
        if(response.data === undefined) return;     

        notificationService.pushNotification(response.data.message);
        modalService.close();

        setCurrentUser({
          ...currentUser,
          isOnline: false
        });
      }
    )
  }

  const callToSupport = async () => {
    userActionService.callToSupport(currentUser.id).then(
      response => {
        if(response.data === undefined) return;     

        notificationService.pushNotification(response.data.message);
      }
    )
  }

  const requestSuspend = async () => {
    modalService.show(
      ModalType.CONFIRMATION, 
      "Spieler ausschliessen", 
      `Wollen Sie ${currentUser.username} aus der Community ausschliessen?`,
      (input) => suspendPlayer(input)
    )
  }

  const suspendPlayer =  async (input: string | boolean) => {
    if (typeof input != "boolean") return;
    if (!input) return;
    
    userActionService.suspend(currentUser.id).then(
      response => {
        if(response.data === undefined) return;     

        notificationService.pushNotification(response.data.message);
        modalService.close();

        setCurrentUser({
          ...currentUser,
          isOnline: false,
          suspended: true
        });
      }
    )
  }

  const requestWarnReason =  async () => {
    modalService.show(
      ModalType.INPUT, 
      "Spieler verwarnen", 
      "Mit welchem Grund wollen Sie den Spieler verwarnen?",
      (input) => warnPlayer(input)
    )
  }

  const warnPlayer =  async (reason: string | boolean) => {
    if (typeof reason == "boolean") return;

    userActionService.warn(currentUser.id, reason).then(
      response => {
        if(response.data === undefined) return;     

        notificationService.pushNotification(response.data.message);
        modalService.close();

        setCurrentUser({
          ...currentUser,
          warns: currentUser.warns + 1,
          suspended: currentUser.warns + 1 >= 3
        });
      }
    )
  }

  const requestDeSuspend = async () => {
    modalService.show(
      ModalType.CONFIRMATION, 
      "Spieler entauschliessen", 
      `Wollen Sie den Ausschluss von ${currentUser.username} aufheben?`,
      (input) => deSuspendPlayer(input)
    )
  }

  const deSuspendPlayer =  async (input: string | boolean) => {
    if (typeof input != "boolean") return;
    if (!input) return;
    
    userActionService.deSuspend(currentUser.id).then(
      response => {
        if(response.data === undefined) return;     

        notificationService.pushNotification(response.data.message);
        modalService.close();

        setCurrentUser({
          ...currentUser,
          suspended: false,
          warns: 0
        });
      }
    )
  }

  return (
    <div className="user-info">
      {
        currentUser &&
        <div className="flex flex-col gap-3">
          <div className="flex flex-row flex-wrap gap-10">
            <img src="/images/user-icon.png" className="w-36" alt="Logo" />

            <div className="flex flex-col justify-center w-36">
              <p className="text-4xl font-medium font-twk">Cash</p>
              <p className="font-normal text-sm text-gray-900">$ {currentUser?.money.toLocaleString('de-DE')}</p>
            </div>

            <div className="flex flex-col justify-center w-36">
              <p className="text-4xl font-medium font-twk">Bank</p>
              <p className="font-normal text-sm text-gray-900">$ {currentUser?.bankMoney.toLocaleString('de-DE')}</p>
            </div>

            <div className="flex flex-col justify-center w-36">
              <p className="text-4xl font-medium font-twk">Team</p>
              <p className="font-normal text-sm text-gray-900">{currentUser?.adminRank}</p>
            </div>

            <div className="flex flex-col justify-center w-36">
              <p className="text-4xl font-medium font-twk">Warns</p>
              <p className="font-normal text-sm text-gray-900 flex flex-row">
                {[...Array(currentUser?.warns)].map((x, i) =>
                  <span key={i}><CheckIcon className="text-[#b6ffba] w-3" scale={1}/></span>
                )}

                {[...Array(3 - currentUser?.warns)].map((x, i) =>
                  <span key={i}><XIcon className="text-[#ffb6c8] w-3" scale={1}/></span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-12 p-6 bg-dark-800 rounded-sm mt-5">
            <div className="flex flex-col flex-[0_0_19.5em]">
              <p className="text-4xl font-medium flex flex-row gap-2">{getOnlineIcon(currentUser?.isOnline)}{currentUser?.username}</p>
              <p className="font-normal text-sm text-gray-900">ID: {currentUser?.id}</p>
              <p className="font-normal text-sm text-gray-900">Forum ID: {currentUser?.forumId}</p>
              <p className="font-normal text-sm text-gray-900">Letzter Login: {new Date(currentUser.lastLogin * 1000).toLocaleString()}</p>
              <p className="font-normal text-sm text-gray-900">Social Name: {currentUser?.socialClubName == "" ? "Nicht hinterlegt" : currentUser?.socialClubName}</p>
              <p className="font-normal text-sm text-gray-900">Level: {currentUser?.level}</p>
              <p className="font-normal text-sm text-gray-900">Job: {currentUser?.job}</p>
              <p className="font-normal text-sm text-gray-900 inline-flex gap-1">Handschellen: {getBooleanIcon(currentUser?.cuffed)}</p>
              <p className="font-normal text-sm text-gray-900 inline-flex gap-1">Fesseln: {getBooleanIcon(currentUser?.tied)}</p>
              <p className="font-normal text-sm text-gray-900">Fraktion: {currentUser?.faction}</p>
              <p className="font-normal text-sm text-gray-900">Geburtstag: {currentUser?.birthDate}</p>
              <p className="font-normal text-sm text-gray-900">Handynummer: {currentUser?.phoneNumber}</p>
              <p className="font-normal text-sm text-gray-900 inline-flex gap-1">Community-Ausschluss: {getBooleanIcon(currentUser?.suspended)}</p>

              <div className="flex flex-col mt-3 gap-2">
                <Button onClick={() => requestKick()}>Spieler kicken</Button>
                <Button onClick={() => requestTimeBanDuration()}>Spieler temporär bannen</Button>
                <Button onClick={() => callToSupport()}>Spieler in TeamSpeak Support rufen</Button>
                <Button onClick={() => requestWarnReason()}>Spieler verwarnen</Button>

                { !(currentAuthUser.rankId <= 2) && <Button onClick={() => requestSuspend()}>Spieler permanent auschliessen</Button>}
                { !(currentAuthUser.rankId <= 2) && <Button onClick={() => requestDeSuspend()}>Communityausschluss aufheben</Button>}
              </div>
            </div>

            <div className="w-full h-full flex flex-col">
              <div className="flex flex-row gap-2 flex-wrap">
                <Button onClick={() => setTab(CategoryTabs.NOTES)}>Akte</Button>
                <Button onClick={() => setTab(CategoryTabs.INVENTORY)}>Inventar</Button>
                <Button onClick={() => setTab(CategoryTabs.VEHICLES)}>Fahrzeuge</Button>
                <Button>Häuser</Button>
                <Button>Lagerhallen</Button>
                <Button>Reports</Button>
                <Button>Fraktion</Button>
                <Button onClick={() => setTab(CategoryTabs.LOG_KILLS)}>Logs (Kills)</Button>
                { !(currentAuthUser.rankId <= 2) && <Button onClick={() => setTab(CategoryTabs.LOG_ITEMS)}>Logs (Item)</Button> }
              </div>

              {{
                [ CategoryTabs.NOTES ]: <UserInfoNotes />,
                [ CategoryTabs.INVENTORY ]: <UserInfoInventory />,
                [ CategoryTabs.VEHICLES ]: <UserInfoVehicles />,
                [ CategoryTabs.LOG_KILLS ]: <UserInfoLogKills />,
                [ CategoryTabs.LOG_ITEMS ]: <UserInfoLogItems />
              }[currentTab]}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default UserInfo;