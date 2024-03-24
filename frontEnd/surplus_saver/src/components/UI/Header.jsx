import Logo from "./Logo";

const Header = () => {
  return (
    <header className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between">
      <Logo />
      Header
    </header>
  );
};

export default Header;
