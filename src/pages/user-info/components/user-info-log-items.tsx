import React, { useCallback, useEffect, useRef, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import Logo from "assets/vectors/Void-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import presentService from "app/services/user.service";
import { Route, Routes } from "react-router-dom";
import { Inventory, InventorySlot } from "app/models/inventory.model";

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css';
import '../../../styles/data-grid-theme.css';

import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import userLogService from "app/services/user-log.service";
import { useUserContext } from "app/contexts/user-context";
import { useHudContext } from "app/contexts/hud-context";
import itemService from "app/services/item.service";
import notificationService from "app/services/notification.service";

const gridStyle = { minHeight: 450, marginTop: 5 };

const defaultFilterValue = [
  { name: 'player_name', type: 'string', operator: 'contains', value: '' },
  { name: 'inventory_type', type: 'string', operator: 'contains', value: '' },
  { name: 'inventory_id', type: 'string', operator: 'contains', value: '' },
  { name: 'item_id', type: 'string', operator: 'contains', value: ''},
  { name: 'item_name', type: 'string', operator: 'contains', value: '', virtual: true },
  { name: 'item_amount', type: 'number', operator: 'contains', value: '' },
  { name: 'timestamp', type: 'date', operator: 'contains', value: '' }
];

const columns = [
  { name: 'id', header: 'Id', defaultVisible: false, type: 'number', defaultWidth: 60 },
  { name: 'player_name', header: 'Spieler', groupBy: false, defaultFlex: 1 },
  { name: 'inventory_type', header: 'Inventar Typ', groupBy: false, defaultFlex: 0 },
  { name: 'inventory_id', header: 'Inventar Id', groupBy: false, defaultFlex: 0 },
  { name: 'item_id', header: 'Item Id', defaultVisible: false, groupBy: false, defaultFlex: 0 },
  { name: 'item_name', header: 'Item', groupBy: false, defaultFlex: 1 },
  { name: 'item_amount', header: 'Anzahl', groupBy: false, defaultFlex: 0 },
  { name: 'timestamp', header: 'Datum', groupBy: false, defaultFlex: 1 }
];

const UserInfoLogItems: React.FC = () => {
  const { currentAuthUser } = useAuthContext();
  const { currentUser } = useUserContext();
  const { setCurrentItemVisualization } = useHudContext();

  const [targetInventory, setTargetInventory] = useState<Inventory | null>();
  const [targetItem, setTargetItem] = useState<InventorySlot | null>();

  const loadData = async ({ skip, limit, filterValue }) => {
    const response = await userLogService.getItems(currentUser.id, skip, limit, JSON.stringify(filterValue));
    if (!response.data)
      return { data: [], count: 0 };
    else {
      return { data: response.data, count: response.count };
    }
  }
  
  const onRowClick = useCallback((rowProps, event) => {
    itemService.get(rowProps.data.item_id)
      .then(response => {
        if(response.data !== undefined) {
          setCurrentItemVisualization({
            targetItem: response.data,
            targetInventory: rowProps.data.inventory_type,
            amount: rowProps.data.item_amount
          });
        } else notificationService.pushNotification(response.error);
      });
  }, [])

  const dataSource = useCallback(loadData, [])

  return (
    <div className="user-info-inventory">
      <div className="flex flex-col gap-3 w-full mt-4">
        { !(currentAuthUser.rankId <= 2) &&
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
        }
      </div>
    </div>
  );
};

export default UserInfoLogItems;