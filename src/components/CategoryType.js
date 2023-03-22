import React from "react";
import { CategoryContext } from "../context/CategoryContext";
import { Menu } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

const list = [
  { name: "Category A" },
  { name: "Category B" },
  { name: "Category C" },
  { name: "Category D" },
  { name: "Category E" },
  { name: "Category F" },
];
const CategoryType = () => {
  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8 ">
        Categories
        <BsChevronDown className="text-base text-accent-hover" />
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

export default CategoryType;
