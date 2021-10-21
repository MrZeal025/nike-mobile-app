import { createContext } from "react";

// create context
export const CredentialsContext = createContext({ storedCredentials: {}, setStoredCredentials: () => {}})