import internal from "stream";

export interface UserModel {
	id: number;

  isOnline: boolean;

	username: string;
  adminRank: string;
  forumId: number;
  
  money: number;
  bankMoney: number;
  blackMoney: number;
  
  level: number;
  job: string;
  cuffed: boolean;
  tied: boolean;
  
  faction: string;
  factionId: number;
  
  phoneNumber: number;

  socialClubName: string;
  warns: number;
  suspended: boolean;

  birthDate: string;
  lastLogin: number;
}