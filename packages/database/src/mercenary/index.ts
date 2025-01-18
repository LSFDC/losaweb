import { Mercenary } from "@/types/mercenary";
import * as cnMercenary from "./cn";
import * as enMercenary from "./en";
import * as idMercenary from "./id";
import * as krMercenary from "./kr";

const mercenaryData: Record<string, { mercenary: Mercenary[] }> = {
  cn: cnMercenary,
  en: enMercenary,
  id: idMercenary,
  kr: krMercenary,
};

export default function getMercenaryData(locale: string): Mercenary[] {
  // Default to 'en'!!
  const data = mercenaryData[locale] || mercenaryData["en"];
  return data.mercenary;
}
