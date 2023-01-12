import React, { useCallback, useEffect, useRef, useState } from "react";

import { useAuthContext } from "app/contexts/auth-context";
import { Inventory, InventorySlot } from "app/models/inventory.model";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css';
import '../../../styles/data-grid-theme.css';

import userLogService from "app/services/user-log.service";
import { useUserContext } from "app/contexts/user-context";
import userVehicleService from "app/services/user-vehicle.service";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import teamVehicleService from "app/services/team-vehicle.service";
import Button from "components/button";

const gridStyle = { minHeight: 450, marginTop: 5 };

const defaultFilterValue = [
  { name: 'id', type: 'number', operator: 'contains', value: '' },
  { name: 'model', type: 'number', operator: 'contains', value: '' },
  { name: 'model_name', type: 'string', operator: 'contains', value: '', relationTable: "vehicleData", relationField: "car_name" },
  { name: 'team', type: 'number', operator: 'contains', value: '' },
  { name: 'team_name', type: 'string', operator: 'contains', value: '', relationTable: "team", relationField: "name" },
  { name: 'plate', type: 'string', operator: 'contains', value: '' },
  { name: 'lastGarage', type: 'number', operator: 'contains', value: '' },
  { name: 'inGarage', type: 'number', operator: 'contains', value: '' }
];

const columns = [
  { name: 'id', header: 'Id', defaultVisible: true, type: 'number', defaultWidth: 80 },
  { name: 'model', header: 'Model Id', defaultVisible: false, groupBy: false, defaultFlex: 1 },
  { 
    name: 'model_name', header: 'Model', groupBy: false, defaultFlex: 1,
    render: ({ data }) => data.vehicle_data.car_name
  },
  { name: 'team', header: 'Team Id', defaultVisible: false, groupBy: false, defaultFlex: 0 },
  { 
    name: 'team_name', header: 'Fraktion', groupBy: false, defaultFlex: 1,
    render: ({ data }) => data.team.name
  },
  {
    name: 'plate', header: 'Kennzeichen', groupBy: false, defaultFlex: 0,
    render: ({ value }) => value == "" ? <XIcon className="text-[#ffb6c8] w-3" scale={1}/> :
      value
  },
  { name: 'lastGarage', header: 'Garage Id', groupBy: false, defaultFlex: 0 },
  {
    name: 'inGarage', header: 'In Garage', groupBy: false, defaultFlex: 0,
    render: ({ value }) => value == 1 ? <CheckIcon className="text-[#b6ffba] w-3" scale={1}/> :
      <XIcon className="text-[#ffb6c8] w-3" scale={1}/>
  }
];

const TeamVehicles: React.FC = () => {
  const navigate = useNavigate();

  const { currentAuthUser } = useAuthContext();
  const { currentTeam } = useUserContext();

  const loadData = async ({ skip, limit, filterValue }) => {
    const response = await teamVehicleService.getTeamVehicle(currentTeam.id, skip, limit, JSON.stringify(filterValue));
    if (!response.data)
      return { data: [], count: 0 };
    else {
      return { data: response.data, count: response.count };
    }
  }

  const onRowClick = useCallback((rowProps, event) => {
    navigate("/dashboard/team-vehicles/" + rowProps.data.id, { replace: true });
  }, [])
  
  const dataSource = useCallback(loadData, [])

  return (
    <div className="team-vehicles">

      <div className="flex flex-col gap-3 w-full mt-4">
        <ReactDataGrid
          idProperty="id"
          style={gridStyle}
          defaultFilterValue={defaultFilterValue}
          columns={columns}
          pagination
          emptyText="Keine Einträge gefunden."
          dataSource={dataSource}
          onRowClick={onRowClick}
        />
        
        <div className="flex flex-col gap-2 mt-2 w-full">
          <Button>Fahrzeug hinzufügen</Button>
        </div>
      </div>
    </div>
  );
};

export default TeamVehicles;