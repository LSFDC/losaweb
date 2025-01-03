
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.1.0
 * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
 */
Prisma.prismaVersion = {
  client: "6.1.0",
  engine: "11f085a2012c0f4778414c8db2651556ee0ef959"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable',
  Snapshot: 'Snapshot'
});

exports.Prisma.Define_encode_keyScalarFieldEnum = {
  idx: 'idx',
  encodeKey: 'encodeKey',
  regDate: 'regDate'
};

exports.Prisma.Define_game_serverScalarFieldEnum = {
  idx: 'idx',
  serverID: 'serverID',
  serverIP: 'serverIP',
  serverPort: 'serverPort',
  serverName: 'serverName',
  clientPort: 'clientPort',
  connNumber: 'connNumber',
  status: 'status',
  regDate: 'regDate'
};

exports.Prisma.Define_hero_priceScalarFieldEnum = {
  HeroCode: 'HeroCode',
  HeroPrice: 'HeroPrice'
};

exports.Prisma.Define_medalScalarFieldEnum = {
  idx: 'idx',
  medalCode: 'medalCode',
  eng_name: 'eng_name',
  point: 'point',
  title: 'title',
  content1: 'content1',
  content2: 'content2',
  regDate: 'regDate'
};

exports.Prisma.Event_item_limitedScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  EventType: 'EventType',
  GoodsIndex: 'GoodsIndex',
  GoodsCount: 'GoodsCount'
};

exports.Prisma.TB_LTS_WEEKTIMEScalarFieldEnum = {
  userID: 'userID',
  GmtCodeNo: 'GmtCodeNo',
  Wday: 'Wday',
  Wtime: 'Wtime'
};

exports.Prisma.TB_LTS_WEEKTIME_PARENT_CHILD_INFOScalarFieldEnum = {
  PARENT_ID: 'PARENT_ID',
  CHILD_ID: 'CHILD_ID',
  Agree_Type: 'Agree_Type',
  AgreeDate: 'AgreeDate',
  RegIP: 'RegIP',
  RegDate: 'RegDate'
};

exports.Prisma.UserAccessoryDBScalarFieldEnum = {
  idx: 'idx',
  AccountIDX: 'AccountIDX',
  ItemCode: 'ItemCode',
  PeriodType: 'PeriodType',
  PeriodDate: 'PeriodDate',
  StatValue: 'StatValue',
  ClassType: 'ClassType',
  RegDate: 'RegDate',
  ComposeCode: 'ComposeCode',
  ComposeValue: 'ComposeValue'
};

exports.Prisma.UserAttendDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  AttendCount: 'AttendCount',
  RewardTable: 'RewardTable',
  ConnectDate: 'ConnectDate',
  RegDate: 'RegDate'
};

exports.Prisma.UserCashDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  amtCash: 'amtCash',
  amtBonus: 'amtBonus',
  amtLimit: 'amtLimit',
  amtSum: 'amtSum',
  chgDate: 'chgDate',
  regDate: 'regDate'
};

exports.Prisma.UserCloverDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  CloverCnt: 'CloverCnt',
  LastChargeDate: 'LastChargeDate',
  RemainTime: 'RemainTime',
  regDate: 'regDate'
};

exports.Prisma.UserCoinDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  UpdateDate: 'UpdateDate',
  CoinType: 'CoinType',
  RegDate: 'RegDate'
};

exports.Prisma.UserCostumeDBScalarFieldEnum = {
  idx: 'idx',
  accountIDX: 'accountIDX',
  itemCode: 'itemCode',
  mcustom: 'mcustom',
  fcustom: 'fcustom',
  periodType: 'periodType',
  periodDate: 'periodDate',
  classType: 'classType',
  regDate: 'regDate'
};

exports.Prisma.UserEventBingo_NumberScalarFieldEnum = {
  accountidx: 'accountidx',
  number1: 'number1',
  number2: 'number2',
  number3: 'number3',
  number4: 'number4',
  number5: 'number5',
  number6: 'number6',
  number7: 'number7',
  number8: 'number8',
  number9: 'number9',
  number10: 'number10',
  number11: 'number11',
  number12: 'number12',
  number13: 'number13',
  number14: 'number14',
  number15: 'number15',
  number16: 'number16',
  number17: 'number17',
  number18: 'number18',
  number19: 'number19',
  number20: 'number20',
  number21: 'number21',
  number22: 'number22',
  number23: 'number23',
  number24: 'number24',
  number25: 'number25',
  regDate: 'regDate'
};

