"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@losaweb/ui/components/card";
import { useIconBrowser } from "@/components/browser/icon/iconbrowser-context";
import Image from "next/image";
import { cn } from "@losaweb/ui/lib/utils";
// import { useEffect } from "react";

export function IconBrowserContent() {
  const {
    selectedImageset,
    selectedImage,
    handleImageLoad,
    imageDimensions,
    handleImageClick,
  } = useIconBrowser();

  // Calculate scaling ratio
  const scaleX = imageDimensions.displayedWidth / imageDimensions.naturalWidth;
  const scaleY =
    imageDimensions.displayedHeight / imageDimensions.naturalHeight;

  // //handle click outside of content
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement; // Cast event target to HTMLElement type
  //     if (target.closest(".icon-browser-content")) {
  //       return;
  //     }
  //     handleImageClick(null, null);
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [handleImageClick]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>Select an icon to view images</CardDescription>
        </CardHeader>
        <CardContent className="">
          {selectedImageset && (
            <div className="relative">
              <Image
                src={`/images/icon/${selectedImageset?.name}/${selectedImageset?.name}.png`}
                alt={selectedImageset?.name}
                width={selectedImageset.width}
                height={selectedImageset.height}
                onLoad={handleImageLoad}
                className="relative"
              />

              {selectedImageset.images.map((image, idx) => {
                return (
                  <div
                    key={idx}
                    className={cn(
                      "absolute hover:border-2 border-red-500 cursor-pointer",
                      {
                        "border-2 border-red-500":
                          selectedImage?.name === image.name,
                      }
                    )}
                    onClick={() => handleImageClick(selectedImageset, image)}
                    style={{
                      left: `${(image.x ?? 0) * scaleX}px`,
                      top: `${(image.y ?? 0) * scaleY}px`,
                      width: `${(image.width ?? 0) * scaleX}px`,
                      height: `${(image.height ?? 0) * scaleY}px`,
                    }}
                  />
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
