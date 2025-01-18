export const languages = [
  { label: "English", value: "en" },
  { label: "Thailand", value: "th" },
  { label: "Indonesia", value: "id" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

export const allowedCharsRegex = /^[a-zA-Z0-9]+$/;

type Language = (typeof languages)[number]["value"];

export const LangVALUE: [Language, ...Language[]] = [
  languages[0]?.value ?? "",

  ...languages.slice(1).map((p) => p.value),
];

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const topLeveldomain = [
  "@gmail.com",
  "@outlook.com",
  "@yahoo.com",
  "@hotmail.com",
  "@icloud.com",
  "@aol.com",
  "@mail.com",
  "@live.com",
  "@msn.com",
  "@protonmail.com",
];

export const amountList = [
  {
    id: 1,
    label: "100",
    value: 100,
  },
  {
    id: 2,
    label: "200",
    value: 200,
  },
  {
    id: 3,
    label: "500",
    value: 500,
  },
  {
    id: 4,
    label: "1000",
    value: 1000,
  },
  {
    id: 5,
    label: "1500",
    value: 1500,
  },
  {
    id: 6,
    label: "2000",
    value: 2000,
  },
  {
    id: 7,
    label: "3000",
    value: 3000,
  },
  {
    id: 8,
    label: "5000",
    value: 5000,
  },
  {
    id: 9,
    label: "10000",
    value: 10000,
  },
  {
    id: 10,
    label: "20000",
    value: 20000,
  },
  {
    id: 11,
    label: "30000",
    value: 30000,
  },
  {
    id: 12,
    label: "35000",
    value: 35000,
  },
  {
    id: 13,
    label: "50000",
    value: 50000,
  },
];