exports.Prisma.UserEventBingo_PresentScalarFieldEnum = {
  accountidx: 'accountidx',
  item1: 'item1',
  item2: 'item2',
  item3: 'item3',
  item4: 'item4',
  item5: 'item5',
  item6: 'item6',
  item7: 'item7',
  item8: 'item8',
  item9: 'item9',
  item10: 'item10',
  item11: 'item11',
  item12: 'item12',
  item13: 'item13',
  regDate: 'regDate'
};

exports.Prisma.UserEventPirateRoulette_NumberScalarFieldEnum = {
  accountidx: 'accountidx',
  HP: 'HP',
  slot1: 'slot1',
  slot2: 'slot2',
  slot3: 'slot3',
  slot4: 'slot4',
  slot5: 'slot5',
  slot6: 'slot6',
  slot7: 'slot7',
  slot8: 'slot8',
  slot9: 'slot9',
  slot10: 'slot10',
  slot11: 'slot11',
  slot12: 'slot12',
  slot13: 'slot13',
  slot14: 'slot14',
  slot15: 'slot15',
  slot16: 'slot16',
  slot17: 'slot17',
  slot18: 'slot18',
  slot19: 'slot19',
  slot20: 'slot20',
  slot21: 'slot21',
  slot22: 'slot22',
  slot23: 'slot23',
  slot24: 'slot24',
  slot25: 'slot25',
  slot26: 'slot26',
  slot27: 'slot27',
  slot28: 'slot28',
  slot29: 'slot29',
  slot30: 'slot30',
  slot31: 'slot31',
  slot32: 'slot32',
  slot33: 'slot33',
  slot34: 'slot34',
  slot35: 'slot35',
  slot36: 'slot36',
  slot37: 'slot37',
  slot38: 'slot38',
  slot39: 'slot39',
  slot40: 'slot40',
  regDate: 'regDate'
};

exports.Prisma.UserEventPirateRoulette_PresentScalarFieldEnum = {
  accountidx: 'accountidx',
  reward1: 'reward1',
  reward2: 'reward2',
  reward3: 'reward3',
  reward4: 'reward4',
  reward5: 'reward5',
  reward6: 'reward6',
  reward7: 'reward7',
  reward8: 'reward8',
  reward9: 'reward9',
  reward10: 'reward10',
  reward11: 'reward11',
  reward12: 'reward12',
  reward13: 'reward13',
  reward14: 'reward14',
  reward15: 'reward15',
  regDate: 'regDate'
};

exports.Prisma.UserGameDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  userState: 'userState',
  gameMoney: 'gameMoney',
  playTime: 'playTime',
  conn_count: 'conn_count',
  userLevel: 'userLevel',
  userEXP: 'userEXP',
  userFishingLevel: 'userFishingLevel',
  userFishingEXP: 'userFishingEXP',
  userExcavationLevel: 'userExcavationLevel',
  userExcavationEXP: 'userExcavationEXP',
  userHerocEXP: 'userHerocEXP',
  userHerosEXP: 'userHerosEXP',
  rencpoint: 'rencpoint',
  renspoint: 'renspoint',
  relateLevel: 'relateLevel',
  regionType: 'regionType',
  refillData: 'refillData',
  connDate: 'connDate',
  regDate: 'regDate',
  Practice: 'Practice'
};

exports.Prisma.UserGoldDBScalarFieldEnum = {
  idx: 'idx',
  AccountIDX: 'AccountIDX',
  OriginalAmount: 'OriginalAmount',
  Amount: 'Amount',
  GoldType: 'GoldType',
  GoldStatus: 'GoldStatus',
  ExpirationDate: 'ExpirationDate',
  RegDate: 'RegDate'
};

exports.Prisma.UserGuildAttendDBScalarFieldEnum = {
  InitDate: 'InitDate',
  AccountIDX: 'AccountIDX',
  GuildIDX: 'GuildIDX',
  RegDate: 'RegDate'
};

