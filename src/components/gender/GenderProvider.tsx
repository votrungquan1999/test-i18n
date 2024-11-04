"use client";

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

const GenderContext = createContext<"Male" | "Female" | "Other">("Male");
const GenderUpdateContext = createContext<Dispatch<SetStateAction<"Male" | "Female" | "Other">>>(() => {});

export default function GenderProvider({ children }: { children: React.ReactNode }) {
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");

  return (
    <GenderContext.Provider value={gender}>
      <GenderUpdateContext.Provider value={setGender}>{children}</GenderUpdateContext.Provider>
    </GenderContext.Provider>
  );
}

export function useGender() {
  return useContext(GenderContext);
}

export function useSetGender() {
  return useContext(GenderUpdateContext);
}
