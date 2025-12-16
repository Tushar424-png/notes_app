import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium
     transition-colors duration-200
     ${isActive
       ? "bg-blue-500 text-white"
       : "text-black hover:bg-blue-500 hover:text-white"}`;

  return (
    <aside className="w-26 h-full min-h-screen bg-slate-100 rounded-br-2xl shadow-md">
      <nav className="flex flex-col items-center gap-4 p-4 mt-4">
        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>

        <NavLink to="/important" className={linkClasses}>
          Important
        </NavLink>

        <NavLink to="/Archive" className={linkClasses}>
          Archieve
        </NavLink>
      </nav>
    </aside>
  );
};
