import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Arrival from "../components/Arrival";
import Departure from "../components/Departure";
import FilterCategories from "../components/FilterCategories";

import { CategoryContext } from "../context/CategoryContext";
import { FaCheck } from "react-icons/fa";

const CategoryDetails = () => {
  const { categories } = useContext(CategoryContext);
  const { id } = useParams();
  console.log(id);

  const { name, description, rent, consumption, deposit, moveInPrice, images } =
    categories.find((category) => category.id === Number(id));

  return (
    <section className="bg-pink-200">
      <div className="bg-room h-[560px]"></div>
    </section>
  );
};

export default CategoryDetails;
