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
  regDate: Date;
}

interface WalletInfo {
  walletIDX: string;
  userID: string;
  pin: string;
  status: number;
  dailyLimit: number;
  monthlyLimit: number;
  walletType: string;
  currency: string;
  isVerified: boolean;
  isLocked: boolean;
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
  chgDate: Date;
  regDate: Date;
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
  regDate: Date;
  updateDate: Date;
}

interface GameInfo {
  accountIDX: number;
  userState: number;
  gameMoney: Bigint;
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
  connDate: Date;
  regDate: Date;
  Practice: number;
}

interface UserInfo {
  accountIDX: number;
  visit_count: number;
  checkDate: Date;
  rec_index: number;
  rec_inc: number;
  rec_dec: number;
  cnnDate: Date;
  bio: string;
  clickDate: Date;
  userIP: string;
  regDate: Date;
  userImage: string;
}

interface LanguageInfo {
  accountIDX: number;
  lang_code: string;
  regDate: Date;
}

interface LoginInfo {
  accountIDX: number;
  encodeKey: string;
  gameServerID: Bigint;
  userIP: string | null;
  connDate: Date;
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
  limitDate: Date;
  trackingcode: number;
  regDate: Date;
  makeType: number;
  role: string;
  twofa_email: number;
  battlerecord: BattleRecord;
  discordinfo: DiscordInfo;
  gameinfo: GameInfo;
  userinfo: UserInfo;
  languageinfo: LanguageInfo;
  logininfo: LoginInfo;
  cashinfo: CashInfo;
  walletinfo: WalletInfo;
};
