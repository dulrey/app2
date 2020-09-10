import { useContext, createContext } from "react";

export const AppContext = createContext<{
    isAuthenticated: boolean;
    userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  }>({
    isAuthenticated: false,
    userHasAuthenticated: () => null
  });

export function useAppContext() {
  return useContext(AppContext);
}