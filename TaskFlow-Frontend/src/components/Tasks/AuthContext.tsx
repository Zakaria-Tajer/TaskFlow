import React, { createContext, useContext } from "react";

export type AuthData = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

type AuthContextType = {
  authData: AuthData | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
  authData: AuthData;
};

export const AuthProvider = ({ children, authData }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ authData }}>{children}</AuthContext.Provider>
  );
};
