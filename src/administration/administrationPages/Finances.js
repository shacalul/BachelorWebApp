import React, { useState, useEffect } from "react";
import { getFinances } from "../../api/finances";

const BalanceCard = ({ balance }) => {
	return (
	  <div className="flex justify-between mb-4">
		<div className="text-sm font-medium text-gray-500">Balance:</div>
		<div className="text-lg font-bold">{balance}</div>
	  </div>
	);
  };
  

const Finances = () => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [finances, setFinances] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFinances();
  }, []);

  const fetchFinances = async () => {
    try {
      const data = await getFinances();
      // Initialize checked state for each finance object
      const financesWithChecked = data.map((finance) => ({
        ...finance,
        isChecked: false,
      }));
      setFinances(financesWithChecked);
    } catch (error) {
      console.error("Error fetching finances:", error);
    }
  };

  const handleCheckboxChange = (index) => {
    const newFinances = [...finances];
    newFinances[index].isChecked = !newFinances[index].isChecked;
    setFinances(newFinances);
    let truevalue = true;
    finances.forEach((finance) => {
      if (!finance.isChecked) {
        truevalue = false;
      }
    });
    setIsCheckedAll(truevalue);
  };

  const handleCheckAllChange = () => {
    const newFinances = finances.map((finance) => ({
      ...finance,
      isChecked: !finance.isChecked,
    }));
    setFinances(newFinances);
    let truevalue = true;
    finances.forEach((finance) => {
      if (finance.isChecked) {
        truevalue = false;
      }
    });
    setIsCheckedAll(truevalue);
  };

  

  return (
    <div className="pb-4 bg-white dark:bg-gray-900">
      <h2 class="h2 text-center ">Finances</h2>
	  <BalanceCard balance={1234.56} />

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
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
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
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                amount of money
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>

              <th scope="col" className="px-6 py-3">
                tenant
              </th>
              <th scope="col" className="px-6 py-3">
                due date
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isCheckedAll}
                    onChange={() => handleCheckAllChange()}
                  />
                  <span className="ml-2">Balance all</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {finances.map((finance, index) => (
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
                <td className="px-6 py-4">{finance.financeCategory.name}</td>
                <td className="px-6 py-4">
                  {finance.customer.firstName} {finance.customer.surname}
                </td>
                <td className="px-6 py-4">{finance.date}</td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={finance.isChecked}
                    onChange={() => handleCheckboxChange(index)}
                  />
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


