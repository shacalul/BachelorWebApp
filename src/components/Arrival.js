import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { Menu } from "@headlessui/react";

const Arrival = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const arrivalDates = getArrivalDates();

  function getArrivalDates() {
    const availableMonths = [2, 8];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const availableYears =
      currentMonth >= availableMonths[1]
        ? [currentYear + 1, currentYear + 2]
        : [currentYear, currentYear + 1];
    const arrivalDates = [];
    availableYears.forEach((year) => {
      availableMonths.forEach((month) => {
        if (month === 2) {
          arrivalDates.push(new Date(`${year}-${month}-03`));
        } else {
          arrivalDates.push(new Date(`${year}-${month}-01`));
        }
      });
    });
    return arrivalDates;
  }

  const list = arrivalDates.map((date) => ({
    name: date.toLocaleDateString("en-GB"),
    value: date,
  }));

  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8 ">
        Arrival
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
              onClick={() => setSelectedDate(li.value)}
            >
              {li.name}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default Arrival;
