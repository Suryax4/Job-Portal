import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const auth = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    navigate("/");
  }, [auth]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Cuvette JOB Portal </span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          {auth ? (
            <Link to="/" onClick={logout}>
              <li className=" text-slate-700 hover:underline">
                {" "}
                Logout ({user})
              </li>
            </Link>
          ) : (
            <Link to="/signin">
              <li className=" text-slate-700 hover:underline"> Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
