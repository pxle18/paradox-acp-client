import { unstable_useId } from "@mui/material";
import { compose } from "@mui/system";
import { ModalType } from "app/models/modal.model";
import { Notification } from "app/models/notification.model";
import { ItemVisualization } from "app/models/item-visualization.model";
import uuid from "uuid";
import React, { useState, createContext } from "react";

type Props = {
  children: React.ReactNode
}

interface HudContextType {
  currentItemVisualization: ItemVisualization | null;
  setCurrentItemVisualization: (itemVisualization: ItemVisualization | null) => void;
}

const HudContext = createContext<HudContextType>({} as HudContextType);

export const HudProvider: React.FC<Props> = ({children}) => {
  const [currentItemVisualization, setCurrentItemVisualization] = useState<ItemVisualization | null>(null);

  const hudContextValue: HudContextType = {
    currentItemVisualization,
    setCurrentItemVisualization
  };

  return (
    <HudContext.Provider value={hudContextValue}>
      {children}
    </HudContext.Provider>
  );
};

export const useHudContext = () => React.useContext(HudContext) as HudContextType;
