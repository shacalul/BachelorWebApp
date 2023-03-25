import React, { useContext } from "react";
//context
import { CategoryContext } from "../context/CategoryContext";
//components
import Category from "../components/Category";

const Categories = () => {
  const { categories } = useContext(CategoryContext);

  return (
    <section className="py-24">
      <div className="container mx-auto lg:px-0">
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
