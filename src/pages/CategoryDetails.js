import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Arrival from "../components/Arrival";
import Departure from "../components/Departure";
import CategoryType from "../components/CategoryType";

import { CategoryContext } from "../context/CategoryContext";

const CategoryDetails = () => {
  const { categories } = useContext(CategoryContext);
  const { id } = useParams();
  console.log(id);

  const category = categories.find((category) => category.id === Number(id));

  const { name, description, rent, consumption, deposit, moveInPrice, images } =
    category;

  return (
    <section>
      <div className="w-full h-[640px] relative flex justify-center items-center ">
        {images}
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row h-full py-24">
          <div className="w-full h-full lg:w-[60%] px-6">
            <h2 className="h2">{name}</h2>
            <p className="mb-8">{description}</p>
          </div>
          <div className="w-full h-full lg:w-[40%]">
            {/* reservation */}
            <div className="py-8 px-6 bg-accent/20 mb-12">
              <div className="flex flex-col space-y-4 mb-4">
                <div className="h-[60px]">
                  <Arrival />
                </div>
                <div className="h-[60px]">
                  <Departure />
                </div>
                <div className="h-[60px]">
                  <CategoryType />
                </div>
              </div>
              <button className="btn btn-large btn-primary w-full h-[60px]">
                Book now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryDetails;
