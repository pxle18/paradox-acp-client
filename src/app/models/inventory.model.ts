import internal from "stream";

export interface Inventory {
	id: number;
  maxSlots: number;
  slots: InventorySlot[]; 
}

export interface InventorySlot {
  id: number;
  name: string;
  amount?: number;
  imagePath: string;
  slot?: number;
}