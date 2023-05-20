import React, { useState, useEffect } from "react";
import { getMessages, deleteMessage } from "../../api/messages";

import { useSelector } from "react-redux";

const MessagesTable = () => {
  const user = useSelector((state) => state.auth.user);

  const [messages, setMessages] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [dataUpdated]);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const filteredMessages = messages.filter((message) =>
    `${message.email} ${message.subject} ${message.message}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-4 bg-white dark:bg-gray-900">
      <h2 className="h2 text-center">Messages</h2>

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
                placeholder="Search for messages..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-full">
        <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((message) => (
              <tr
                key={message.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{message.email}</td>
                <td className="px-6 py-4">{message.subject}</td>
                <td className="px-6 py-4">{message.message}</td>
                <td>
                  <div className="px-6 py-4">
                    <button
                      className={`text-white bg-[#fca5a5] hover:bg-[#f87171] focus:outline-none focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-bold py-2 px-4 rounded-r `}
                      onClick={() => handleDelete(message.id)}
                      disabled={user && user.roleId !== 1}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesTable;
