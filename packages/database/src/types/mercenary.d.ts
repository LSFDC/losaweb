export interface Mercenary {
  id: number;
  type: string;
  AttackType: string;
  name: string;
  thumb_male: string;
  thumb_female: string;
  image_male: string;
  image_female: string;
  video: string;
  description: string;
  skills: MercenarySkills[];
}

interface MercenarySkills {
  id: number;
  name: string;
  description: string;
  icon: string;
  type: string;
}
