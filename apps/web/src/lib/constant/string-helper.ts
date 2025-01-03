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
