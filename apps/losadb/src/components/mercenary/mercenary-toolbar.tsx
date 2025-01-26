"use client";

import { Search } from "lucide-react";
import { Input } from "@losaweb/ui/components/input";

import {
  DropdownAttackType,
  DropdownCategory,
  DropdownSort,
} from "@/components/mercenary/mercenary-dropdown";
import { useMercenary } from "./mercenary-context";

export function MercenaryToolbar() {
  const { setSearch } = useMercenary();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value ?? "all");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search heroes..."
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-4">
        <DropdownCategory />
        <DropdownAttackType />
        <DropdownSort />
      </div>
    </div>
  );
}
