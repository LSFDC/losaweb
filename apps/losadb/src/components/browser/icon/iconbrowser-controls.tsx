"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@losaweb/ui/components/card";
import { Input } from "@losaweb/ui/components/input";
import { cn } from "@losaweb/ui/lib/utils";
// import { useState } from "react";
import { ScrollArea } from "@losaweb/ui/components/scroll-area";
import { useIconBrowser } from "@/components/browser/icon/iconbrowser-context";

export function IconControls() {
  // const [expandedImagesets, setExpandedImagesets] = useState<Set<string>>(
  //   new Set()
  // );
  const {
    setSearchTerm,
    selectedImageset,
    filteredImagesets,
    handleImageClick,
  } = useIconBrowser();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value ?? "all");
  };

  // const toggleImageset = (imagesetName: string) => {
  //   setExpandedImagesets((prev) => {
  //     const newSet = new Set(prev);
  //     if (newSet.has(imagesetName)) {
  //       newSet.delete(imagesetName);
  //     } else {
  //       newSet.add(imagesetName);
  //     }
  //     return newSet;
  //   });
  // };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Controls</CardTitle>
          <CardDescription>
            Search and select an icon to view details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 ">
          <Input
            placeholder="Search icons..."
            onChange={handleSearchChange}
            className=""
          />
          {/* List */}
          <ul className="space-y-2">
            <ScrollArea
              viewportRef={null}
              className="h-96 rounded-md border p-4"
            >
              {filteredImagesets
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((imageset, index) => (
                  <li key={index} className="">
                    <div
                      // className="font-semibold hover:cursor-pointer"
                      className={cn(
                        "cursor-pointer font-semibold hover:bg-gray-200 hover:text-red-500 p-2",
                        {
                          "bg-gray-200 text-red-500":
                            selectedImageset?.name === imageset?.name,
                        }
                      )}
                      onClick={() => {
                        // toggleImageset(imageset.name);
                        handleImageClick(imageset, null);
                      }}
                    >
                      {/* {expandedImagesets.has(imageset?.name) ? "[-]" : "[+]"}{" "} */}
                      {imageset?.name}
                    </div>
                    {/* {expandedImagesets.has(imageset.name) && (
                      <ul className="ml-4">
                        {imageset.images.map((image, idx) => (
                          <li
                            key={idx}
                            className={cn(
                              "cursor-pointer hover:bg-gray-200 p-1",
                              {
                                "bg-gray-200 text-red-500":
                                  selectedImageset?.name === imageset?.name &&
                                  selectedImage?.name === image?.name,
                              }
                            )}
                            onClick={() => handleImageClick(imageset, image)}
                          >
                            {image.name}
                          </li>
                        ))}
                      </ul>
                    )} */}
                  </li>
                ))}
            </ScrollArea>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
