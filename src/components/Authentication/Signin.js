import React from "react";
import sideImage from "../../assets/carouselImages/carouselThird.jpg";
import {useNavigate} from "react-router-dom"
const Signin = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/administrationSignup");
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={sideImage} alt="" />
      </div>
      <div class="flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900 ">
        <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="text-center 2xl:mb-10 mb-4">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in</h4>
            <div className="text-slate-500 text-base">
              Sign in to your account to start using our platform
            </div>
          </div>
          <form class="mt-8 space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="contact@kamtjatka.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary w-full">
              Login to your account
            </button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Not registered?{" "}
              <button class="text-primary-700 hover:underline dark:text-primary-500"  onClick={handleClick} type="submit">
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
