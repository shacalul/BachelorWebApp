import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { Menu } from "@headlessui/react";
const Departure = () => {
  // const [selectedDate, setSelectedDate] = useState(null);
  // const arrivalDates = getArrivalDates();

  // function getArrivalDates() {
  //   const availableMonths = [2, 8];
  //   const now = new Date();
  //   const currentYear = now.getFullYear();
  //   const currentMonth = now.getMonth() + 1;
  //   const availableYears =
  //     currentMonth >= availableMonths[1]
  //       ? [currentYear + 1, currentYear + 2]
  //       : [currentYear];
  //   const arrivalDates = [];
  //   availableYears.forEach((year) => {
  //     availableMonths.forEach((month) => {
  //       const arrivalDate = new Date(`${year}-${month}-01`);
  //       if (
  //         arrivalDate >= now &&
  //         arrivalDate.getFullYear() - now.getFullYear() <= 1
  //       ) {
  //         arrivalDates.push(arrivalDate);
  //       }
  //     });
  //   });
  //   return arrivalDates;
  // }

  const list = [
    { name: "03/02/2024" },
    { name: "01/08/2024" },
    { name: "03/02/2025" },
    { name: "01/08/2025" },
    { name: "03/02/2026" },
    { name: "01/08/2026" },
  ];

  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8 ">
        Departure
        <BsCalendar className=" text-accent text-base" />
      </Menu.Button>
      <Menu.Items
        as="ul"
        className="bg-white absolute w-full flex flex-col z-40"
      >
        {list.map((li, index) => {
          return (
            <Menu.Item
              as="li"
              className="border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer"
              key={index}
            >
              {li.name}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default Departure;
