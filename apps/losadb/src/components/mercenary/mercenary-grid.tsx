"use client";

import { MercenaryCard } from "@/components/mercenary/mercenary-card";
import getMercenaryData from "@losaweb/database/mercenary";
import { useMercenary } from "@/components/mercenary/mercenary-context";
import { useMemo, useState, useTransition } from "react";
import { Button } from "@losaweb/ui/components/button";

export function MercenaryGrid() {
  const [visible, setVisible] = useState(12);
  const [isPending, startTransition] = useTransition();
  const mercenary = getMercenaryData("en");

  const { attack, category, search, sort } = useMercenary();

  // Filter mercenary data
  const filteredMercenaries = useMemo(() => {
    return mercenary.filter((hero) => {
      const matchesSearch =
        search && search !== "all"
          ? hero.name
              .toLowerCase()
              .includes(decodeURIComponent(search).toLowerCase())
          : true;

      const matchesCategory =
        category && category !== "none"
          ? hero.type.toLowerCase() === category?.toLowerCase()
          : true;

      const matchesAttack =
        attack && attack !== "none"
          ? hero.AttackType.toLowerCase() === attack?.toLowerCase()
          : true;

      return matchesSearch && matchesCategory && matchesAttack;
    });
  }, [mercenary, attack, category, search]);

  // Sort the filtered data
  const sortedMercenaries = useMemo(() => {
    return filteredMercenaries.sort((a, b) => {
      switch (sort.toLowerCase()) {
        case "name.asc":
          return a.name.localeCompare(b.name);
        case "name.dsc":
          return b.name.localeCompare(a.name);
        case "attack.asc":
          return a.AttackType.localeCompare(b.AttackType);
        case "attack.dsc":
          return b.AttackType.localeCompare(a.AttackType);
        case "id.asc":
          return a.id - b.id;
        case "id.dsc":
          return b.id - a.id;
        default:
          return a.id - b.id;
      }
    });
  }, [filteredMercenaries, sort]);

  function handleLoadMore() {
    startTransition(() => {
      setVisible((prev) => prev + 12);
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedMercenaries.length > 0 ? (
        sortedMercenaries
          .slice(0, visible)
          .map((hero) => <MercenaryCard key={hero.id} hero={hero} />)
      ) : (
        <p>Heroes not found.</p>
      )}

      {/* load more button */}

      {sortedMercenaries.length > visible && (
        <Button
          onClick={handleLoadMore}
          disabled={isPending}
          className="col-span-3 bg-primary-foreground text-primary-background py-2 rounded-md"
        >
          {isPending ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}
