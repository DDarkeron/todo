import React, { useContext } from "react";
import { container } from "tsyringe";
import TodosService from "../services/todos/TodosService";

const services = {
  todosService: container.resolve(TodosService),
};

export type Services = typeof services;

const ServicesContext = React.createContext<Services | undefined>(undefined);

export const ServicesProvider: React.FC = ({ children }) => (
  <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
);

export const useServices = (): Services => {
  const services = useContext(ServicesContext);

  if (services === undefined) throw new Error("Using of useServices should be under ServicesProvider");

  return services;
};