exports.Prisma.UserGuildDBScalarFieldEnum = {
  idx: 'idx',
  guildName: 'guildName',
  aboutguild: 'aboutguild',
  guildmark: 'guildmark',
  ranking: 'ranking',
  point: 'point',
  todaypoint: 'todaypoint',
  guildLevel: 'guildLevel',
  maxcount: 'maxcount',
  membercount: 'membercount',
  today_vc: 'today_vc',
  total_vc: 'total_vc',
  regDate: 'regDate'
};

exports.Prisma.UserGuildHQDBScalarFieldEnum = {
  GuildIDX: 'GuildIDX',
  ItemSerial: 'ItemSerial',
  ItemCode: 'ItemCode',
  ItemXZ: 'ItemXZ',
  ItemY: 'ItemY',
  ItemRotate: 'ItemRotate',
  ItemDecoScore: 'ItemDecoScore',
  ItemStatus: 'ItemStatus'
};

exports.Prisma.UserGuildHQVerDBScalarFieldEnum = {
  GuildIDX: 'GuildIDX',
  VerStatus: 'VerStatus',
  UptDate: 'UptDate',
  RegDate: 'RegDate'
};

exports.Prisma.UserHqDBScalarFieldEnum = {
  idx: 'idx',
  accountIDX: 'accountIDX',
  class1_type: 'class1_type',
  class1_posx: 'class1_posx',
  class1_posy: 'class1_posy',
  class2_type: 'class2_type',
  class2_posx: 'class2_posx',
  class2_posy: 'class2_posy',
  class3_type: 'class3_type',
  class3_posx: 'class3_posx',
  class3_posy: 'class3_posy',
  class4_type: 'class4_type',
  class4_posx: 'class4_posx',
  class4_posy: 'class4_posy',
  class5_type: 'class5_type',
  class5_posx: 'class5_posx',
  class5_posy: 'class5_posy',
  class6_type: 'class6_type',
  class6_posx: 'class6_posx',
  class6_posy: 'class6_posy',
  class7_type: 'class7_type',
  class7_posx: 'class7_posx',
  class7_posy: 'class7_posy',
  class8_type: 'class8_type',
  class8_posx: 'class8_posx',
  class8_posy: 'class8_posy',
  class9_type: 'class9_type',
  class9_posx: 'class9_posx',
  class9_posy: 'class9_posy',
  class10_type: 'class10_type',
  class10_posx: 'class10_posx',
  class10_posy: 'class10_posy',
  lockType: 'lockType',
  regDate: 'regDate'
};

exports.Prisma.UserInfoBDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  tel: 'tel',
  mobile: 'mobile',
  zipcode: 'zipcode',
  address1: 'address1',
  address2: 'address2',
  regDate: 'regDate'
};

exports.Prisma.UserInfoDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  visit_count: 'visit_count',
  checkDate: 'checkDate',
  rec_index: 'rec_index',
  rec_inc: 'rec_inc',
  rec_dec: 'rec_dec',
  cnnDate: 'cnnDate',
  clickDate: 'clickDate',
  userIP: 'userIP',
  regDate: 'regDate',
  userImage: 'userImage',
  bio: 'bio'
};

exports.Prisma.UserLeagueCheerDBScalarFieldEnum = {
  idx: 'idx',
  accountIDX: 'accountIDX',
  leagueIDX: 'leagueIDX',
  teamIDX: 'teamIDX',
  regDate: 'regDate'
};

exports.Prisma.UserLeagueListDBScalarFieldEnum = {
  idx: 'idx',
  accountIDX: 'accountIDX',
  startDate: 'startDate',
  endDate: 'endDate',
  leagueType: 'leagueType',
  leagueState: 'leagueState',
  regDate: 'regDate'
};

exports.Prisma.UserLeagueTeamDBScalarFieldEnum = {
  idx: 'idx',
  leagueIDX: 'leagueIDX',
  teamName: 'teamName',
  leaderIDX: 'leaderIDX',
  leagueStartPosition: 'leagueStartPosition',
  leaguePosition: 'leaguePosition',
  maxcount: 'maxcount',
  cheerPoint: 'cheerPoint',
  currentRound: 'currentRound',
  factionPoint: 'factionPoint',
  factionType: 'factionType',
  regDate: 'regDate'
};

