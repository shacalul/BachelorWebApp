import React, { Fragment, useState, useRef, useContext } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

import { CategoryContext } from "../../website/context/CategoryContext";
import { Select, Option } from "@material-tailwind/react";

export function getArrivalDates() {
  const availableMonths = [2, 8];
  const now = new Date();
  const currentYear = now.getFullYear();

  const arrivalDates = [];
  for (let year = currentYear; year <= currentYear + 2; year++) {
    availableMonths.forEach((month) => {
      const arrivalDay = month === 2 ? 3 : 1;
      const arrivalDate = new Date(year, month - 1, arrivalDay);
      if (arrivalDate >= now) {
        arrivalDates.push(arrivalDate);
      }
    });
  }
  return arrivalDates;
}

export function getDepartureDates() {
  const availableMonths = [2, 8];
  const now = new Date();
  const currentYear = now.getFullYear();

  const departureDates = [];
  for (let year = currentYear; year <= currentYear + 3; year++) {
    availableMonths.forEach((month) => {
      const departureDay = month === 2 ? 3 : 1; // Set the departure day based on the month
      const departureDate = new Date(year, month - 1, departureDay);
      if (departureDate >= now) {
        // Add the departure date only if it's in the future
        departureDates.push(departureDate);
      }
    });
  }
  return departureDates;
}

const AddBookingModal = ({
  onSubmit,
  disabled,
  customers,
  rooms,
  roombookings,
}) => {
  const { arrival, setArrival, departure, setDeparture } =
    useContext(CategoryContext);

  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  const roomNumberRef = useRef();
  const customerIdRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);

    const payload = {
      roomId: +roomNumberRef.current.value,
      customerId: +customerIdRef.current.value,
      startRentDate: arrivalDate.toISOString(),
      endRentDate: departureDate.toISOString(),
    };

    onSubmit(payload);
    handleOpen(null);
  };
  const availableCustomers = customers.filter(
    (customer) =>
      !roombookings.some((booking) => booking.customerId === customer.id)
  );
  const availableRooms = rooms.filter(
    (room) => !roombookings.some((booking) => booking.roomId === room.id)
  );
  return (
    <Fragment>
      <div>
        <button
          className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${
            disabled ? "add-disabled" : ""
          }`}
          onClick={() => handleOpen("lg")}
          disabled={disabled}
        >
          Add Booking
        </button>
      </div>
      <Dialog open={size === "lg"} size={size} handler={handleOpen}>
        <DialogBody divider>
          <div style={{ overflow: "hidden" }}>
            <div style={{ overflowY: "auto", maxHeight: "450px" }}>
              <div className="min-h-screen">
                <div className="flex items-center justify-center py-10">
                  <div className="mx-auto w-full max-w-[550px]">
                    <div className="py-4 lg:py-4 px-4 mx-auto max-w-screen-md">
                      <h2 className="h2 text-center">Add Booking</h2>

                      <div className="mb-5">
                        <Select
                          label="Room number"
                          ref={roomNumberRef}
                          name="roomNumber"
                          id="roomNumber"
                          size="lg"
                        >
                          {rooms.length === 0 ? (
                            <Option value="" disabled>
                              No customers available
                            </Option>
                          ) : (
                            availableRooms.map((room) => (
                              <Option key={room.id} value={room.id}>
                                {room.number}
                              </Option>
                            ))
                          )}
                        </Select>
                      </div>

                      <div className="mb-5">
                        <Select
                          size="lg"
                          ref={customerIdRef}
                          name="customerId"
                          id="customerId"
                          label="Customer"
                        >
                          {customers.length === 0 ? (
                            <Option value="" disabled>
                              No customers available
                            </Option>
                          ) : (
                            availableCustomers.map((customer) => (
                              <Option key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.surname}
                              </Option>
                            ))
                          )}
                        </Select>
                      </div>

                      <div className="mb-5">
                        <div
                          className="w-full border "
                          name="startRentDate"
                          id="startRentDate"
                        >
                          <Select size="lg" label="Select Start Date">
                            {getArrivalDates().map((date, index) => {
                              return (
                                <Option
                                  key={index}
                                  onClick={() =>
                                    setArrival(date.toLocaleDateString("en-GB"))
                                  }
                                >
                                  {date.toLocaleDateString("en-GB")}
                                </Option>
                              );
                            })}
                          </Select>
                        </div>
                      </div>

                      <div className="mb-5">
                        <div
                          className="w-full border "
                          name="endRentDate"
                          id="endRentDate"
                        >
                          <Select size="lg" label="Select End Date">
                            {getDepartureDates().map((date, index) => (
                              <Option
                                key={index}
                                onClick={() =>
                                  setDeparture(date.toLocaleDateString("en-GB"))
                                }
                              >
                                {date.toLocaleDateString("en-GB")}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <div class="-mx-3 flex flex-wrap w-full">
            <div class="w-full px-3 sm:w-1/2 ">
              <div class="mb-5 ">
                <button
                  className="btn btn-secondary btn-sm w-full mx-auto"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <button
                  className="btn btn-secondary btn-sm w-full mx-auto"
                  onClick={() => handleOpen(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default AddBookingModal;
