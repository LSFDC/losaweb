"use client";

import { ImageAttr, Imageset } from "@/lib/losatools/xmlparser";
import React, { useContext, createContext, useState } from "react";

interface IconBrowserContextType {
  selectedImage: ImageAttr | null;
  setSelectedImage: (image: ImageAttr | null) => void;
  selectedImageset: Imageset | null;
  setSelectedImageset: (imageset: Imageset | null) => void;
  expandedImagesets: Set<string>;
  setExpandedImagesets: (imagesets: Set<string>) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  imageDimensions: {
    naturalWidth: number;
    naturalHeight: number;
    displayedWidth: number;
    displayedHeight: number;
  };
  handleImageClick: (
    imageset: Imageset | null,
    image: ImageAttr | null
  ) => Promise<void>;
  handleImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  toggleImageset: (imagesetName: string) => void;
  filteredImagesets: Imageset[];
}

const IconBrowserContext = createContext<IconBrowserContextType | undefined>(
  undefined
);

export const useIconBrowser = () => {
  const context = useContext(IconBrowserContext);
  if (!context) {
    throw new Error("useMercenary must be used within a MercenaryProvider");
  }
  return context;
};

export function IconBrowserProvider({
  children,
  Imageset,
}: {
  children: React.ReactNode;
  Imageset: Imageset[];
}) {
  const [selectedImage, setSelectedImage] = useState<ImageAttr | null>(null);
  const [selectedImageset, setSelectedImageset] = useState<Imageset | null>(
    null
  );
  const [expandedImagesets, setExpandedImagesets] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [imageDimensions, setImageDimensions] = useState({
    naturalWidth: 1,
    naturalHeight: 1,
    displayedWidth: 1,
    displayedHeight: 1,
  });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions({
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayedWidth: img.width,
      displayedHeight: img.height,
    });
  };

  const toggleImageset = (imagesetName: string) => {
    setExpandedImagesets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imagesetName)) {
        newSet.delete(imagesetName);
      } else {
        newSet.add(imagesetName);
      }
      return newSet;
    });
  };

  const filteredImagesets = Imageset.filter((imageset) =>
    imageset?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = async (
    imageset: Imageset | null,
    image: ImageAttr | null
  ) => {
    setSelectedImageset(imageset);
    setSelectedImage(image!);
  };

  return (
    <IconBrowserContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        selectedImageset,
        setSelectedImageset,
        expandedImagesets,
        setExpandedImagesets,
        toggleImageset,
        searchTerm,
        setSearchTerm,
        imageDimensions,
        handleImageLoad,
        filteredImagesets,
        handleImageClick,
      }}
    >
      {children}
    </IconBrowserContext.Provider>
  );
}
