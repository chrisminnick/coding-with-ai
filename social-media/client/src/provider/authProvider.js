import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser'))
  );

  // Function to set the authentication token
  const setAuth = useCallback(
    (newAuth) => {
      setCurrentUser(newAuth);
      console.log('currentUser', currentUser);
    },
    [currentUser]
  );

  useEffect(() => {
    if (currentUser) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + currentUser.token;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      console.log('currentUser', currentUser);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      currentUser,
      setAuth,
    }),
    [currentUser, setAuth]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
