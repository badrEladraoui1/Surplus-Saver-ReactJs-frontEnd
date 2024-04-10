/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext({
  userUserName: "",
  userId: "",
  userRole: "",
  userPhone: "",
  userAddress: "",
  setUserUserName: () => {},
  logout: () => {},
});

function UserContextProvider({ children }) {
  const [userUserName, setUserUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
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
      const { sub, id, role, phone, address } = jwtDecode(
        token.replace("Bearer ", "")
      );
      if (sub) setUserUserName(sub);
      if (id) setUserId(id);
      if (role) setUserRole(role);
      if (phone) setUserPhone(phone);
      if (address) setUserAddress(address);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUserUserName("");
    setUserId("");
    setUserRole("");
    setToken(null);
  };

  const userCtx = {
    userUserName: userUserName,
    userId: userId,
    userRole: userRole,
    userPhone: userPhone,
    userAddress: userAddress,
    setUserUserName: setUserUserName,
    logout: logout,
  };

  return (
    <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
