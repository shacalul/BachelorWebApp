import React, { useState, useEffect } from "react";
import {
  getAdministrators,
  createAdministrator,
} from "../../../api/administrators";
import { getRoles } from "../../../api/roles";
import DeleteAdministrator from "./Modal/DeleteAdministrator";
import AddAdministrator from "./Modal/AddAdministrator";

import { useSelector } from "react-redux";

const Administrator = () => {
  const user = useSelector((state) => state.auth.user);

  const [administrators, setAdministrators] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState([]);

  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    fetchAdministrators();
    fetchRoles();
  }, [dataUpdated]);

  const fetchAdministrators = async () => {
    try {
      const data = await getAdministrators();
      setAdministrators(data);
    } catch (error) {
      console.error("Error fetching administrators:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const roles = await getRoles();
      setRoles(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const submitHandler = async (payload) => {
    const greatestId = administrators.reduce(
      (maxId, user) => Math.max(maxId, user.id),
      0
    );

    console.log(greatestId);
    const updatedPayload = {
      ...payload,
      id: greatestId + 1,
    };

    const response = await createAdministrator(updatedPayload);
    if (response) {
      setDataUpdated(!dataUpdated);
    } else {
      alert("error creating administrator");
    }
  };

  const filteredAdministrators = administrators.filter((administrator) =>
    `${administrator.firstName} ${administrator.surname} ${administrator.email} ${administrator.phone_number}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-4 bg-white dark:bg-gray-900">
      <h2 class="h2 text-center ">Employees</h2>

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
                placeholder="Search for employees..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 px-3 text-right">
          <div className="mb-5">
            <AddAdministrator
              onSubmit={submitHandler}
              style={{ overflowY: "scroll" }}
              disabled={user && user.roleId !== 1}
            />
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
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAdministrators.map((administrator) => {
              const role = roles.find(
                (role) => role.id === administrator.roleId
              );
              const roleName = role ? role.name : "";

              return (
                <tr
                  key={administrator.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    {administrator.firstName} {administrator.surname}
                  </td>
                  <td className="px-6 py-4">{administrator.email}</td>
                  <td className="px-6 py-4">{administrator.phone}</td>
                  <td className="px-6 py-4">{roleName}</td>
                  <td>
                    <div className="inline-flex">
                      <DeleteAdministrator
                        onDeleteComplet={(value) =>
                          setDataUpdated(!dataUpdated)
                        }
                        disabled={user && user.roleId !== 1}
                        id={administrator.id}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administrator;
