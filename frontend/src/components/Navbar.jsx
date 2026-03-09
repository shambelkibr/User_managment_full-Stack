import { Link, useLocation } from "react-router-dom";

const navLinkBase =
  "rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200";

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `${navLinkBase} ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-slate-700 hover:bg-emerald-100 hover:text-emerald-800"
    }`;
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900">User Management</h1>
        <div className="flex items-center gap-2">
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/add-user" className={getLinkClass("/add-user")}>
            Add User
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
