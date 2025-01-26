"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@losaweb/ui/lib/utils";
import { Button } from "@losaweb/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@losaweb/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@losaweb/ui/components/popover";

import { useState } from "react";
import { attackType, categories, sortList } from "@/lib/constant/mercenary";
import { useMercenary } from "@/components/mercenary/mercenary-context";

export function DropdownCategory() {
  const [open, setOpen] = useState(false);

  const { category, setCategory } = useMercenary();

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            aria-label="Select a category"
            className="w-[200px] justify-between bg-blue-700 text-white hover:bg-blue-600"
          >
            {category !== "none"
              ? categories.find((framework) => framework.value === category)
                  ?.label
              : "Category"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categories.map((ctg) => (
                  <CommandItem
                    key={ctg.value}
                    value={ctg.value}
                    onSelect={(currentValue) => {
                      setCategory(
                        category === currentValue ? "none" : ctg.value
                      );
                      setOpen(false);
                    }}
                  >
                    {ctg.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        category === ctg.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function DropdownAttackType() {
  const [open, setOpen] = useState(false);

  const { attack, setAttack } = useMercenary();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          aria-label="Select a attack type"
          className="w-[200px] justify-between bg-blue-700 text-white hover:bg-blue-600"
        >
          {attack !== "none"
            ? attackType.find((framework) => framework.value === attack)?.label
            : "Attack Type"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Type..." />
          <CommandList>
            <CommandEmpty>No attack type found.</CommandEmpty>
            <CommandGroup>
              {attackType.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    setAttack(attack === currentValue ? "none" : type.value);
                    setOpen(false);
                  }}
                >
                  {type.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      attack === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function DropdownSort() {
  const [open, setOpen] = useState(false);

  const { sort, setSort } = useMercenary();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          aria-label="Select a sort"
          className="w-[200px] justify-between bg-blue-700 text-white hover:bg-blue-600"
        >
          {sort !== "none"
            ? sortList.find((list) => list.value === sort)?.label
            : "Sort By"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No sort found.</CommandEmpty>
            <CommandGroup>
              {sortList.map((list) => (
                <CommandItem
                  key={list.value}
                  value={list.value}
                  onSelect={(currentValue) => {
                    setSort(sort === currentValue ? "none" : list.value);

                    setOpen(false);
                  }}
                >
                  {list.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      sort === list.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
