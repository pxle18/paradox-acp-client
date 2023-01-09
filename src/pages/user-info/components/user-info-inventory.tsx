import React, { useEffect, useRef, useState } from "react";

import Button from "components/button";
import Input from "components/select";

import Logo from "assets/vectors/paradox-logo.svg";
import { useAuthContext } from "app/contexts/auth-context";
import { useUserContext } from "app/contexts/user-context";
import presentService from "app/services/user.service";
import { Route, Routes } from "react-router-dom";
import { Inventory, InventorySlot } from "app/models/inventory.model";
import userInventory from "app/services/user-inventory.service";
import notificationService from "app/services/notification.service";
import { useHudContext } from "app/contexts/hud-context";
import modalService from "app/services/modal.service";
import { ModalType } from "app/models/modal.model";
import itemService from "app/services/item.service";
import userInventoryService from "app/services/user-inventory.service";

const UserInfoInventory: React.FC = () => {
  const { currentAuthUser } = useAuthContext();
  const { currentUser } = useUserContext();

  const [targetInventory, setTargetInventory] = useState<Inventory | null>();
  const [targetItem, setTargetItem] = useState<InventorySlot | null>();

  useEffect(() => {
    userInventory.getUserInventory(
      currentUser.id
    ).then(response => {
      if(response.data !== undefined) {
        var inventoryResponse = response.data;

        setTargetInventory(inventoryResponse);
      }else notificationService.pushNotification(response.error);
    });
  }, [setTargetInventory])

  const deleteItem = (slot: number): void => {
    userInventory.deleteItemBySlot(
      currentUser.id,
      slot
    ).then(response => {
      if(response.data !== undefined) {
        var slots = targetInventory.slots.filter(item => item.slot !== slot);
        targetInventory.slots = slots;

        setTargetInventory(targetInventory);
        setTargetItem(null);
        notificationService.pushNotification(response.data.message);
      }else notificationService.pushNotification(response.error);
    });
  }

  const clearInventory = (): void => {
    userInventory.clearInventory(
      currentUser.id
    ).then(response => {
      if(response.data !== undefined) {
        targetInventory.slots = [];

        setTargetInventory(targetInventory);
        setTargetItem(null);
        notificationService.pushNotification(response.data.message);
      }else notificationService.pushNotification(response.error);
    });
  }

  const requestAddItem =  async () => {
    const items = await itemService.listAll();

    modalService.showWithData(
      ModalType.SELECT, 
      "Item hinzufügen", 
      "Welches Item möchten Sie dem Spieler hinzufügen?",
      items.data,
      (input) => requestAddItemAmount(input)
    )
  }

  const requestAddItemAmount = (input: string | boolean): void => {
    if (typeof input == "boolean") return;

    modalService.show(
      ModalType.INPUT, 
      "Item hinzufügen", 
      `Welche Menge an ${input} möchten Sie hinzufügen?`,
      (amount) => requestAddItemTicket(input, amount)
    )
  }

  const requestAddItemTicket = (item: string | boolean, amount: string | boolean): void => {
    if (typeof item == "boolean") return;
    if (typeof amount == "boolean") return;

    modalService.close();

    modalService.show(
      ModalType.INPUT, 
      "Item hinzufügen", 
      `Bitte hängen Sie nun das dazugehörige Ticket an inkl. Grund`,
      (ticket) => addItem(item, amount, ticket)
    )
  }

  const addItem = (item: string | boolean, amount: string | boolean, ticket: string | boolean): void => {
    if (typeof item == "boolean") return;
    if (typeof amount == "boolean") return;
    if (typeof ticket == "boolean") return;

    userInventory.addItem(
      currentUser.id,
      item,
      parseInt(amount),
    ).then(response => {
      if(response.data !== undefined) {
        targetInventory.slots.push(response.data.item);
        
        setTargetInventory({
          id: targetInventory.id,
          maxSlots: targetInventory.maxSlots,
          slots: targetInventory.slots
        });

        setTargetItem(null);

        notificationService.pushNotification(response.data.message);
        modalService.close();
      }else notificationService.pushNotification(response.error);
    });
  }

  const getItemByIndex = (index: number): InventorySlot => {
    return targetInventory.slots.find(item => item.slot == (index + 1));
  }
  
  return (
    <div className="user-info-inventory">
      <div className="flex flex-col gap-3 w-full mt-4">
        {targetInventory && 
          <div className="flex flex-row flex-wrap w-96 gap-4 max-h-[380px] overflow-y-auto inventory">
            {
              [...Array(targetInventory.maxSlots)].map((elementInArray: any, i: number) => ( 
                <div key={i} className="inventory-slot w-20 h-20 justify-center items-center flex flex-col bg-dark-900 bg-opacity-70 outline-dotted -outline-offset-2 outline-gray-800 outline-2">
                  {
                    getItemByIndex(i) && 
                      <div className="flex justify-center items-center w-full relative flex-col" onClick={() => setTargetItem(getItemByIndex(i))}>
                        <img className="w-12 ease-in transition-all hover:scale-95 active:scale-105" src={"../../images/items/" + getItemByIndex(i).imagePath } />
                        <p className="text-[10px] font-normal text-gray-900 absolute top-12 left-[-5px] flex justify-end w-full">{getItemByIndex(i).amount}x</p>
                      </div>
                  }
                </div>    
              ))
            }
          </div>
        }

        { targetItem && 
          <div className="target-item flex flex-row gap-5">
            <div className="flex flex-col">
              <p className="font-medium">Item Information:</p>
              <p className="text-xs font-normal text-gray-900">Name: {targetItem.name}</p>
              <p className="text-xs font-normal text-gray-900">Anzahl: {targetItem.amount}x</p>
            </div>

            <div className="flex flex-col gap-1">
              { !(currentAuthUser.rankId <= 2) && <Button onClick={() => deleteItem(targetItem.slot)}>Item löschen</Button>}
              <Button onClick={() => notificationService.pushNotification("Diese Funktion wurde noch nicht implementiert.")}>Item analysieren</Button>
            </div>
          </div>
        }
        

        { !(currentAuthUser.rankId <= 2) &&
          <div className="actions flex flex-row gap-2">
            <Button onClick={() => clearInventory()}>Inventar leeren</Button>
            <Button onClick={() => requestAddItem()}>Item hinzufügen</Button>
          </div>
        }
      </div>
    </div>
  );
};

export default UserInfoInventory;