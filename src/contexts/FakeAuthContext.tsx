import { createContext, useReducer, ReactNode } from "react";

type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: null | User;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

type State = {
  user: null | User;
  isAuthenticated: boolean;
};

const initialState: State = {
  user: null,
  isAuthenticated: false,
};

type Action = {
  type: string;
  payload?: object;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload as User,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      alert("Invalid credentials");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
