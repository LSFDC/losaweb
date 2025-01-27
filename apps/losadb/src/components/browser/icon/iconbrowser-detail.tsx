"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@losaweb/ui/components/card";
import { useIconBrowser } from "@/components/browser/icon/iconbrowser-context";

export function IconBrowserDetail() {
  const { selectedImageset, selectedImage } = useIconBrowser();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Detail</CardTitle>
          <CardDescription>Select an image to view details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {selectedImage ? (
            <div className="">
              <p>
                <strong>Name :</strong> {selectedImage.name}
              </p>
              <p className="text-wrap">
                <strong>Used as:</strong> {selectedImageset?.name}#
                {selectedImage.name}
              </p>
              <p>
                <strong>Position :</strong> ({selectedImage.x},{" "}
                {selectedImage.y})
              </p>
              <p>
                <strong>Dimensions :</strong> {selectedImage.width}x
                {selectedImage.height}
              </p>
              {selectedImage.offsetX !== undefined && (
                <p>
                  <strong>OffsetX :</strong>{" "}
                  {isNaN(selectedImage.offsetX) ? 0 : selectedImage.offsetX}
                </p>
              )}
              {selectedImage.offsetY !== undefined && (
                <p>
                  <strong>OffsetY :</strong>{" "}
                  {isNaN(selectedImage.offsetY) ? 0 : selectedImage.offsetY}
                </p>
              )}
            </div>
          ) : (
            <p className="">Select an image to view details.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