exports.Prisma.UserLeagueTeamMemberDBScalarFieldEnum = {
  idx: 'idx',
  accountIDX: 'accountIDX',
  leagueIDX: 'leagueIDX',
  teamIDX: 'teamIDX',
  joinType: 'joinType',
  regDate: 'regDate'
};

exports.Prisma.UserLoginDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  encodeKey: 'encodeKey',
  gameServerID: 'gameServerID',
  userIP: 'userIP',
  web_token: 'web_token',
  web_login: 'web_login',
  connDate: 'connDate'
};

exports.Prisma.UserMatchModeDailyRankingDBScalarFieldEnum = {
  Ranking: 'Ranking',
  AccountIDX: 'AccountIDX',
  MatchPoint: 'MatchPoint'
};

exports.Prisma.UserMatchModeDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  MatchPoint: 'MatchPoint',
  WinCount: 'WinCount',
  LoseCount: 'LoseCount',
  MaxWinCount: 'MaxWinCount',
  PlayCount: 'PlayCount',
  RankMMR: 'RankMMR',
  RegDate: 'RegDate'
};

exports.Prisma.UserMatchModeHistoryDBScalarFieldEnum = {
  idx: 'idx',
  AccountIDX: 'AccountIDX',
  WinLoseType: 'WinLoseType',
  TeamWinCount: 'TeamWinCount',
  OpposingTeamWinCount: 'OpposingTeamWinCount',
  PlayDate: 'PlayDate'
};

exports.Prisma.UserMatchModeSeasonRankingDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  S1_Ranking: 'S1_Ranking',
  S1_MatchPoint: 'S1_MatchPoint',
  S1_SeasonDate: 'S1_SeasonDate',
  S2_Ranking: 'S2_Ranking',
  S2_MatchPoint: 'S2_MatchPoint',
  S2_SeasonDate: 'S2_SeasonDate',
  S3_Ranking: 'S3_Ranking',
  S3_MatchPoint: 'S3_MatchPoint',
  S3_SeasonDate: 'S3_SeasonDate',
  S4_Ranking: 'S4_Ranking',
  S4_MatchPoint: 'S4_MatchPoint',
  S4_SeasonDate: 'S4_SeasonDate',
  S5_Ranking: 'S5_Ranking',
  S5_MatchPoint: 'S5_MatchPoint',
  S5_SeasonDate: 'S5_SeasonDate',
  S6_Ranking: 'S6_Ranking',
  S6_MatchPoint: 'S6_MatchPoint',
  S6_SeasonDate: 'S6_SeasonDate',
  S7_Ranking: 'S7_Ranking',
  S7_MatchPoint: 'S7_MatchPoint',
  S7_SeasonDate: 'S7_SeasonDate'
};

exports.Prisma.UserMemberDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  userID: 'userID',
  nickName: 'nickName',
  userPWD: 'userPWD',
  email: 'email',
  mailling: 'mailling',
  userType: 'userType',
  joinType: 'joinType',
  eventType: 'eventType',
  cpType: 'cpType',
  limitType: 'limitType',
  limitDate: 'limitDate',
  trackingcode: 'trackingcode',
  regDate: 'regDate',
  updateDate: 'updateDate',
  verified: 'verified',
  deleteDate: 'deleteDate',
  makeType: 'makeType'
};

exports.Prisma.UserMissionDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  MissionType: 'MissionType',
  MissionCode: 'MissionCode',
  MissionValue: 'MissionValue',
  MissionStatus: 'MissionStatus',
  RegDate: 'RegDate'
};

exports.Prisma.UserNameDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  userName: 'userName',
  userBirthday: 'userBirthday',
  userJumin1: 'userJumin1',
  userJumin2: 'userJumin2',
  virtualJumin: 'virtualJumin',
  ipinCI: 'ipinCI',
  ipinDI: 'ipinDI',
  userEnCode: 'userEnCode',
  userNumber: 'userNumber',
  userGender: 'userGender',
  returnValue: 'returnValue',
  userIP: 'userIP',
  realType: 'realType',
  certType: 'certType',
  regDate: 'regDate'
};

