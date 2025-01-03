"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@losaweb/ui/components/avatar";
import { Button } from "@losaweb/ui/components/button";
import { Input } from "@losaweb/ui/components/input";
import { PencilIcon, User2Icon } from "lucide-react";
import React from "react";
import { toBase64 } from "@losaweb/ui/lib/utils";

type AvatarUploadProps = {
  value?: string;
  onChange?: (value?: string) => void;
};

export function AvatarUpload({ value, onChange }: AvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = (await toBase64(file!)) as string;
      onChange?.(base64);
    }
  };

  return (
    <div className="relative w-40 h-40">
      <Avatar className="w-full h-full rounded-md">
        <AvatarImage src={value} className="object-cover" />
        <AvatarFallback className="bg-secondary rounded-md">
          <User2Icon className="w-16 h-16" />
        </AvatarFallback>
      </Avatar>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full p-1 bg-secondary-foreground/90 hover:bg-secondary-foreground absolute bottom-0 right-0"
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
