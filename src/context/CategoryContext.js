import React, { createContext, useEffect, useState } from "react";
//data
import { categoryData } from "../data/CategoryData";
//create context
export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(categoryData);
  const [arrival, setArrival] = useState("03.02.2023");
  const [departure, setDeparture] = useState("asda");
  const [category, setCategory] = useState("asda");
  console.log(
    `arrival ${arrival}, departure ${departure}, category ${departure}`
  );
  return (
    <CategoryContext.Provider
      value={{ categories, arrival, departure, category }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
