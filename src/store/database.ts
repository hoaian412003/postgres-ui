import { ColumnMetadata } from "@/types/column";
import { create } from "zustand";


type State = {
  database: string;
  accessableObject: Record<string, Record<string, ColumnMetadata[]>>;
  setAccessableObject: (value: any) => void;
  setDatabase: (value: string) => void;
}

export const useDatabaseStore = create<State>((set) => ({
  database: "",
  accessableObject: {},
  setDatabase: (value: string) => set({ database: value }),
  setAccessableObject: (value: any) => set({ accessableObject: value })
}))
