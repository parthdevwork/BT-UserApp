import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { initUser } from '../redux/user'
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticating: true,
  isAuthenticated: false,
  authenticate: (token) => { },
  logout: () => { },
});

function AuthContextProvider({ children }) {
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [authToken, setAuthToken] = useState();
  const dispatch = useDispatch()

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    dispatch(initUser({}))

    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticating,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    setAuthenticating,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;