exports.Prisma.UserParentDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  parentName: 'parentName',
  parentBirth: 'parentBirth',
  parentJumin1: 'parentJumin1',
  parentJumin2: 'parentJumin2',
  parentEncode: 'parentEncode',
  parentNumber: 'parentNumber',
  email: 'email',
  agreeSDate: 'agreeSDate',
  agreeEDate: 'agreeEDate',
  agreeType: 'agreeType',
  logIDX: 'logIDX',
  regDate: 'regDate',
  Certify_Type: 'Certify_Type',
  PIpinCI: 'PIpinCI',
  PIpinDI: 'PIpinDI'
};

exports.Prisma.UserPCBangPlayTimeDBScalarFieldEnum = {
  PCBangDate: 'PCBangDate',
  PCBangIndex: 'PCBangIndex',
  AccountIDX: 'AccountIDX',
  PCBangPlayTime: 'PCBangPlayTime'
};

exports.Prisma.UserPCBangPregentDBScalarFieldEnum = {
  PCBangDate: 'PCBangDate',
  AccountIDX: 'AccountIDX',
  PCBangCount: 'PCBangCount',
  PCBangBonusCash: 'PCBangBonusCash'
};

exports.Prisma.UserPersonalHQDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  ItemSerial: 'ItemSerial',
  ItemCode: 'ItemCode',
  ItemXZ: 'ItemXZ',
  ItemY: 'ItemY',
  ItemRotate: 'ItemRotate',
  ItemDecoScore: 'ItemDecoScore',
  ItemStatus: 'ItemStatus'
};

exports.Prisma.UserPetDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  petIDX: 'petIDX',
  petCode: 'petCode',
  petRank: 'petRank',
  petLevel: 'petLevel',
  petExp: 'petExp',
  petEquip: 'petEquip',
  petStatus: 'petStatus',
  regDate: 'regDate'
};

exports.Prisma.UserPieceDBScalarFieldEnum = {
  idx: 'idx',
  accountIDX: 'accountIDX',
  piece1_type: 'piece1_type',
  piece1_value1: 'piece1_value1',
  piece1_value2: 'piece1_value2',
  piece1_cnt: 'piece1_cnt',
  piece2_type: 'piece2_type',
  piece2_value1: 'piece2_value1',
  piece2_value2: 'piece2_value2',
  piece2_cnt: 'piece2_cnt',
  piece3_type: 'piece3_type',
  piece3_value1: 'piece3_value1',
  piece3_value2: 'piece3_value2',
  piece3_cnt: 'piece3_cnt',
  piece4_type: 'piece4_type',
  piece4_value1: 'piece4_value1',
  piece4_value2: 'piece4_value2',
  piece4_cnt: 'piece4_cnt',
  piece5_type: 'piece5_type',
  piece5_value1: 'piece5_value1',
  piece5_value2: 'piece5_value2',
  piece5_cnt: 'piece5_cnt',
  piece6_type: 'piece6_type',
  piece6_value1: 'piece6_value1',
  piece6_value2: 'piece6_value2',
  piece6_cnt: 'piece6_cnt',
  piece7_type: 'piece7_type',
  piece7_value1: 'piece7_value1',
  piece7_value2: 'piece7_value2',
  piece7_cnt: 'piece7_cnt',
  piece8_type: 'piece8_type',
  piece8_value1: 'piece8_value1',
  piece8_value2: 'piece8_value2',
  piece8_cnt: 'piece8_cnt',
  piece9_type: 'piece9_type',
  piece9_value1: 'piece9_value1',
  piece9_value2: 'piece9_value2',
  piece9_cnt: 'piece9_cnt',
  piece10_type: 'piece10_type',
  piece10_value1: 'piece10_value1',
  piece10_value2: 'piece10_value2',
  piece10_cnt: 'piece10_cnt',
  regDate: 'regDate'
};

exports.Prisma.UserPopStoreDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  PopupSlot: 'PopupSlot',
  RegDate: 'RegDate'
};

exports.Prisma.UserPracticeDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  PracticeIDX: 'PracticeIDX',
  PracticeCount: 'PracticeCount',
  PracticeGrade: 'PracticeGrade',
  PracticeTime: 'PracticeTime',
  PracticeRank: 'PracticeRank',
  UpdateDate: 'UpdateDate',
  regDate: 'regDate'
};

