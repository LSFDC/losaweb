"use client";

import { IconBrowserContent } from "@/components/browser/icon/iconbrowser-content";

import { IconControls } from "@/components/browser/icon/iconbrowser-controls";
import { IconBrowserDetail } from "@/components/browser/icon/iconbrowser-detail";

export function IconBrowserWrapper() {
  return (
    <div className="grid grid-cols-10 gap-5">
      {/* Controls */}
      <div className="col-span-3">
        <IconControls />
      </div>
      {/* Content */}
      <div className="flex flex-col gap-2 col-span-4">
        <IconBrowserContent />
      </div>
      {/* Detail */}
      <div className="col-span-3">
        <IconBrowserDetail />
      </div>
    </div>
  );
}
