import { useEffect } from "react";
import axios from "../axios/config";
import { userLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // defining public routes user and food partner 
  const publicRoutes = [
    "/user/login",
    "/user/register",
    "/food-partner/login",
    "/food-partner/register",
  ];

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        // fetching normal user first
        const resUser = await axios.get("/auth/user/");
        if (resUser.data?.success) {
          dispatch(userLogin(resUser.data.user));
          return;
        }
      } catch (err) {
        console.log("No normal user found:", err.message);
      }

      try {
        // fetching food partner if normal user not found
        const resFood = await axios.get("/auth/foodPartner/");
        if (resFood.data?.success) {
          dispatch(userLogin(resFood.data.foodPartner))
          return;
        }
      } catch (err) {
        console.log("No food partner found:", err.message);
      }

      // if neither found → check if already on a public route
      if (!publicRoutes.includes(location.pathname)) {
        if (location.pathname.startsWith("/food-partner")) {
          navigate("/food-partner/login");
        } else {
          navigate("/user/login");
        }
      }
    };

    fetchAuth();
  }, [dispatch, navigate, location]);
};

export default useAuth;