exports.Prisma.UserPracticeDB_PresentScalarFieldEnum = {
  PresentValue: 'PresentValue',
  PresentType1: 'PresentType1',
  Code1: 'Code1',
  Value1: 'Value1',
  PresentType2: 'PresentType2',
  Code2: 'Code2',
  Value2: 'Value2',
  PresentType3: 'PresentType3',
  Code3: 'Code3',
  Value3: 'Value3',
  PresentType4: 'PresentType4',
  Code4: 'Code4',
  Value4: 'Value4',
  PresentType5: 'PresentType5',
  Code5: 'Code5',
  Value5: 'Value5'
};

exports.Prisma.UserRankingDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  class: 'class',
  battle: 'battle',
  training: 'training',
  award: 'award',
  medal: 'medal',
  tester: 'tester',
  region: 'region',
  regDate: 'regDate'
};

exports.Prisma.UserRankingDB_battleScalarFieldEnum = {
  accountIDX: 'accountIDX',
  win_fix: 'win_fix',
  tie_fix: 'tie_fix',
  lose_fix: 'lose_fix',
  win_prev: 'win_prev',
  tie_prev: 'tie_prev',
  lose_prev: 'lose_prev',
  rank_prev: 'rank_prev',
  rank_now: 'rank_now',
  rank_total: 'rank_total',
  rank_battle: 'rank_battle',
  regDate: 'regDate'
};

exports.Prisma.UserRankingDB_classgroupScalarFieldEnum = {
  accountIDX: 'accountIDX',
  nickName: 'nickName',
  userLevel: 'userLevel',
  expert: 'expert',
  ranking_8day: 'ranking_8day',
  ranking_7day: 'ranking_7day',
  ranking_6day: 'ranking_6day',
  ranking_5day: 'ranking_5day',
  ranking_4day: 'ranking_4day',
  ranking_3day: 'ranking_3day',
  ranking_2day: 'ranking_2day',
  ranking_1day: 'ranking_1day',
  regDate: 'regDate'
};

exports.Prisma.UserRankingDB_factionScalarFieldEnum = {
  accountIDX: 'accountIDX',
  win_fix: 'win_fix',
  tie_fix: 'tie_fix',
  lose_fix: 'lose_fix',
  win_prev: 'win_prev',
  tie_prev: 'tie_prev',
  lose_prev: 'lose_prev',
  rank_prev: 'rank_prev',
  rank_now: 'rank_now',
  rank_total: 'rank_total',
  rank_faction: 'rank_faction',
  regDate: 'regDate'
};

exports.Prisma.UserRecordBattleDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  type1_win: 'type1_win',
  type1_lose: 'type1_lose',
  type1_kill: 'type1_kill',
  type1_death: 'type1_death',
  type2_win: 'type2_win',
  type2_lose: 'type2_lose',
  type2_kill: 'type2_kill',
  type2_death: 'type2_death',
  type3_win: 'type3_win',
  type3_lose: 'type3_lose',
  type3_kill: 'type3_kill',
  type3_death: 'type3_death',
  type4_win: 'type4_win',
  type4_lose: 'type4_lose',
  type4_kill: 'type4_kill',
  type4_death: 'type4_death',
  regDate: 'regDate'
};

exports.Prisma.UserRecordGuildDBScalarFieldEnum = {
  guildIDX: 'guildIDX',
  type1_win: 'type1_win',
  type1_lose: 'type1_lose',
  type1_kill: 'type1_kill',
  type1_death: 'type1_death',
  regDate: 'regDate'
};

exports.Prisma.UserRelativeLevelDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  weekend_BackupLevel: 'weekend_BackupLevel',
  weekend_BackupExp: 'weekend_BackupExp',
  init_time: 'init_time',
  reward_State: 'reward_State',
  regDate: 'regDate'
};

exports.Prisma.UserSpentGoldDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  UserSpentGold: 'UserSpentGold',
  RegDate: 'RegDate'
};

exports.Prisma.UserSpentGoldLogDBScalarFieldEnum = {
  RegDate: 'RegDate',
  AccountIDX: 'AccountIDX',
  UserSpentGold: 'UserSpentGold'
};

exports.Prisma.UserSpiritDBScalarFieldEnum = {
  idx: 'idx',
  AccountIDX: 'AccountIDX',
  SpiritType: 'SpiritType',
  SpiritCount: 'SpiritCount',
  RegDate: 'RegDate'
};

