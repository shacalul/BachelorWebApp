import React, { useState, useEffect } from "react";
import { getCustomers } from "../../../api/customers";
import { getAdministrators } from "../../../api/administrators";
import { getFinances, getFinanceCategories } from "../../../api/finances";
import { getRoomBookings } from "../../../api/roombookings";
import { getRooms } from "../../../api/rooms";

const CardMenu = () => {
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
      const latestFinances = sortedFinances.slice(0, 5);
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

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="w-full md:w-2/5 px-2">
        <div className="rounded-lg shadow-sm mb-4 mx-auto max-w-xs">
          <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
            <div className="px-3 pt-8 pb-10 text-center relative z-10">
              <h4 className="text-sm uppercase text-gray-500 leading-tight">
                Tenants
              </h4>
              <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                {totalTenants}
              </h3>
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <canvas id="chart1" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/5 px-2">
        <div className="rounded-lg shadow-sm mb-4 mx-auto max-w-xs">
          <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
            <div className="px-3 pt-8 pb-10 text-center relative z-10">
              <h4 className="text-sm uppercase text-gray-500 leading-tight">
                Employees
              </h4>
              <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                {totalEmployees}
              </h3>
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <canvas id="chart2" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/5 px-2">
        <div className="rounded-lg shadow-sm mb-4 mx-auto max-w-xs">
          <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
            <div className="px-3 pt-8 pb-10 text-center relative z-10">
              <h4 className="text-sm uppercase text-gray-500 leading-tight">
                Balance
              </h4>
              <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                {totalBalance} DKK
              </h3>
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <canvas id="chart3" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;
