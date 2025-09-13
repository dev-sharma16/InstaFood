import { NavLink } from "react-router-dom";
import { Home, User, Bookmark } from "lucide-react"; 

function Navbar() {

  const baseStyle = "flex flex-col items-center text-sm transition-colors duration-200";
  const activeStyle = "text-white dark:text-white";
  const inactiveStyle = "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-xs shadow-lg z-1 rounded-t-xl">
      <div className="flex justify-center gap-16 md:gap-35 items-center h-15 pt-1">
        {/* Feed (Home) */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Home className="h-5 w-5 mb-1" />
          <span>Feed</span>
        </NavLink>

        {/* Saved Video Section */}
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Bookmark className="h-5 w-5 mb-1" />
          <span>Saved</span>
        </NavLink>

        {/* Profile (dummy for now) */}
        <NavLink
          to="/user"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <User className="h-5 w-5 mb-1" />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
