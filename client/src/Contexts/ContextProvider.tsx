import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Auth_T } from "../Pages/Auth/Auth_T";
import axios from "axios";

type StateContext_T = {
  user: Auth_T | null;
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: Dispatch<SetStateAction<Auth_T | null>>;
};

type ContextProviderProps = {
  children: ReactNode;
};

export const StateContext = createContext<StateContext_T>({
  user: null,
  token: null,
  setToken: () => {},
  setUser: () => null,
});

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<Auth_T | null>(null);
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
  );
  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };
  // Watch for token changes and fetch the user
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/v1/user`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach the token in the header
              },
            }
          );
          setUser(response.data.data); // Set the user data
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null); // If error occurs, clear the user data
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setToken,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
