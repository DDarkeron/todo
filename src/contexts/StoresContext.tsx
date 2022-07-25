import React, { useContext } from "react";

const stores = {};

export type Stores = typeof stores;

const StoresContext = React.createContext<Stores | undefined>(undefined);

export const StoresProvider: React.FC = ({ children }) => (
  <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
);

export const useStores = (): Stores => {
  const stores = useContext(StoresContext);

  if (stores === undefined) throw new Error("Using of useStores should be under StoresProvider");

  return stores;
};
