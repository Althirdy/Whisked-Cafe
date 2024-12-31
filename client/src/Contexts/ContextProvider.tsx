import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Auth_T } from "../Pages/Auth/Auth_T";

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
  // const dummy_account: Auth_T = {
  //   fullname: "Jayson Derulo",
  //   phone: "09301420649",
  //   email: "althirdysanger@gmail.com",
  // };

  const [user, setUser] = useState<Auth_T | null>(null);
  const [token, _setToken] = useState<string | null>("233");

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

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
