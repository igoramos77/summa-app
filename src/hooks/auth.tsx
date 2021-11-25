import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
  logged: boolean;
  signIn(token?: string): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = AsyncStorage.getItem('@summa:logged');
    return !!isLogged;
  });

  const signIn = useCallback(() => {
    AsyncStorage.setItem('@summa:logged', 'true');
    setLogged(true);
  }, []);

  const signOut = useCallback(() => {
    //AsyncStorage.multiRemove(['@summa:logged']);
    AsyncStorage.removeItem('@summa:logged');
    setLogged(false);

  }, []);
  
  useEffect(() => {
    console.log(logged)
  }, [logged]);
  
  return (
    <AuthContext.Provider value={{logged, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
