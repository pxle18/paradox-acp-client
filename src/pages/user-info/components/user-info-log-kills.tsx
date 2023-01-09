import React, { useCallback, useEffect, useRef, useState } from "react";

import { useAuthContext } from "app/contexts/auth-context";
import { Inventory, InventorySlot } from "app/models/inventory.model";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css';
import '../../../styles/data-grid-theme.css';

import userLogService from "app/services/user-log.service";
import { useUserContext } from "app/contexts/user-context";

const gridStyle = { minHeight: 450, marginTop: 5 };

const defaultFilterValue = [
  { name: 'killer', type: 'string', operator: 'contains', value: '' },
  { name: 'user', type: 'string', operator: 'contains', value: '' },
  { name: 'weapon', type: 'string', operator: 'contains', value: '' },
  { name: 'type', type: 'string', operator: 'contains', value: '' },
  { name: 'money_lost', type: 'number', operator: 'contains', value: '' },
  { name: 'time', type: 'date', operator: 'contains', value: '' }
];

const columns = [
  { name: 'id', header: 'Id', defaultVisible: false, type: 'number', defaultWidth: 60 },
  { name: 'user', header: 'Spieler (tot)', groupBy: false, defaultFlex: 1 },
  { name: 'killer', header: 'Spieler (killer)', groupBy: false, defaultFlex: 1 },
  { name: 'weapon', header: 'Waffe', groupBy: false, defaultFlex: 0 },
  { name: 'type', header: 'Typ', groupBy: false, defaultFlex: 0 },
  { name: 'money_lost', header: 'Geld verloren', groupBy: false, defaultFlex: 0 },
  { name: 'time', header: 'Datum', groupBy: false, defaultFlex: 1 }
];

const UserInfoLogKills: React.FC = () => {
  const { currentAuthUser } = useAuthContext();
  const { currentUser } = useUserContext();

  const [targetInventory, setTargetInventory] = useState<Inventory | null>();
  const [targetItem, setTargetItem] = useState<InventorySlot | null>();

  const loadData = async ({ skip, limit, filterValue }) => {
    const response = await userLogService.getKills(currentUser.id, skip, limit, JSON.stringify(filterValue));
    if (!response.data)
      return { data: [], count: 0 };
    else {
      return { data: response.data, count: response.count };
    }
  }

  const dataSource = useCallback(loadData, [])

  return (
    <div className="user-info-inventory">
      <div className="flex flex-col gap-3 w-full mt-4">
        <ReactDataGrid
          idProperty="id"
          style={gridStyle}
          defaultFilterValue={defaultFilterValue}
          columns={columns}
          pagination
          emptyText="Keine Einträge gefunden."
          dataSource={dataSource}
        />
      </div>
    </div>
  );
};

export default UserInfoLogKills;