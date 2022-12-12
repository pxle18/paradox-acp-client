import React, { useState, createContext } from "react";

import { AuthUserModel } from "app/models/auth-user.model";

type Props = {
  children: React.ReactNode
}

interface AuthContextType {
  currentAuthUser: AuthUserModel | null;
  setAuthUser: (user: AuthUserModel | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [currentAuthUser, setAuthUser] = useState<AuthUserModel | null>(null);

  const authContextValue: AuthContextType = {
    currentAuthUser,
    setAuthUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext) as AuthContextType;
