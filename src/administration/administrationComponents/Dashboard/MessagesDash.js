import React, { useState, useEffect } from "react";
import { getMessages, deleteMessage } from "../../../api/messages";

const MessagesDash = () => {
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

  const filteredMessages = messages.filter((message) =>
    `${message.email} ${message.subject} ${message.message}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-4 bg-white dark:bg-gray-900 ">
      <h3 className="h3 text-center">Recent messages</h3>

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesDash;
