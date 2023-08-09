import { createContext, useState, useMemo } from "react";

const CurrentUserContext = createContext();

// eslint-disable-next-line react/prop-types
export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [idUser, setIdUser] = useState(
    JSON.parse(localStorage.getItem("idUser"))
  );

  const value = useMemo(
    () => ({
      user,
      setUser,
      idUser,
      setIdUser,
    }),
    [user]
  );
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserContext;
