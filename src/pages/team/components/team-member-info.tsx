import React, { useCallback, useEffect, useRef, useState } from "react";

import { useAuthContext } from "app/contexts/auth-context";
import { Inventory, InventorySlot } from "app/models/inventory.model";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css';
import '../../../styles/data-grid-theme.css';

import userLogService from "app/services/user-log.service";
import { useUserContext } from "app/contexts/user-context";
import userVehicleService from "app/services/user-vehicle.service";
import { ArrowLeftIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import teamVehicleService from "app/services/team-vehicle.service";
import Button from "components/button";
import teamMemberService from "app/services/team-member.service";
import { TypeComputedProps, TypeSingleSortInfo } from "@inovua/reactdatagrid-community/types";
import modalService from "app/services/modal.service";
import { ModalType } from "app/models/modal.model";
import notificationService from "app/services/notification.service";
import { TeamMemberModel } from "app/models/team.model";

const TeamMemberInfo: React.FC = () => {
  const { currentAuthUser } = useAuthContext();
  const { currentTeam } = useUserContext();
  const { currentTeamMember, setCurrentTeamMember } = useUserContext();

  const requestTeamKick = async (id: number, name: string) => {
    modalService.show(
      ModalType.CONFIRMATION, 
      "Fraktion verlassen", 
      `Wollen Sie ${name} aus der Fraktion ${currentTeam?.name} entlassen?`,
      (input) => kickTeam(input, id)
    )
  }
  
  const kickTeam =  async (input: string | boolean, id: number) => {
    if (typeof input != "boolean") return;
    if (!input) return;
    
    teamMemberService.getTeamMember(currentTeam.id, id).then(
      response => {
        if(response.data === undefined) return;     

        //notificationService.pushNotification(response.data.message);
        //modalService.close();
      }
    )
  }

  const getBooleanIcon = (state: boolean) => {
    return state ? <CheckIcon className="text-[#b6ffba] w-3" scale={1}/> :
      <XIcon className="text-[#ffb6c8] w-3" scale={1}/>;
  }
  
  return (
    <div className="team-vehicles">
      <div className="flex flex-col gap-3 w-full mt-4">
        { currentTeamMember && 
          <div className="team-member-information flex flex-col gap-5">

            <div className="flex flex-row gap-8 items-center">
              <div className="flex flex-col">
                <p className="text-3xl font-semibold">Name</p>
                <p className="text-gray-900">{currentTeamMember.name}</p>
              </div>

              <div className="flex flex-col">
                <p className="text-3xl font-semibold">Rang</p>
                <p className="text-gray-900">{currentTeamMember.rank}</p>
              </div>
            </div>
            
            <div className="flex flex-row gap-8 items-center">
              <div className="flex flex-col">
                <p className="text-3xl font-semibold">Bank</p>
                <p className="text-gray-900">{getBooleanIcon(currentTeamMember.bankPermission)}</p>
              </div>

              <div className="flex flex-col">
                <p className="text-3xl font-semibold">Inventar</p>
                <p className="text-gray-900">{getBooleanIcon(currentTeamMember.inventoryPermission)}</p>
              </div>

              <div className="flex flex-col">
                <p className="text-3xl font-semibold">Verwaltung</p>
                <p className="text-gray-900">{getBooleanIcon(currentTeamMember.managePermission)}</p>
              </div>
            </div>

                        
            <div className="flex flex-col gap-2 items-start">
              <div className="flex flex-row gap-2 items-start">
                <Button>Rank ändern</Button>
                <Button>Mitglied entlassen</Button>
              </div>

              <div className="flex flex-row gap-2 items-start">
                <Button>Bankrechte ändern</Button>
                <Button>Inventarrechte ändern</Button>
                <Button>Verwaltungsrechte ändern</Button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default TeamMemberInfo;