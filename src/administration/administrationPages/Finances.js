import React, { useState, useEffect } from "react";
import { getFinances } from "../../api/finances";

/*

const Finances = () => {
  const [finances, setFinances] = useState([]);
  const [selectedFinance, setSelectedFinance] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchFinances();
  }, []);

  const fetchFinances = async () => {
    try {
      const data = await getFinances();
      setFinances(data);
    } catch (error) {
      console.error("Error fetching finances:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await updateFinance({ ...formData, id: selectedFinance.id });
      } else {
        await createFinance(formData);
      }
      fetchFinances();
      resetForm();
    } catch (error) {
      console.error("Error submitting finance:", error);
    }
  };


  /*const resetForm = () => {
    setIsEditing(false);
    setSelectedFinance(null);
    setFormData({ name: "", email: "", phone: "" });
  };
*/
/*
  const filteredFinances = finances.filter((finance) =>
    `${finance.name} ${finance.amount} ${finance.category} ${finance.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  */
const Finances = () => {
  const [finances, setFinances] = useState([]);
  useEffect(() => {
    fetchFinances();
  }, []);

  const fetchFinances = async () => {
    try {
      const data = await getFinances();
      setFinances(data);
    } catch (error) {
      console.error("Error fetching finances:", error);
    }
  };
  return (
    <div className="pb-4 bg-white dark:bg-gray-900">
      <h2 class="h2 text-center ">Balance</h2>

      <div className="-mx-3 flex flex-wrap items-center">
        <div className="w-full sm:w-1/2 px-3">
          <div className="mb-5">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for tenants..."
                //value={searchQuery}
                // onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 px-3 text-right"></div>
      </div>
      <div className="min-w-full">
        <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                amount of money
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>

              <th scope="col" className="px-6 py-3">
                category
              </th>
              <th scope="col" className="px-6 py-3">
                tenant
              </th>
            </tr>
          </thead>
          <tbody>
            {finances.map((finance) => (
              <tr
                key={finance.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="text-base font-semibold">{finance.name}</div>
                </td>
                <td className="px-6 py-4">{finance.amountOfMoney}</td>
                <td className="px-6 py-4">{finance.description}</td>
                <td className="px-6 py-4">{finance.financeCategory.name}</td>
                <td className="px-6 py-4">
                  {finance.customer.firstName} {finance.customer.surname}
                </td>

                <td>
                  <div class="inline-flex"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finances;
