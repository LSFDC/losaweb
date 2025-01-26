"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react";

interface MercenaryContextType {
  search: string;
  setSearch: (search: string) => void;
  category: string;
  setCategory: (category: string) => void;
  attack: string;
  setAttack: (attack: string) => void;
  sort: string;
  setSort: (sort: string) => void;
}

const MercenaryContext = createContext<MercenaryContextType | undefined>(
  undefined
);

interface MercenaryProviderProps {
  children: ReactNode;
}

export const MercenaryProvider = ({ children }: MercenaryProviderProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const search = searchParams.get("search") || "all";
  const category = searchParams.get("category") || "none";
  const attack = searchParams.get("attack") || "none";
  const sort = searchParams.get("sort") || "none";

  const setSearch = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", search);
      router.push(`${pathName}?${params.toString()}`);
    },
    [searchParams, pathName, router]
  );

  const setCategory = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", category);
      router.push(`${pathName}?${params.toString()}`);
    },
    [searchParams, pathName, router]
  );

  const setAttack = useCallback(
    (attack: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("attack", attack);
      router.push(`${pathName}?${params.toString()}`);
    },
    [searchParams, pathName, router]
  );

  const setSort = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", sort);
      router.push(`${pathName}?${params.toString()}`);
    },
    [searchParams, pathName, router]
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    params.set("category", category);
    params.set("attack", attack);
    params.set("sort", sort);
    router.push(`${pathName}?${params.toString()}`);
  }, [search, category, attack, sort, pathName, router, searchParams]);

  const value = useMemo(
    () => ({
      search,
      category,
      attack,
      sort,
      setSearch,
      setCategory,
      setAttack,
      setSort,
    }),
    [search, category, attack, sort, setSearch, setCategory, setAttack, setSort]
  );

  return (
    <MercenaryContext.Provider value={value}>
      {children}
    </MercenaryContext.Provider>
  );
};

export const useMercenary = () => {
  const context = useContext(MercenaryContext);
  if (!context) {
    throw new Error("useMercenary must be used within a MercenaryProvider");
  }
  return context;
};
