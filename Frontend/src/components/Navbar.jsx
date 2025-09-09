import { NavLink } from "react-router-dom";
import { Home, User } from "lucide-react"; 

function Navbar() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const isLogined = useSelector((state) => state.auth?.isAuthenticated);
  // const userRole = useSelector((state) => state.auth?.user?.role);

  // const handleLogout = async () => {
  //   try {
  //     await axios.get(`/auth/${userRole}/logout`);
  //     dispatch(userLogout());
  //     navigate("/");
  //   } catch (err) {
  //     console.error("Logout failed", err);
  //   }
  // };

  const baseStyle =
    "flex flex-col items-center text-sm transition-colors duration-200";
  const activeStyle = "text-blue-600 dark:text-blue-400";
  const inactiveStyle =
    "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200";

  return (
    <nav className="fixed bottom-0 left-0 right-0 
      bg-gray-100/70 dark:bg-gray-900/70 
      backdrop-blur-md 
      border-t border-gray-200/50 dark:border-gray-700/50 
      shadow-lg z-1">
      <div className="flex justify-center gap-42 items-center h-14">
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

        {/* Profile (dummy for now) */}
        <NavLink
          to="/allForms"
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
