import React, { useState, useEffect } from "react";
import {
  deleteRoomBookings,
  createRoomBookings,
  getRoomBookings,
  updateRoomBookings,
} from "../../api/roombookings";
import { getCustomers } from "../../api/customers";
import { getRooms } from "../../api/rooms";
import { useSelector } from "react-redux";
import AddBookingModal from "./AddBookingModal";

const RoomBookingsComp = () => {
  const user = useSelector((state) => state.auth.user);
  const [roombookings, setRoomBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [nextRoomBookingId, setNextRoomBookingId] = useState(0);

  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    fetchRoomBookings();
    fetchCustomers();
    fetchRooms();
  }, []);

  const fetchRoomBookings = async () => {
    try {
      const data = await getRoomBookings();
      setRoomBookings(data);
      const greatestId = data.reduce(
        (maxId, booking) => Math.max(maxId, booking.id),
        0
      );
      setNextRoomBookingId(greatestId + 1);
    } catch (error) {
      console.error("Error fetching room bookings:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await deleteRoomBookings(bookingId);
      fetchRoomBookings();
    } catch (error) {
      console.error("Error deleting room booking:", error);
    }
  };

  const submitHandler = async (payload) => {
    const updatedPayload = {
      ...payload,
      roomId: payload.roomId.toString(),
      customerId: payload.customerId.toString(),
    };

    try {
      const response = await createRoomBookings(updatedPayload);
      if (response) {
        setNextRoomBookingId((prevId) => prevId + 1);
        setDataUpdated((prevDataUpdated) => !prevDataUpdated);
      } else {
        alert("Error creating booking");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getRoomNumber = (roomId) => {
    const room = rooms.find((room) => room.id === roomId);
    return room ? room.number : "";
  };

  const filteredRoomBookings = roombookings.filter((booking) => {
    const customer = customers.find(
      (customer) => customer.id === booking.customerId
    );
    const customerName = customer
      ? `${customer.firstName} ${customer.surname}`
      : "";
    const roomNumber = getRoomNumber(booking.roomId);
    const searchTerms = `${roomNumber} ${customerName} ${booking.startRentDate} ${booking.endRentDate}`;
    return searchTerms.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="pb-4 bg-white dark:bg-gray-900">
      <h2 className="h2 text-center">Bookings</h2>

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
                placeholder="Search for bookings..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 px-3 text-right">
          <div className="mb-5">
            <AddBookingModal
              onSubmit={submitHandler}
              disabled={user && user.roleId !== 1}
              customers={customers}
              rooms={rooms}
              roombookings={roombookings}
            />
          </div>
        </div>
      </div>
      <div className="min-w-full">
        <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Room Number
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRoomBookings.map((booking) => (
              <tr
                key={booking.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{getRoomNumber(booking.roomId)}</td>
                <td className="px-6 py-4">
                  {customers.map((customer) =>
                    customer.id === booking.customerId ? (
                      <span key={customer.id}>
                        {customer.firstName} {customer.surname}
                      </span>
                    ) : null
                  )}
                </td>
                <td className="px-6 py-4">{booking.startRentDate}</td>
                <td className="px-6 py-4">{booking.endRentDate}</td>
                <td className="px-6 py-4">
                  <button
                    className={`text-white bg-[#fca5a5] hover:bg-[#f87171] focus:outline-none focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-bold py-2 px-4 rounded-r `}
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomBookingsComp;
