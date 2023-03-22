import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { Menu } from "@headlessui/react";

const Departure = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const departureDates = getDepartureDates();

  function getDepartureDates() {
    const availableMonths = [2, 8];
    const now = new Date();
    const currentYear = now.getFullYear();
    const departureDates = [];
    for (let year = currentYear + 1; year <= currentYear + 3; year++) {
      availableMonths.forEach((month) => {
        const departureDay = month === 2 ? 3 : 1; // Set the departure day based on the month
        const departureDate = new Date(year, month - 1, departureDay);
        if (departureDate >= now) {
          // Add the departure date only if it's in the future
          departureDates.push(departureDate);
        }
      });
    }
    return departureDates;
  }
  const list = departureDates.map((date) => ({
    name: date.toLocaleDateString("en-GB"),
    value: date,
  }));

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

export default Departure;
