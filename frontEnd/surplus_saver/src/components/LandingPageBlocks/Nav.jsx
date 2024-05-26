import { NavLink } from "react-router-dom";
import ThemeToggler from "../UI/ThemeToggler";

const NavLinks = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-pink" : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/sign_up"
        className={({ isActive }) => (isActive ? "text-green" : undefined)}
      >
        Sign Up
      </NavLink>
      <NavLink
        to="/sign_in"
        className={({ isActive }) => (isActive ? "text-orange" : undefined)}
      >
        Sign In
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "text-yellow" : undefined)}
      >
        About
      </NavLink>
      <ThemeToggler />
    </>
  );
};

import { useState } from "react";
import Button from "../UI/Button";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="w-1/3 flex justify-end">
        <div></div>
        <div className="hidden w-full justify-between md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <Button onClick={toggleNavBar}>{isOpen ? <X /> : <Menu />}</Button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center ">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Nav;
