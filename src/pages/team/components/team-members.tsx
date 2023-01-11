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

const gridStyle = { minHeight: 450, marginTop: 5 };

const defaultSortInfo: TypeSingleSortInfo[] = [
  { name: 'Rang', type: "number", dir: -1 }
];

const defaultFilterValue = [
  { name: 'id', type: 'number', operator: 'contains', value: '' },
  { name: 'Name', type: 'string', operator: 'contains', value: '' },
  { name: 'Rang', type: 'string', operator: 'contains', value: '' },
];

const columns = [
  { name: 'id', header: 'Id', defaultVisible: true, type: 'number', defaultWidth: 80 },
  { name: 'Name', header: 'Name', groupBy: false, defaultFlex: 1 },
  { name: 'Rang', header: 'Rang', groupBy: false, defaultFlex: 0, defaultWidth: 80, },
  { 
    name: 'Action', header: "Aktion", groupBy: false, defaultFlex: 0, defaultWidth: 100,
    render: () => <Button>x</Button>
  }
];



const TeamMembers: React.FC = () => {
  const navigate = useNavigate();

  const { currentAuthUser } = useAuthContext();
  const { currentTeam } = useUserContext();

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

  const loadData = async ({ skip, limit, filterValue }) => {
    const response = await teamMemberService.getTeamMembers(currentTeam.id, skip, limit, JSON.stringify(filterValue));
    if (!response.data)
      return { data: [], count: 0 };
    else {
      return { data: response.data, count: response.count };
    }
  }

  const onRowClick = useCallback((rowProps: any, event: any) => {
    if(event.target.id == "paradox-button")
    {
      /**
       * Looks bad, workaround needed
       */
      teamMemberService.getTeamMember(currentTeam.id, rowProps.data.id).then(response => setCurrentTeamMember(response.data ?? null))
      return;
    }

    navigate("/dashboard/users/" + rowProps.data.id, { replace: true });
  }, [])
  
  const dataSource = useCallback(loadData, [])
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMemberModel>(null)

  return (
    <div className="team-vehicles">
      <div className="flex flex-col gap-3 w-full mt-4">
        { currentTeamMember ? 
          <div className="team-member-information flex flex-col gap-5">
            <Button className="w-20" onClick={() => setCurrentTeamMember(null)}>
              <ArrowLeftIcon className="w-3 h-3"/>
            </Button>

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
              <p>test</p>
            </div>
          </div>
          :        
            <ReactDataGrid
              idProperty="id"
              style={gridStyle}
              defaultFilterValue={defaultFilterValue}
              defaultSortInfo={defaultSortInfo}
              columns={columns}
              pagination
              emptyText="Keine Einträge gefunden."
              dataSource={dataSource}
              onRowClick={onRowClick}
            />
          }
      </div>
    </div>
  );
};

export default TeamMembers;