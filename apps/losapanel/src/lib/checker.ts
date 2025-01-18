import { distance } from "fastest-levenshtein";
import { engLishBadwors, IndoBadwords, notAllowedFields } from "@/lib/badword";

export const checkUsername = (username: string): boolean => {
  const threshold = 2;

  const isForbidden = notAllowedFields.some((forbiddenName) => {
    const similarity = distance(forbiddenName, username.toLowerCase());
    return (
      similarity <= threshold || username.toLowerCase().includes(forbiddenName)
    );
  });

  return !isForbidden;
};

export const checkNickname = (nickname: string): boolean => {
  const threshold = 2;

  const lowerNickname = nickname.toLowerCase();

  const isForbidden = engLishBadwors.some((forbiddenName) => {
    const similarity = distance(forbiddenName, lowerNickname);
    return similarity <= threshold || lowerNickname.includes(forbiddenName);
  });

  const isForbidden2 = IndoBadwords.some((forbiddenName) => {
    const similarity = distance(forbiddenName, lowerNickname);
    return similarity <= threshold || lowerNickname.includes(forbiddenName);
  });

  const isForbidden3 = notAllowedFields.some((forbiddenName) => {
    const similarity = distance(forbiddenName, lowerNickname);
    return similarity <= threshold || lowerNickname.includes(forbiddenName);
  });

  console.log({
    isForbidden,
    isForbidden2,
    isForbidden3,
    nickname,
  });

  return !(isForbidden || isForbidden2 || isForbidden3);
};
