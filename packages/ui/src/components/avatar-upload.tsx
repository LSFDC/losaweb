"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@losaweb/ui/components/avatar";
import { Button } from "@losaweb/ui/components/button";
import { Input } from "@losaweb/ui/components/input";
import { PencilIcon, TrashIcon, User2Icon } from "lucide-react";
import { toBase64 } from "@losaweb/ui/lib/utils";

type AvatarUploadProps = {
  value?: string;
  onChange?: (value?: string) => void;
  onError?: (error: string) => void; // Optional error callback
};

export function AvatarUpload({ value, onChange, onError }: AvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return "Invalid file type. Please upload a JPEG, PNG, or GIF image.";
    }

    if (file.size > maxSizeInBytes) {
      return "File size exceeds 5MB. Please upload a smaller image.";
    }

    return null; // No errors
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const error = validateFile(file!);
      if (error) {
        onError?.(error);
        return;
      }

      const base64 = (await toBase64(file!)) as string;
      onChange?.(base64);
    }
  };

  return (
    <div className="relative w-40 h-40 group">
      <Avatar className="w-full h-full rounded-md">
        <AvatarImage src={value} className="object-cover" />
        <AvatarFallback className="bg-secondary rounded-md">
          <User2Icon className="w-16 h-16" />
        </AvatarFallback>
      </Avatar>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full p-1 bg-secondary-foreground/90 text-destructive hover:bg-destructive hover:text-destructive-foreground absolute top-0 right-0 invisible group-hover:visible transition-all duration-300 ease-in-out"
        onClick={(e) => {
          e.preventDefault();
          onChange?.("default.jpg");
        }}
      >
        <TrashIcon className="w-4 h-4 " />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full p-1 bg-secondary-foreground/90 group-hover:bg-secondary-foreground absolute bottom-0 right-0 invisible group-hover:visible transition-all duration-300 ease-in-out"
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
      >
        <PencilIcon className="w-4 h-4 text-black" />
      </Button>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/*"
      />
    </div>
  );
}
