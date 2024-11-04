"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const ScannedCountContext = createContext<number | undefined>(undefined);
const TotalCountContext = createContext<number | undefined>(undefined);
const SetScannedCountContext = createContext<((count: number) => void) | undefined>(undefined);
const SetTotalCountContext = createContext<((count: number) => void) | undefined>(undefined);

export function useScannedCount() {
  const context = useContext(ScannedCountContext);
  if (context === undefined) {
    throw new Error("useScannedCount must be used within an EmployeeCountProvider");
  }
  return context;
}

export function useTotalCount() {
  const context = useContext(TotalCountContext);
  if (context === undefined) {
    throw new Error("useTotalCount must be used within an EmployeeCountProvider");
  }
  return context;
}

export function useSetScannedCount() {
  const context = useContext(SetScannedCountContext);
  if (context === undefined) {
    throw new Error("useSetScannedCount must be used within an EmployeeCountProvider");
  }
  return context;
}

export function useSetTotalCount() {
  const context = useContext(SetTotalCountContext);
  if (context === undefined) {
    throw new Error("useSetTotalCount must be used within an EmployeeCountProvider");
  }
  return context;
}
interface EmployeeCountProviderProps {
  children: ReactNode;
}

export default function EmployeeCountProvider({ children }: EmployeeCountProviderProps) {
  const [scannedCount, setScannedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  return (
    <ScannedCountContext.Provider value={scannedCount}>
      <TotalCountContext.Provider value={totalCount}>
        <SetScannedCountContext.Provider value={setScannedCount}>
          <SetTotalCountContext.Provider value={setTotalCount}>{children}</SetTotalCountContext.Provider>
        </SetScannedCountContext.Provider>
      </TotalCountContext.Provider>
    </ScannedCountContext.Provider>
  );
}
