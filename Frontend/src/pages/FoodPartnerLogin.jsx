import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/config";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/authSlice";

function FoodPartnerLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async(data) => {
    console.log("Food Partner Register:", data); // Replace with API call
    const res = await axios.post("/auth/foodPartner/login", data)
    if(!res){
      alert("Error in register, try again later");
    }
    dispatch(userLogin(res.data.food_partner))
    navigate("/")
    // console.log(res.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Food Partner Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("usernameOrEmail", {
              required: "Username or Email is required",
            })}
            placeholder="Username or Email"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
          />
          {errors.usernameOrEmail && (
            <p className="text-red-500 text-sm">
              {errors.usernameOrEmail.message}
            </p>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          New partner?{" "}
          <Link to="/food-partner/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FoodPartnerLogin;