exports.Prisma.UserTimeCashDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  ItemCode: 'ItemCode',
  ItemCount: 'ItemCount',
  ItemStatus: 'ItemStatus',
  RegDate: 'RegDate',
  StartDate: 'StartDate',
  OverDate: 'OverDate',
  UpdDate: 'UpdDate'
};

exports.Prisma.UserTimeGateDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  GetTime: 'GetTime'
};

exports.Prisma.UserTitleDBScalarFieldEnum = {
  AccountIDX: 'AccountIDX',
  TitleCode: 'TitleCode',
  TitleValue: 'TitleValue',
  TitleLevel: 'TitleLevel',
  TitlePremium: 'TitlePremium',
  TitleEquip: 'TitleEquip',
  TitleStatus: 'TitleStatus',
  UpdDate: 'UpdDate',
  RegDate: 'RegDate'
};

exports.Prisma.UserLanguageDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  lang_code: 'lang_code',
  regDate: 'regDate'
};

exports.Prisma.UserDiscordDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  discordID: 'discordID',
  username: 'username',
  email: 'email',
  discriminator: 'discriminator',
  global_name: 'global_name',
  avatar: 'avatar',
  banner: 'banner',
  banner_color: 'banner_color',
  locale: 'locale',
  premium_type: 'premium_type',
  regDate: 'regDate',
  updateDate: 'updateDate'
};

exports.Prisma.UserWalletDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  walletIDX: 'walletIDX',
  pin: 'pin',
  status: 'status',
  dailyLimit: 'dailyLimit',
  monthlyLimit: 'monthlyLimit',
  walletType: 'walletType',
  currency: 'currency',
  isVerified: 'isVerified',
  isLocked: 'isLocked',
  lockReason: 'lockReason',
  rewardPoints: 'rewardPoints',
  lastTransaction: 'lastTransaction',
  regDate: 'regDate',
  updateDate: 'updateDate'
};

exports.Prisma.UserTransactionDBScalarFieldEnum = {
  transactionIDX: 'transactionIDX',
  walletIDX: 'walletIDX',
  accountIDX: 'accountIDX',
  amount: 'amount',
  transactionType: 'transactionType',
  createdAt: 'createdAt'
};

exports.Prisma.UserVIPDBScalarFieldEnum = {
  accountIDX: 'accountIDX',
  vipIDX: 'vipIDX',
  vipType: 'vipType',
  vipLevel: 'vipLevel',
  vipExpire: 'vipExpire',
  vipStatus: 'vipStatus',
  vipNote: 'vipNote',
  regDate: 'regDate',
  updateDate: 'updateDate'
};

exports.Prisma.UserVIPRewardScalarFieldEnum = {
  vipRewardIDX: 'vipRewardIDX',
  vipIDX: 'vipIDX',
  rewardType: 'rewardType',
  rewardAmount: 'rewardAmount',
  rewardNote: 'rewardNote',
  regDate: 'regDate'
};

exports.Prisma.WebNewsDataScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  content: 'content',
  authorIDX: 'authorIDX',
  status: 'status',
  views: 'views',
  thumbnailUrl: 'thumbnailUrl',
  isFeatured: 'isFeatured',
  categoryId: 'categoryId',
  publishDate: 'publishDate'
};

exports.Prisma.WebNewsCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.WebPatchNotesScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  content: 'content',
  publishDate: 'publishDate',
  authorIDX: 'authorIDX',
  status: 'status',
  views: 'views',
  thumbnailUrl: 'thumbnailUrl',
  isFeatured: 'isFeatured'
};

exports.Prisma.WebShopDataScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  stock: 'stock',
  price: 'price',
  status: 'status',
  isFeatured: 'isFeatured',
  thumbnailUrl: 'thumbnailUrl',
  images: 'images',
  categoryId: 'categoryId',
  publisedDate: 'publisedDate',
  updateDate: 'updateDate'
};

exports.Prisma.WebShopCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  status: 'status'
};

exports.Prisma.WebPamentProviderScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  active: 'active'
};

