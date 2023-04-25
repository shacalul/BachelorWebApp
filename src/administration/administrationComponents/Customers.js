import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import axios from "axios";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../api/customers";
import "./Customers.css";

const Customers = () => {
  const CUSTOMERS_PER_PAGE = 10;
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    nationality: "",
  });
  const [firstName, handleFirstNameChange] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await updateCustomer({ ...formData, id: selectedCustomer.id });
      } else {
        await createCustomer(formData);
      }
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error("Error submitting customer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setSelectedCustomer(null);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleEdit = (customer) => {
    setIsEditing(true);
    setSelectedCustomer(customer);
    setFormData({
      firstName: customer.firstName,
      surname: customer.surname,
      email: customer.email,
      phone: customer.phone_number,
      nationality: customer.nationality,
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const Modal = ({ onClose, children }) => (
    <div className="modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="modal-content bg-white rounded p-4 max-w-lg mx-auto my-auto">
        <button onClick={onClose} className="close-modal float-right mb-4">
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="pb-4 bg-white dark:bg-gray-900">
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
                placeholder="Search for tenant"
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 px-3 text-right">
          <div className="mb-5">
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={openModal}
            >
              Add Tenant
            </button>
          </div>
        </div>
      </div>
      <div className="min-w-full">
        <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>

              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="text-base font-semibold">
                    {customer.firstName} {customer.surname}
                  </div>
                </td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone_number}</td>

                <td>
                  <button
                    className="customers__action"
                    onClick={() => handleEdit(customer)}
                  >
                    Edit
                  </button>
                  <button
                    className="customers__action customers__action--delete"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <Modal onClose={closeModal}>
            <form className="customers__form" onSubmit={handleSubmit}>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="fName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>

              <button className="customers__button" type="submit">
                {isEditing ? "Update" : "Add"}
              </button>
              {isEditing && (
                <button
                  className="customers__button customers__button--cancel"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Customers;
