import { Card } from "@losaweb/ui/components/card";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function AuthCardWrapper({
  title,
  description,
  footerText,
  footerLink,
  footerLabel,
  children,
}: {
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerLabel: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src={logo}
            width={500}
            height={500}
            alt="Losa Logo"
            className="w-32 h-2w-32 text-primary mb-5 rounded-md"
          />
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>

        {children}

        <div className="flex justify-center items-center mt-8  gap-1">
          <span className="text-muted-foreground">{footerText}</span>
          <Link href={footerLink} className="text-primary hover:underline">
            {footerLabel}
          </Link>
        </div>
      </Card>
    </>
  );
}
