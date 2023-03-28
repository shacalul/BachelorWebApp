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

  const category = categories.find((category) => category.id === Number(id));

  const { name, description, rent, consumption, deposit, moveInPrice, images } =
    category;

  return (
    <section className="bg-pink-200">
      <div className="bg-category bg-cover h-[560px] bg-center relative flex justify-center items-center">
        {images}
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row h-full py-24">
          <div className="w-full h-full lg:w-[60%]">Lorem ipsum pula mea</div>
        </div>
      </div>
    </section>
  );
};

export default CategoryDetails;