exports.Prisma.WebPaymentChannelScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  feePercent: 'feePercent',
  iconUrl: 'iconUrl',
  active: 'active',
  paymentProviderId: 'paymentProviderId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  define_encode_key: 'define_encode_key',
  define_game_server: 'define_game_server',
  define_hero_price: 'define_hero_price',
  define_medal: 'define_medal',
  event_item_limited: 'event_item_limited',
  TB_LTS_WEEKTIME: 'TB_LTS_WEEKTIME',
  TB_LTS_WEEKTIME_PARENT_CHILD_INFO: 'TB_LTS_WEEKTIME_PARENT_CHILD_INFO',
  userAccessoryDB: 'userAccessoryDB',
  userAttendDB: 'userAttendDB',
  userCashDB: 'userCashDB',
  userCloverDB: 'userCloverDB',
  userCoinDB: 'userCoinDB',
  userCostumeDB: 'userCostumeDB',
  userEventBingo_Number: 'userEventBingo_Number',
  userEventBingo_Present: 'userEventBingo_Present',
  userEventPirateRoulette_Number: 'userEventPirateRoulette_Number',
  userEventPirateRoulette_Present: 'userEventPirateRoulette_Present',
  userGameDB: 'userGameDB',
  userGoldDB: 'userGoldDB',
  userGuildAttendDB: 'userGuildAttendDB',
  userGuildDB: 'userGuildDB',
  userGuildHQDB: 'userGuildHQDB',
  userGuildHQVerDB: 'userGuildHQVerDB',
  userHqDB: 'userHqDB',
  userInfoBDB: 'userInfoBDB',
  userInfoDB: 'userInfoDB',
  userLeagueCheerDB: 'userLeagueCheerDB',
  userLeagueListDB: 'userLeagueListDB',
  userLeagueTeamDB: 'userLeagueTeamDB',
  userLeagueTeamMemberDB: 'userLeagueTeamMemberDB',
  userLoginDB: 'userLoginDB',
  userMatchModeDailyRankingDB: 'userMatchModeDailyRankingDB',
  userMatchModeDB: 'userMatchModeDB',
  userMatchModeHistoryDB: 'userMatchModeHistoryDB',
  userMatchModeSeasonRankingDB: 'userMatchModeSeasonRankingDB',
  userMemberDB: 'userMemberDB',
  userMissionDB: 'userMissionDB',
  userNameDB: 'userNameDB',
  userParentDB: 'userParentDB',
  userPCBangPlayTimeDB: 'userPCBangPlayTimeDB',
  userPCBangPregentDB: 'userPCBangPregentDB',
  userPersonalHQDB: 'userPersonalHQDB',
  userPetDB: 'userPetDB',
  userPieceDB: 'userPieceDB',
  userPopStoreDB: 'userPopStoreDB',
  userPracticeDB: 'userPracticeDB',
  userPracticeDB_Present: 'userPracticeDB_Present',
  userRankingDB: 'userRankingDB',
  userRankingDB_battle: 'userRankingDB_battle',
  userRankingDB_classgroup: 'userRankingDB_classgroup',
  userRankingDB_faction: 'userRankingDB_faction',
  userRecordBattleDB: 'userRecordBattleDB',
  userRecordGuildDB: 'userRecordGuildDB',
  userRelativeLevelDB: 'userRelativeLevelDB',
  userSpentGoldDB: 'userSpentGoldDB',
  userSpentGoldLogDB: 'userSpentGoldLogDB',
  userSpiritDB: 'userSpiritDB',
  userTimeCashDB: 'userTimeCashDB',
  userTimeGateDB: 'userTimeGateDB',
  userTitleDB: 'userTitleDB',
  userLanguageDB: 'userLanguageDB',
  userDiscordDB: 'userDiscordDB',
  userWalletDB: 'userWalletDB',
  userTransactionDB: 'userTransactionDB',
  userVIPDB: 'userVIPDB',
  userVIPReward: 'userVIPReward',
  WebNewsData: 'WebNewsData',
  WebNewsCategory: 'WebNewsCategory',
  WebPatchNotes: 'WebPatchNotes',
  WebShopData: 'WebShopData',
  WebShopCategory: 'WebShopCategory',
  WebPamentProvider: 'WebPamentProvider',
  WebPaymentChannel: 'WebPaymentChannel'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
