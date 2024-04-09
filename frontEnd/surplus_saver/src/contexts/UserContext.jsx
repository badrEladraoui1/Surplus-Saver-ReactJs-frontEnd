/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext({
  userUserName: "",
  setUserUserName: () => {},
  logout: () => {},
});

function UserContextProvider({ children }) {
  const [userUserName, setUserUserName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken((prevToken) => localStorage.getItem("token") || prevToken);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (token) {
      const { sub } = jwtDecode(token.replace("Bearer ", ""));
      if (sub) setUserUserName(sub);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUserUserName("");
    setToken(null);
  };

  const userCtx = {
    userUserName: userUserName,
    setUserUserName: setUserUserName,
    logout: logout,
  };

  return (
    <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
