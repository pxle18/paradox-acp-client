import React, { useCallback, useEffect, useState } from "react";

import Button from "components/button";
import Input from "components/input";

import { useAuthContext } from "app/contexts/auth-context";
import { useHudContext } from "app/contexts/hud-context";
import { XIcon } from "@heroicons/react/outline";
import { useUserContext } from "app/contexts/user-context";

const VisualizeItemLog: React.FC = () => {
  const { currentAuthUser } = useAuthContext();
  const { currentUser } = useUserContext();
  const { currentItemVisualization, setCurrentItemVisualization } = useHudContext();

  return (
    <div className="user-info-visualization-item-log">
      { 
        currentItemVisualization &&
        <div className="flex absolute justify-center items-center w-full h-full bg-dark-900 bg-opacity-60 backdrop-blur-[4px] pointer-events-auto">
          <div className="bg-dark-800 w-96 h-72 rounded-sm shadow-md flex justify-center items-center flex-col relative">
            <Button className="absolute top-2 right-2" onClick={() => setCurrentItemVisualization(null)}>
              <XIcon className="w-[11px]" />
            </Button>

            <p className="text-3xl font-semibold">Item-Visualisierung:</p>

            <div className="flex flex-row gap-10 w-full mt-5 justify-center items-center">
              <div className="inventory-slot w-20 h-20 justify-center items-center flex flex-col relative bg-dark-900 bg-opacity-70 outline-dotted -outline-offset-2 outline-gray-800 outline-2">
                {
                  currentItemVisualization.targetItem && 
                    currentItemVisualization.amount < 0 && 
                      <div className="flex justify-center items-center w-full relative flex-col animate-[item-swipe-right_3s_infinite] z-10">
                        <img className="w-12 ease-in transition-all hover:scale-95 active:scale-105" src={"../../images/items/" + currentItemVisualization.targetItem?.imagePath } />
                        <p className="text-[9px] font-normal text-gray-900 flex relative top-[4px] justify-center text-center w-full">{currentItemVisualization.targetItem?.name}</p>
                      </div>
                }
                <p className="absolute top-24 font-medium text-center">LOCAL</p>
              </div>    
              
              <div className="inventory-slot w-20 h-20 justify-center items-center flex flex-col  bg-dark-900 bg-opacity-70 outline-dotted -outline-offset-2 outline-gray-800 outline-2 relative">
                {
                  currentItemVisualization.targetItem && 
                    currentItemVisualization.amount > 0 && 
                      <div className="flex justify-center items-center w-full relative flex-col animate-[item-swipe-left_3s_infinite] ">
                        <img className="w-12 ease-in transition-all hover:scale-95 active:scale-105" src={"../../images/items/" + currentItemVisualization.targetItem?.imagePath } />
                        <p className="text-[9px] font-normal text-gray-900 flex relative top-[4px] justify-center text-center w-full">{currentItemVisualization.targetItem?.name}</p>
                      </div>
                }
                <p className="absolute top-24 font-medium text-center">{currentItemVisualization.targetInventory}</p>
              </div>    
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default VisualizeItemLog;