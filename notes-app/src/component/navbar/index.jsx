import logo from "../../assests/logo.avif";

export const Navbar = () => {
  return (
    <header className="flex items-center gap-4 bg-slate-50 px-4 py-2 shadow-sm">
      <div className="h-10 w-10">
        <img
          src={logo}
          alt="logo"
          className="h-full w-full object-contain"
        />
      </div>

      <h1 className="text-xl font-semibold text-gray-800">
        Notes App
      </h1>
    </header>
  );
};
