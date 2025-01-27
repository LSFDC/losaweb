import { IconBrowserProvider } from "@/components/browser/icon/iconbrowser-context";

import { IconBrowserWrapper } from "@/components/browser/iconbrowser-wrapper";
import UIXMLParser from "@/lib/losatools/xmlparser";
import { Button } from "@losaweb/ui/components/button";
import { existsSync, readFileSync } from "fs";
import Link from "next/link";
import path from "path";
import sharp from "sharp";
import { DownloadIcon } from "lucide-react";

export default async function IconBrowserPage() {
  const xmlpath = path.join(
    process.cwd(),
    "src",
    "assets",
    "xml",
    "uiimageset.xml"
  );
  const xmlContent = readFileSync(xmlpath, "utf-8");
  if (!xmlContent) {
    throw new Error("XML file not found");
  }

  const xmlParser = new UIXMLParser();
  const parsedData = xmlParser.parse(xmlContent);

  //check if there is no image of imageset on folder assets/icon
  const isIconExist = parsedData.some((imageset) => {
    const pngFileName = imageset.name.replace(".dds", ".png");
    const dirPath = path.join(
      process.cwd(),
      "public",
      "images",
      "icon",
      imageset.name
    );
    const filePath = path.join(dirPath, pngFileName);

    // Check if both directory and file exist
    return existsSync(dirPath) || existsSync(filePath);
  });

  //force update image width and height using sharp
  const updatedParsedData = await Promise.all(
    parsedData.map(async (imageset) => {
      const dirPath = path.join(
        process.cwd(),
        "public",
        "images",
        "icon",
        imageset.name,
        `${imageset.name}.png`
      );

      if (existsSync(dirPath)) {
        try {
          const metadata = await sharp(dirPath).metadata();
          return {
            ...imageset,
            width: metadata.width!,
            height: metadata.height!,
          };
        } catch (err) {
          console.log(err);
          return imageset;
        }
      }
      return imageset;
    })
  );

  if (!isIconExist) {
    return (
      <>
        <div className="flex flex-col items-center justify-center border border-red-900 p-10 rounded-md gap-5">
          <h1 className="text-3xl">Icon Browser</h1>
          <p>Failed to get icon from imageset.xml</p>
          <p>
            You need to setup with losatools or you can just download our
            existing icon in the link below
          </p>
          <Button
            variant="expandIcon"
            Icon={DownloadIcon}
            iconPlacement="right"
            asChild
          >
            <Link
              href="https://drive.google.com/file/d/1PF9tnmb2NjudxtLUagJYTAdh06q1OJFb/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Icon
            </Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <IconBrowserProvider Imageset={updatedParsedData}>
      <IconBrowserWrapper />
    </IconBrowserProvider>
  );
}
