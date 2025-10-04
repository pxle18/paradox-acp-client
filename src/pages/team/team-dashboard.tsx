import React, { useCallback, useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/Void-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import { Route, Routes, useNavigate } from "react-router-dom";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css';
import '../../styles/data-grid-theme.css';

import vehicleService from "app/services/vehicle.service";
import { VehicleModel } from "app/models/vehicle.model";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import teamService from "app/services/team.service";
import TargetTeam from ".";

const gridStyle = { minHeight: "75vh", marginTop: 5 };

const defaultFilterValue = [
  { name: 'id', type: 'number', operator: 'contains', value: '' },
  { name: 'name', type: 'string', operator: 'contains', value: '' },
  { name: 'name_short', type: 'string', operator: 'contains', value: '' },
  { name: 'isGangster', type: 'number', operator: 'contains', value: '' },
];

const columns = [
  { name: 'id', header: 'Id', defaultVisible: true, type: 'number', defaultWidth: 60 },
  { name: 'name', header: 'Name',groupBy: false, defaultFlex: 1 },
  { name: 'name_short', header: 'Kürzel', groupBy: false, defaultFlex: 0 },
  {
    name: 'isGangster', header: 'Bad-Fraktion', groupBy: false, defaultFlex: 0,
    render: ({ value }) => value == 1 ? <CheckIcon className="text-[#b6ffba] w-3" scale={1}/> : <XIcon className="text-[#ffb6c8] w-3" scale={1}/>
  }
];


const TeamDashboard: React.FC = () => {
  const { currentAuthUser } = useAuthContext();

  const navigate = useNavigate();

  const [targetUser, setTargetUser] = useState<VehicleModel | null>();

  const loadData = async ({ skip, limit, filterValue }) => {
    const response = await teamService.getAllTeams(skip, limit, JSON.stringify(filterValue));
    if (!response.data)
      return { data: [], count: 0 };
    else {
      return { data: response.data, count: response.count };
    }
  }

  const dataSource = useCallback(loadData, [])

  const onRowClick = useCallback((rowProps, event) => {
    navigate("/dashboard/teams/" + rowProps.data.id, { replace: true });
  }, [])
  
  return (
    <div className="teams-dashboard">
        <Routes>
          <Route path=":id" element={<TargetTeam />} />
          <Route path="/" element={
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
          } />
        </Routes>
    </div>
  );
};

export default TeamDashboard;