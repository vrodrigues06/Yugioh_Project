import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src="/Logo.svg" alt="Logo" className="min-w-20 mt-2" />
      </Link>
    </div>
  );
};

export default Logo;
