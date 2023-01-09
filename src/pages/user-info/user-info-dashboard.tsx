import React, { useCallback, useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/user.service";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Inventory, InventorySlot } from "app/models/inventory.model";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css';
import '../../styles/data-grid-theme.css';

import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import { UserModel } from "app/models/user.model";
import usersService from "app/services/user.service";
import UserInfo from "./target-user-info";
import { useHudContext } from "app/contexts/hud-context";

const gridStyle = { minHeight: "75vh", marginTop: 5 };

const defaultFilterValue = [
  { name: 'id', type: 'number', operator: 'contains', value: '' },
  { name: 'Name', type: 'string', operator: 'contains', value: '' },
  { name: 'forumid', type: 'number', operator: 'contains', value: '' },
];

const columns = [
  { name: 'id', header: 'Id', groupBy: false, type: 'number', defaultFlex: 0 },
  { name: 'Name', header: 'Name', groupBy: false, defaultFlex: 1 },
  { name: 'forumid', header: 'Forum ID', groupBy: false, defaultFlex: 0 }
];



const UserInfoDashboard: React.FC = () => {
  const { currentAuthUser } = useAuthContext();

  const navigate = useNavigate();

  const [targetUser, setTargetUser] = useState<UserModel | null>();

  const loadData = async ({ skip, limit, filterValue }) => {
    const response = await usersService.getAllUsers(skip, limit, JSON.stringify(filterValue));
    if (!response.data)
      return { data: [], count: 0 };
    else {
      return { data: response.data, count: response.count };
    }
  }

  const dataSource = useCallback(loadData, [])

  const onRowClick = useCallback((rowProps, event) => {
    navigate("/dashboard/users/" + rowProps.data.id, { replace: true });
  }, [])
  
  return (
    <div className="user-info-dashboard">
        <Routes>
          <Route path=":id" element={<UserInfo />} />
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

export default UserInfoDashboard;