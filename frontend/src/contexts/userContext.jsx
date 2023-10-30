import { createContext, useState, useMemo } from "react";

const CurrentUserContext = createContext();

// eslint-disable-next-line react/prop-types
export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState(
    JSON.parse(localStorage.getItem("idUser"))
  );

  const value = useMemo(
    () => ({
      user,
      setUser,
      users,
      setUsers,
      idUser,
      setIdUser,
    }),
    [user, users]
  );
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserContext;
