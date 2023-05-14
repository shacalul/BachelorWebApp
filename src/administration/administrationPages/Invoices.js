import { useState, useEffect } from "react";
import { getCustomers } from "../../api/customers";
import { getFinanceCategories } from "../../api/finances";
import { createFinance } from "../../api/finances";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Invoices = () => {
  const [searchValue, setSearchValue] = useState("");
  const [matchingTenants, setMatchingTenants] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); //state variable for dropdown
  const [selectedCategory, setSelectedCategory] = useState("");
  const [financeCategories, setFinanceCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [amount, setAmount] = useState(""); //  state for the amount field
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
	const value = e.target.value;
	setMessage(value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the finance data
    const financeData = {
      category: selectedCategory.id,
      amountOfMoney: amount,
      customerId: searchValue.id,
      dueDate: selectedDate,
      description: message,

    };

	
	console.log(createFinance([financeData]));
}
	

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value.replace(/[^0-9]/g, "")); // Remove non-numeric characters
  };


  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    fetchFinanceCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false); // Hide the dropdown after selecting a category
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchTenants(value);
    setShowDropdown(true); // Show the dropdown when there's a search value
  };

  const fetchTenants = (searchTerm) => {
    getCustomers()
      .then((customers) => {
        const matchingCustomers = customers.filter((customer) => {
          const fullName = `${customer.firstName} ${customer.surname}`;
          return fullName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        console.log("MATCHING tenant:", matchingCustomers);
        setMatchingTenants(matchingCustomers);
      })
      .catch((error) => {
        console.error("Error fetching tenants:", error);
      });
  };

  const handleTenantSelect = (tenant) => {
    setSearchValue(`${tenant.firstName} ${tenant.surname}`);
    // Handle tenant selection logic here
    setShowDropdown(false); // Hide the dropdown after selecting a tenant
    console.log("Selected tenant:", tenant);
  };

  const fetchFinanceCategories = async () => {
    try {
      const financeCategories = await getFinanceCategories();
      setFinanceCategories(financeCategories.map((category) => category.name));
    } catch (error) {
      console.error("Error fetching finance categories:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Create an Invoice
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify.
          </p>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label
              htmlFor="category"
              className="leading-7 text-sm text-gray-600"
            >
              Choose invoice category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={selectedCategory}
              readOnly // Make the input field read-only
              onClick={() => setShowDropdown(true)} // Show the dropdown on input click
            />
            {showDropdown && financeCategories.length > 0 && (
              <div className="absolute z-10 mt-2 py-2 bg-white rounded-md shadow-lg">
                {financeCategories.map((category) => (
                  <div
                    key={category.id}
                    className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category} {/* Access the name property here */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

		<div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="amount" className="leading-7 text-sm text-gray-600">
              Amount of money
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              pattern="[0-9]*" // Accept only numbers
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Tenant
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={searchValue}
              onChange={handleSearchChange}
            />

            {showDropdown && matchingTenants.length > 0 && (
              <div className="absolute z-10 mt-2 py-2 bg-white rounded-md shadow-lg">
                {matchingTenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                    onClick={() => handleTenantSelect(tenant)}
                  >
                    {tenant.firstName} {tenant.surname}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label
              htmlFor="dueDate"
              className="leading-7 text-sm text-gray-600"
            >
              Due date
            </label>
            <DatePicker
              id="dueDate"
              name="dueDate"
              selected={selectedDate}
              onChange={handleDateSelect}
              placeholderText="Select a date"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2 w-full">
          <div className="relative">
            <label for="message" className="leading-7 text-sm text-gray-600">
              Message
            </label>
			<textarea
      id="message"
      name="message"
      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
      value={message}
      onChange={handleMessageChange}
    ></textarea>
          </div>
        </div>
        <div className="p-2 w-full">
			
          <button onClick={handleSubmit} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Send
			
          </button>
        </div>
      </div>
    </section>
  );
};

export default Invoices;
