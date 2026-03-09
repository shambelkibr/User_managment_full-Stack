import { Link, useLocation } from "react-router-dom";

const navLinkBase =
  "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200";

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `${navLinkBase} ${
      isActive
        ? "bg-teal-700 text-white shadow-sm"
        : "text-slate-700 hover:bg-teal-100 hover:text-teal-800"
    }`;
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/65 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Console</h1>
          <p className="text-xs text-slate-500">User management dashboard</p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200/80">
          <Link to="/" className={getLinkClass("/")}>
            Dashboard
          </Link>
          <Link to="/add-user" className={getLinkClass("/add-user")}>
            Create
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
