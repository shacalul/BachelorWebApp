import React, { useContext, useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { Menu } from "@headlessui/react";
import { CategoryContext } from "../context/CategoryContext";

const Departure = () => {
  const { arrival, departure, setDeparture, setArrival } =
    useContext(CategoryContext);
  const departureDates = getDepartureDates();

  function getDepartureDates() {
    const availableMonths = [2, 8];
    const now = new Date();
    const currentYear = now.getFullYear();
    const arrivalDate = new Date(arrival);

    const departureDates = [];
    for (let year = currentYear + 1; year <= currentYear + 3; year++) {
      availableMonths.forEach((month) => {
        const departureDay = month === 2 ? 3 : 1;
        const departureDate = new Date(year, month - 1, departureDay);
        if (departureDate > arrivalDate && departureDate >= now) {
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

  const handleDepartureSelect = (name, value) => {
    setDeparture(name);
  };

  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8 ">
        {departure}
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
              onClick={() => handleDepartureSelect(li.name, li.value)}
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
