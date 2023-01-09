export enum ModalType {
  CONFIRMATION,
  INPUT,
  SELECT
}

export interface Modal {
  modalType: ModalType | null;
  title: string;
  description: string;
  dataSource?: [];
  callback: (input: boolean | string) => void;
}