import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-azul-950 relative font-sans  pb-2 border-b border-b-blue-950 text-white max-lg:pb-3 ">
      <div className="flex px-4 sm:px-8 md:px-16 lg:container mx-auto justify-between gap-4 items-center flex-wrap max-md:gap-y-8 max-lg:gap-1">
        <Logo />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
