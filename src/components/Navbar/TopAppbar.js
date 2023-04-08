import React, { useState, useEffect, useMemo } from "react";

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

  const headerBgColor = useMemo(() => {
    if (currentPage === "/contact" || currentPage === "/bookaroom") {
      return "bg-black py-6 shadow-lg";
    } else {
      return "bg-transparent py-8";
    }
  }, [currentPage]);

  const Links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Facilities",
      link: "/",
    },
    {
      name: "Book a room",
      link: "/bookaroom",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Administration",
      link: "/",
    },
  ];

  return (
    <header
      className={`${
        topAppBar ? "bg-white py-6 shadow-lg" : headerBgColor
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        <a href="/" className="text-white"></a>
        <ul
          className={`${
            topAppBar ? "text-primary" : "text-white"
          } flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          {Links.map((link) => (
            <li key={link.name} className="hover:text-accent transition">
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default TopAppBar;
