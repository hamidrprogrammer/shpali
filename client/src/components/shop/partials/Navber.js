import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // ایمپورت framer-motion
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  const mobileMenuVariants = {
    open: { x: 0, transition: { stiffness: 100, damping: 20 } },
    closed: { x: "100%", transition: { stiffness: 100, damping: 20 } },
  };

  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-[var(--color-card-background)] text-[var(--color-text)] dark:bg-[var(--color-card-background)] dark:text-[var(--color-text)] transition-colors duration-300">
        <div className="m-4 md:mx-12 md:my-6 flex justify-between items-center">
          {/* Mobile Menu Icon and Mobile Logo */}
          <div className="flex items-center lg:hidden">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="w-8 h-8 cursor-pointer text-[var(--color-text)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => history.push("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="font-bold uppercase text-[var(--color-text)] text-2xl cursor-pointer px-2"
            >
              Hayroo
            </span>
          </div>

          {/* Desktop Menu Links (Left Aligned) */}
          <div className="hidden lg:flex items-center space-x-4">
            <span
              className="hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-3 rounded-lg font-semibold tracking-wider cursor-pointer text-lg"
              onClick={(e) => history.push("/")}
            >
              فروشگاه
            </span>
            <span
              className="hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-3 rounded-lg font-semibold tracking-wider cursor-pointer text-lg"
              onClick={(e) => history.push("/blog")}
            >
              وبلاگ
            </span>
            <span
              className="hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-3 rounded-lg font-semibold tracking-wider cursor-pointer text-lg"
              onClick={(e) => history.push("/contact-us")}
            >
              تماس با ما
            </span>
          </div>

          {/* Desktop Logo (Right Aligned) */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <span
              onClick={(e) => history.push("/")}
              style={{ letterSpacing: "0.70rem" }}
              className="font-bold tracking-widest uppercase text-2xl cursor-pointer text-[var(--color-text)]"
            >
              Hayroo
            </span>
          </div>

          {/* Icons (Wishlist, Theme Toggle, User, Cart) - Common for Mobile and Desktop (adjusted for desktop) */}
          <div className="flex items-center justify-end space-x-2 lg:space-x-3">
            {/*  WishList Page Button */}
            <div
              onClick={(e) => history.push("/wish-list")}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer"
              title="Wishlist"
            >
              <svg
                className={`${
                  location.pathname === "/wish-list"
                    ? "fill-current text-[var(--color-accent)]"
                    : "text-[var(--color-text)]"
                } w-7 h-7 cursor-pointer`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            {/* Theme Toggle Button */}
            <div
              onClick={() => dispatch({ type: "toggleTheme" })}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 cursor-pointer"
              title="تغییر تم"
            >
              <svg
                className="w-7 h-7 text-[var(--color-text)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {data.isDarkMode ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" // Sun icon
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" // Moon icon
                  />
                )}
              </svg>
            </div>
            {localStorage.getItem("jwt") ? (
              <Fragment>
                <div
                  className="userDropdownBtn hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg relative"
                  title="حساب کاربری"
                >
                  <svg
                    className="cursor-pointer w-7 h-7 text-[var(--color-text)]"
            >
              Contact us
            </span>
          </div>
        </div>
        {/* Mobile Menu */}
        <motion.div
          initial="closed"
          animate={data.navberHamburger ? "open" : "closed"}
          variants={mobileMenuVariants}
          className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[var(--color-card-background)] text-[var(--color-text)] shadow-xl p-6 z-30 lg:hidden"
          style={{ x: "100%" }} // Initial position off-screen to the right
        >
          <div className="flex justify-end mb-6">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="w-8 h-8 cursor-pointer text-[var(--color-text)] hover:text-[var(--color-accent)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" // Close Icon
              />
            </svg>
          </div>
          <div className="flex flex-col space-y-5">
            <span
              className="font-semibold text-xl tracking-wider hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent)] cursor-pointer py-2 border-b border-gray-300 dark:border-gray-700"
              onClick={() => {
                history.push("/");
                navberToggleOpen();
              }}
            >
              فروشگاه
            </span>
            <span
              className="font-semibold text-xl tracking-wider hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent)] cursor-pointer py-2 border-b border-gray-300 dark:border-gray-700"
              onClick={() => {
                history.push("/blog");
                navberToggleOpen();
              }}
            >
              وبلاگ
            </span>
            <span
              className="font-semibold text-xl tracking-wider hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent)] cursor-pointer py-2"
              onClick={() => {
                history.push("/contact-us");
                navberToggleOpen();
              }}
            >
              تماس با ما
            </span>
          </div>
        </motion.div>
      </nav>
      {/* End Navber Section */}
    </Fragment>
  );
};

export default Navber;
