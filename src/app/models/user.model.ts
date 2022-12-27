import internal from "stream";

export interface UserModel {
	id: number;
	username: string;
  teamRank: string;
  forumId: number;
  
  money: number;
  bankMoney: number;
  blackMoney: number;
  
  level: number;
  job: string;
  cuffed: boolean;
  tied: boolean;
  factionId: number;
  phoneNumber: number;

  socialClubName: string;
  warns: number;
  suspended: boolean;

  birthDate: Date;
  lastLogin: Date;
}