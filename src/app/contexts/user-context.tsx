import { unstable_useId } from "@mui/material";
import { compose } from "@mui/system";
import { ModalType } from "app/models/modal.model";
import { Notification } from "app/models/notification.model";
import uuid from "uuid";
import React, { useState, createContext } from "react";
import { UserModel } from "app/models/user.model";
import { VehicleModel } from "app/models/vehicle.model";
import { TeamModel } from "app/models/team.model";

type Props = {
  children: React.ReactNode
}

interface UserContextType {
  currentUser: UserModel | null;
  setCurrentUser: (currentUser: UserModel | null) => void;

  currentVehicle: VehicleModel | null;
  setCurrentVehicle: (currentVehicle: VehicleModel | null) => void;

  currentTeam: TeamModel | null;
  setCurrentTeam: (currentTeam: TeamModel | null) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<Props> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [currentVehicle, setCurrentVehicle] = useState<VehicleModel | null>(null);
  const [currentTeam, setCurrentTeam] = useState<TeamModel | null>(null);

  const userContextValue: UserContextType = {
    currentUser,
    setCurrentUser,

    currentVehicle,
    setCurrentVehicle,

    currentTeam,
    setCurrentTeam
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext) as UserContextType;
