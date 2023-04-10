import React, { useContext } from "react";
//context
import { CategoryContext } from "../context/CategoryContext";
//components
import Category from "../components/Category";

const Categories = () => {
  const { categories } = useContext(CategoryContext);

  return (
    <section id="categories" className="py-24">
      <div className="container mx-auto lg:px-0">
        <div className="text-center">
          <div className="font-tertiary uppercase text-[15px] tracking-[6px]">
            Student Village Kamtjatka
          </div>
          <h2 className="font-primary text-[45px] mb-4">Room categories</h2>
        </div>
        {/*grid*/}
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => {
            return <Category category={category} key={category.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
