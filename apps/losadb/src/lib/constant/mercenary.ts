export const categories = [
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "premium",
    label: "Premium",
  },
  {
    value: "rare",
    label: "Rare",
  },
  {
    value: "unique",
    label: "Unique",
  },
  {
    value: "reform",
    label: "Reform",
  },
  {
    value: "idol",
    label: "Idol",
  },
];

export const attackType = [
  {
    value: "melee",
    label: "Melee",
  },
  {
    value: "range",
    label: "Range",
  },
  {
    value: "magic",
    label: "Magic",
  },
  {
    value: "special",
    label: "Special",
  },
  {
    value: "bomb",
    label: "Bomb",
  },
];

export const sortList = [
  {
    value: "id.asc",
    label: "ID ASC",
  },
  {
    value: "id.dsc",
    label: "ID DSC",
  },
  {
    value: "name.asc",
    label: "Name ASC",
  },
  {
    value: "name.dsc",
    label: "Name DSC",
  },
  {
    value: "attack.asc",
    label: "Attack ASC",
  },
  {
    value: "attack.dsc",
    label: "Attack DSC",
  },
];

export const perPageList = Array.from({ length: 50 }, (_, i) => {
  const value = 20 * (i + 1);
  return { value: value.toString(), label: value.toString() };
});
