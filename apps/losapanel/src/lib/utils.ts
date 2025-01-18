export const censorEmail = (email: string): string => {
  if (!email || !email.includes("@")) return email;

  const [username, domain] = email.split("@");
  const visiblePart = username?.slice(0, 3);
  const censoredPart = "*".repeat(username!.length - 3);
  return `${visiblePart}${censoredPart}@${domain}`;
};

export const currencyFormatter = (value: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export function getPriceByCurrency(
  value: number,
  currency: string,
  fee: number
): number {
  switch (currency) {
    case "IDR":
      return (value / 100) * 14000 + fee;
    default:
      return value / 100;
  }
}

export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
