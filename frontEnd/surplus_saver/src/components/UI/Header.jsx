import Logo from "./Logo";
import Nav from "../LandingPageBlocks/Nav";

const Header = () => {
  return (
    <header className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
