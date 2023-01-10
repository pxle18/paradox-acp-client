import internal from "stream";

export interface TeamModel {
	id: number;
  
	name: string;
	shortName: number;
  rgbColor: string;
  leader: string;

  packets: string;
  balance: number;

  medicSlots: number;
  medicMaxSlots: number;


  memberCount: number;
  maxCount: number;

  note: string;
  radioFrequencies: string;
  
  isDutyTeam: boolean;
  isGangster: boolean;
  isActive: boolean;

  warns: number;
}