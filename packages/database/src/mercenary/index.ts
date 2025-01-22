import { Mercenary } from "@losaweb/database/types/mercenary";
import * as cnMercenary from "@losaweb/database/mercenary/cn";
import * as enMercenary from "@losaweb/database/mercenary/en";
import * as idMercenary from "@losaweb/database/mercenary/id";
import * as krMercenary from "@losaweb/database/mercenary/kr";

const mercenaryData: Record<string, { mercenary: Mercenary[] }> = {
  cn: cnMercenary,
  en: enMercenary,
  id: idMercenary,
  kr: krMercenary,
};

export default function getMercenaryData(locale: string): Mercenary[] {
  // Default to 'en'!!
  const data = mercenaryData[locale] || mercenaryData["en"];
  return data?.mercenary ?? [];
}
