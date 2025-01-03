export interface UserAddFields {
  username: string;
  password: string;
  email: string;
  nickname: string;
  ipaddress: string;
  language: string;
  encodeKey: string;
  newslatter: boolean;
}

interface BattleRecord {
  accountIDX: number;
  type1_win: number;
  type1_lose: number;
  type1_kill: number;
  type1_death: number;
  type2_win: number;
  type2_lose: number;
  type2_kill: number;
  type2_death: number;
  type3_win: number;
  type3_lose: number;
  type3_kill: number;
  type3_death: number;
  type4_win: number;
  type4_lose: number;
  type4_kill: number;
  type4_death: number;
  regDate: string;
}

interface WalletInfo {
  accountIDX: number;
  walletIDX: string;
  cash: CashInfo;
  pin: string;
  status: number;
  dailyLimit: number;
  monthlyLimit: number;
  walletType: string;
  currency: string;
  isVerified: number;
  isLocked: number;
  lockReason: string;
  rewardPoints: number;
  lastTransaction: Date;
  regDate: Date;
  updateDate: Date;
}

interface CashInfo {
  accountIDX: number;
  amtCash: number;
  amtBonus: number;
  amtLimit: number;
  amtSum: number;
  chgDate: string;
  regDate: string;
}

interface DiscordInfo {
  accountIDX: number;
  discordID: string | null;
  username: string | null;
  email: string | null;
  discriminator: string | null;
  global_name: string | null;
  avatar: string | null;
  banner: string | null;
  banner_color: string | null;
  locale: string | null;
  premium_type: string | null;
  regDate: string;
  updateDate: string;
}

interface GameInfo {
  accountIDX: number;
  userState: number;
  gameMoney: string;
  playTime: number;
  conn_count: number;
  userLevel: number;
  userEXP: number;
  userFishingLevel: number;
  userFishingEXP: number;
  userExcavationLevel: number;
  userExcavationEXP: number;
  userHerocEXP: number;
  userHerosEXP: number;
  rencpoint: number;
  renspoint: number;
  relateLevel: number;
  regionType: number;
  refillData: number;
  connDate: string;
  regDate: string;
  Practice: number;
}

interface UserInfo {
  accountIDX: number;
  visit_count: number;
  checkDate: string;
  rec_index: number;
  rec_inc: number;
  rec_dec: number;
  cnnDate: string;
  bio: string;
  clickDate: string;
  userIP: string;
  regDate: string;
  userImage: string;
}

interface LanguageInfo {
  accountIDX: number;
  lang_code: string;
  regDate: string;
}

interface LoginInfo {
  accountIDX: number;
  encodeKey: string;
  gameServerID: string;
  userIP: string | null;
  connDate: string;
}

export type User = {
  accountIDX: number;
  userID: string;
  nickName: string;
  email: string;
  mailling: number;
  userType: number;
  joinType: number;
  eventType: number;
  cpType: number;
  limitType: number;
  limitDate: string;
  trackingcode: number;
  regDate: string;
  updateDate: string;
  makeType: number;
  battlerecord: BattleRecord;
  walletinfo: WalletInfo;
  discordinfo: DiscordInfo;
  gameinfo: GameInfo;
  userinfo: UserInfo;
  languageinfo: LanguageInfo;
  logininfo: LoginInfo;
};
