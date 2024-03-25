import logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    // <div className="size-36">
    //   <img src={logo} alt="logo" />
    // </div>
    <NavLink to="/" className="inline-block">
      <motion.img
        alt="Blog Logo"
        src={logo}
        className="block w-[125px]"
        width="75"
        height="50"
        variants={logo}
        animate="rotate"
        layout="position"
      />
    </NavLink>
  );
};

export default Logo;
