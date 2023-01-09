import { InventorySlot } from "./inventory.model";

export interface ItemVisualization {
  targetItem: InventorySlot;
  targetInventory: string;
  amount: number;
}