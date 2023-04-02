import React, { useState, useEffect } from "react";

const TopAppBar = ({ currentPage }) => {
  const [topAppBar, setTopAppBar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setTopAppBar(true) : setTopAppBar(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerBgColor = () => {
    if (currentPage === "/contact") {
      return "bg-black py-6 shadow-lg";
    } else {
      return "bg-transparent py-8";
    }
  };

  return (
    <topAppBar
      className={`${
        topAppBar ? "bg-white py-6 shadow-lg" : headerBgColor()
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/*logo*/}
        <a href="/">{/*logo here*/}</a>
        <nav
          className={`${
            topAppBar ? "text-primary" : "text-white"
          } flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          <a href="/" className="hover:text-accent transition">
            Home
          </a>
          <a href="" className="hover:text-accent transition">
            Facilities
          </a>
          <a href="" className="hover:text-accent transition">
            Book a room
          </a>
          <a href="/contact" className="hover:text-accent transition">
            Contact
          </a>
          <a href="" className="hover:text-accent transition">
            Administration
          </a>
        </nav>
      </div>
    </topAppBar>
  );
};

export default TopAppBar;
