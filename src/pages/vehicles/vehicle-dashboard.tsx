import React, { useCallback, useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import { Route, Routes, useNavigate } from "react-router-dom";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css';
import '../../styles/data-grid-theme.css';

import TargetVehicle from "./target-vehicle";
import vehicleService from "app/services/vehicle.service";
import { VehicleModel } from "app/models/vehicle.model";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

const gridStyle = { minHeight: "75vh", marginTop: 5 };

const defaultFilterValue = [
  { name: 'id', type: 'number', operator: 'contains', value: '' },
  { name: 'model', type: 'number', operator: 'contains', value: '' },
  { name: 'model_name', type: 'string', operator: 'contains', value: '', relationTable: "vehicleData", relationField: "car_name" },
  { name: 'owner', type: 'number', operator: 'contains', value: '' },
  { name: 'owner_name', type: 'string', operator: 'contains', value: '', relationTable: "player", relationField: "Name" },
  { name: 'plate', type: 'string', operator: 'contains', value: '' },
  { name: 'garage_id', type: 'number', operator: 'contains', value: '' },
  { name: 'inGarage', type: 'number', operator: 'contains', value: '' }
];

const columns = [
  { name: 'id', header: 'Id', defaultVisible: true, type: 'number', defaultWidth: 60 },
  { name: 'model', header: 'Model Id', defaultVisible: false, groupBy: false, defaultFlex: 1 },
  { 
    name: 'model_name', header: 'Model', groupBy: false, defaultFlex: 1,
    render: ({ data }) => data.vehicle_data.car_name
  },
  { name: 'owner', header: 'Besitzer Id', defaultVisible: false, groupBy: false, defaultFlex: 0 },
  { 
    name: 'owner_name', header: 'Besitzer', groupBy: false, defaultFlex: 1,
    render: ({ data }) => data.player.Name
  },
  {
    name: 'plate', header: 'Kennzeichen', groupBy: false, defaultFlex: 0,
    render: ({ value }) => value == "" ? <XIcon className="text-[#ffb6c8] w-3" scale={1}/> : value
  },
  { name: 'garage_id', header: 'Garage Id', groupBy: false, defaultFlex: 0 },
  {
    name: 'inGarage', header: 'In Garage', groupBy: false, defaultFlex: 0,
    render: ({ value }) => value == 1 ? <CheckIcon className="text-[#b6ffba] w-3" scale={1}/> : <XIcon className="text-[#ffb6c8] w-3" scale={1}/>
  }
];


const VehicleDashboard: React.FC = () => {
  const { currentAuthUser } = useAuthContext();

  const navigate = useNavigate();

  const [targetUser, setTargetUser] = useState<VehicleModel | null>();

  const loadData = async ({ skip, limit, filterValue }) => {
    const response = await vehicleService.getAllVehicles(skip, limit, JSON.stringify(filterValue));
    if (!response.data)
      return { data: [], count: 0 };
    else {
      return { data: response.data, count: response.count };
    }
  }

  const dataSource = useCallback(loadData, [])

  const onRowClick = useCallback((rowProps, event) => {
    navigate("/dashboard/vehicles/" + rowProps.data.id, { replace: true });
  }, [])
  
  return (
    <div className="vehicles-dashboard">
        <Routes>
          <Route path=":id" element={<TargetVehicle />} />
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

export default VehicleDashboard;