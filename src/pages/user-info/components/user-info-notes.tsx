import React, { useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/present.service";
import { Route, Routes } from "react-router-dom";
import { UserModel } from "app/models/user.model";

export interface Tabs {
  NOTES
  SANCTIONS,
};

const UserInfoNotes: React.FC = () => {
  const { currentAuthUser } = useAuthContext();

  const [targetUser, setTargetUser] = useState<UserModel | null>();

  useEffect(() => {
    setTargetUser({
      id: 1,
      username: "Walid_Mohammad",
      teamRank: "Founder",
      forumId: 12325,

      money: 10000000,
      bankMoney: 1,
      blackMoney: 1,

      level: 1,
      job: "",
      cuffed: false,
      tied: false,
      factionId: 1,
      phoneNumber: 1,

      socialClubName: "",
      warns: 1,
      suspended: false,

      birthDate: new Date(),
      lastLogin: new Date(),
    })
  }, [setTargetUser])

  return (
    <div className="user-info">
      {
        targetUser &&
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-10">
            <img src="/images/user-icon.png" className="w-48" alt="Logo" />

            <div className="flex flex-col justify-center w-48">
              <p className="text-3xl">$ {targetUser?.money.toLocaleString('de-DE')}</p>
              <p className="text-4xl font-semibold ">Cash</p>
            </div>

            <div className="flex flex-col justify-center w-48">
              <p className="text-3xl">$ {targetUser?.bankMoney}</p>
              <p className="text-4xl font-semibold ">Bank</p>
            </div>

            <div className="flex flex-col justify-center w-48">
              <p className="text-3xl">{targetUser?.teamRank}</p>
              <p className="text-4xl font-semibold ">Team</p>
            </div>

            <div className="flex flex-col justify-center w-48">
              <p className="text-3xl">{targetUser?.warns}</p>
              <p className="text-4xl font-semibold ">Warns</p>
            </div>
          </div>

          <div className="flex flex-row gap-12">
            <div className="flex flex-col">
              <p className="text-4xl font-medium">{targetUser?.username}</p>
              <p className="text-lg font-default">Forum ID: {targetUser?.forumId}</p>
              <p className="text-lg font-default">Letzter Login: {targetUser.lastLogin?.toLocaleString()}</p>
              <p className="text-lg font-default">Social Name: {targetUser?.socialClubName}</p>
              <p className="text-lg font-default">Level: {targetUser?.level}</p>
              <p className="text-lg font-default">Job: {targetUser?.job}</p>
              <p className="text-lg font-default">Handschellen: {targetUser?.cuffed}</p>
              <p className="text-lg font-default">Fesseln: {targetUser?.tied}</p>
              <p className="text-lg font-default">Fraktion: {targetUser?.factionId}</p>
              <p className="text-lg font-default">Geburtstag: {targetUser?.birthDate.toLocaleString()}</p>
              <p className="text-lg font-default">Handynummer: {targetUser?.phoneNumber}</p>

              <div className="flex flex-col mt-3 gap-2">
                <Button>Spieler kicken</Button>
                <Button>Spieler bannen</Button>
                <Button>Spieler in Supportinsel teleportieren</Button>
                <Button>Spieler verwarnen</Button>
              </div>
            </div>

            <div className="w-full h-full flex flex-col">
              <div className="flex flex-row gap-2 flex-wrap">
                <Button>Notizen</Button>
                <Button>Sanktionen</Button>
                <Button>Sanktionen</Button>
                <Button>Sanktionen</Button>
                <Button>Sanktionen</Button>
                <Button>Sanktionen</Button>
                <Button>Sanktionen</Button>
                <Button>Sanktionen</Button>
                <Button>Sanktionen</Button>
                <Button>Sanktionen</Button>
              </div>

              <p>Test</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default UserInfo;