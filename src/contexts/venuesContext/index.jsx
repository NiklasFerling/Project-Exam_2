import { useState, createContext } from "react";

export const VenuesContext = createContext({
  venues: [],
  setVenues: () => {},
});

export function VenuesContextProvider({ children }) {
  const [venues, setVenues] = useState([]);
  return (
    <VenuesContext.Provider value={{ venues, setVenues }}>
      {children}
    </VenuesContext.Provider>
  );
}
