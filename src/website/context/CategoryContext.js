import React, { createContext, useState } from "react";
import { categoryData } from "../data/CategoryData";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(categoryData);
  const [arrival, setArrival] = useState(null); // Initialize with null
  const [departure, setDeparture] = useState(null); // Initialize with null
  const [categoryType, setCategoryType] = useState("Category");

  return (
    <CategoryContext.Provider
      value={{
        categories,
        arrival,
        setArrival,
        departure,
        setDeparture,
        categoryType,
        setCategoryType,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
