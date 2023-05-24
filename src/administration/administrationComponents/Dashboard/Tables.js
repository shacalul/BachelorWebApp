import React, { useState, useEffect } from "react";
import { getCustomers } from "../../../api/customers";
import { getAdministrators } from "../../../api/administrators";
import { getFinances, getFinanceCategories } from "../../../api/finances";
import { getRoomBookings } from "../../../api/roombookings";
import { getRooms } from "../../../api/rooms";

const Tables = () => {
  const [customers, setCustomers] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [finances, setFinances] = useState([]);
  const [filteredFinances, setFilteredFinances] = useState([]);
  const [financeCategories, setFinanceCategories] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomBookings, setRoomBookings] = useState([]);
  useEffect(() => {
    fetchCustomers();
    fetchAdministrators();
    fetchFinances();
    fetchFinanceCategories();
    fetchRoomBookings();
    fetchRooms();
  }, [dataUpdated]);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchAdministrators = async () => {
    try {
      const data = await getAdministrators();
      setAdministrators(data);
    } catch (error) {
      console.error("Error fetching administrators:", error);
    }
  };

  const handleCalculateBalance = () => {
    let result = finances.reduce((total, finance) => {
      return total + parseInt(finance.amountOfMoney);
    }, 0);
    setTotalBalance(result);
  };

  const fetchFinances = async () => {
    try {
      const data = await getFinances();
      const financesWithChecked = data.map((finance) => ({
        ...finance,
        date: new Date(finance.dueDate),
        isPaid: false,
      }));
      setFinances(financesWithChecked);

      const sortedFinances = financesWithChecked.sort(
        (a, b) => b.date - a.date
      );
      const latestFinances = sortedFinances.slice(0, 3);
      setFilteredFinances(latestFinances);
    } catch (error) {
      console.error("Error fetching finances:", error);
    }
  };

  const fetchFinanceCategories = async () => {
    try {
      const financeCategories = await getFinanceCategories();
      setFinanceCategories(financeCategories);
    } catch (error) {
      console.error("Error fetching finance categories:", error);
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

  const fetchRoomBookings = async () => {
    try {
      const data = await getRoomBookings();
      setRoomBookings(data);
    } catch (error) {
      console.error("Error fetching room bookings:", error);
    }
  };

  const totalTenants = customers.length;
  const totalEmployees = administrators.length;

  useEffect(() => {
    handleCalculateBalance();
  }, [finances]);

  const getRoomNumber = (roomId) => {
    const room = rooms.find((room) => room.id === roomId);
    return room ? room.number : "";
  };

  const getLastFiveRoomBookings = () => {
    return roomBookings.slice(-5);
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div class="-mx-3 flex flex-wrap">
        <div class="w-full px-3 sm:w-1/2 ">
          <h2 className="h3 text-center">Recent invoices</h2>
          <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tenant
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFinances.map((finance, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    {finance.customer.firstName} {finance.customer.surname}
                  </td>
                  <td className="px-6 py-4">{finance.amountOfMoney} DKK</td>
                  <td className="px-6 py-4">{finance.financeCategory.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="w-full px-3 sm:w-1/2 ">
          <div class="mb-5">
            <h3 className="h3 text-center">Recent bookings</h3>
            <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tenant
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Arrival
                  </th>
                </tr>
              </thead>
              <tbody>
                {getLastFiveRoomBookings().map((booking) => (
                  <tr
                    key={booking.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">
                      {customers.map((customer) =>
                        customer.id === booking.customerId ? (
                          <span key={customer.id}>
                            {customer.firstName} {customer.surname}
                          </span>
                        ) : null
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getRoomNumber(booking.roomId)}
                    </td>
                    <td className="px-6 py-4">{booking.startRentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tables;
