import React from "react";
import { QueryClientProvider } from "react-query";
import { ServicesProvider } from "../contexts/ServicesContext";
import { StoresProvider } from "../contexts/StoresContext";
import { queryClient } from "../services/settings/queryClient";

const Providers: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ServicesProvider>
      <StoresProvider>{children}</StoresProvider>
    </ServicesProvider>
  </QueryClientProvider>
);

export default Providers;
