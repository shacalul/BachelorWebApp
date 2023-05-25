import { React, Fragment, useState, useEffect } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { Phone } from "react-telephone";
import { Select, Option } from "@material-tailwind/react";
import { arrivalList } from "../../../../website/websiteComponents/Arrival";
import { departureList } from "../../../../website/websiteComponents/Departure";
import { categoryData } from "../../../../website/data/CategoryData";
import { getRoomBookings } from "../../../../api/roombookings";
import { getRooms } from "../../../../api/rooms";
import { getCustomers } from "../../../../api/customers";
const EditTenantsModal = ({ disabled, customer }) => {
  const [size, setSize] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleOpen = (value) => setSize(value);
  const { countries } = useCountries();
  const tenant = customer;
  const [firstName, setFirstName] = useState(tenant.firstName);
  const [lastName, setLastName] = useState(tenant.surname);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phoneNumber);
  const [departure, setDeparture] = useState(customer.endRentDate);
  const [roomBookings, setRoomBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [customers, setCustomers] = useState("");

  const [departureOptions, setDepartureOptions] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customersData = await getCustomers();
      setCustomers(customersData);
      const bookingsData = await getRoomBookings();
      const roomsData = await getRooms();

      const customerBookings = bookingsData.filter(
        (booking) => booking.customerId === customer.id
      );

      const departureOptions = customerBookings.map((booking) => ({
        value: booking.endRentDate,
        name: booking.endRentDate,
      }));

      setDepartureOptions(departureOptions);

      const customerBooking = customerBookings.find(
        (booking) => booking.customerId === customer.id
      );
      const departureDate = customerBooking ? customerBooking.endRentDate : "";

      setDeparture(departureDate);

      roomsData.forEach((room) => {
        room.booked = bookingsData.some(
          (booking) => booking.roomId === room.id
        );
        if (!room.booked) {
          room.booked = false;
        }
      });

      setRooms(roomsData);
      setRoomBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching room bookings:", error);
    }
  };

  const handleOpenDep = (value) => {
    setDeparture(value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     firstName: firstName,
  //     surname: lastName,
  //     email: email,
  //     phone: phone,
  //     roleId: roleId,
  //     id: user.id,
  //     password: password,
  //   };

  //   console.log(payload);

  //   try {
  //     const response = await updateAdministrator(user.id, payload);
  //     console.log(response);

  //     dispatch(updateUser(payload));
  //     handleOpen(null);
  //   } catch (error) {
  //     console.error("Error updating administrator:", error);
  //   }
  // };

  return (
    <Fragment>
      <div>
        <button
          className={`text-white bg-[#fde68a] hover:bg-[#fcd34d] focus:outline-none focus:ring-4  
          focus:ring-amber-300  dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-900 font-bold  py-2 px-4 rounded-l ${
            disabled ? "edit-disabled" : ""
          }`}
          onClick={() => handleOpen("sm")}
          disabled={disabled}
        >
          Edit
        </button>
      </div>
      <Dialog open={size === "sm"} size={size} handler={handleOpen}>
        <DialogBody divider>
          <div style={{ overflow: "hidden" }}>
            <div style={{ overflowY: "auto", maxHeight: "500px" }}>
              <div className="min-h-screen">
                <div class="flex items-center justify-center p-10 py-10">
                  <div class="mx-auto w-full max-w-[550px]">
                    <div class="py-4 lg:py-2 px-4 mx-auto max-w-screen-md">
                      <h2 class="h2 text-center ">Edit Tenant</h2>
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
                          value={firstName}
                          id="firstName"
                          placeholder="First Name"
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div class="mb-5">
                        <label
                          for="lName"
                          class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lName"
                          value={lastName}
                          id="lName"
                          placeholder="Last Name"
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div class="mb-5">
                        <label class="mb-3 block text-base font-medium text-[#07074D]">
                          Email
                        </label>
                        <div class="flex items-center space-x-6">
                          <div class="flex items-center w-full">
                            <input
                              type="text"
                              name="email"
                              value={email}
                              id="email"
                              placeholder="Email"
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-5">
                        <div class="mt-5">
                          <label
                            for="pNumber"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Phone number
                          </label>
                          <div class="flex items-center space-x-6">
                            <div class="flex items-center w-full">
                              <input
                                type="text"
                                name="phone"
                                value={phone}
                                id="phone"
                                placeholder="Phone"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mb-5">
                        <label
                          class="mb-3 block text-base font-medium text-[#07074D]"
                          for="roomNumberDropDown"
                        >
                          Room Number
                        </label>
                        <div
                          className="w-full border "
                          name="roomNumberDropDown"
                          id="roomNumberDropDown"
                        >
                          <Select
                            size="lg"
                            label="Select Room Number"
                            onChange={(value) => setSelectedRoomId(value)}
                          >
                            {rooms.map((room) => (
                              <Option
                                key={room.id}
                                value={room.id}
                                disabled={room.booked}
                                title={room.booked ? "Already booked" : ""}
                              >
                                {room.number}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="mb-5">
                        <label
                          className="mb-3 block text-base font-medium text-[#07074D]"
                          htmlFor="departureDepartureDropDown"
                        >
                          Departure Date ({departure})
                        </label>
                        <div
                          className="w-full border "
                          name="departureDepartureDropDown"
                          id="departureDepartureDropDown"
                        >
                          <Select
                            size="lg"
                            value={departure}
                            onChange={(value) => setDeparture(value)}
                            label="Departure date"
                          >
                            {departureOptions.map((option) => (
                              <Option key={option.value} value={option.value}>
                                {option.name}
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
                  onClick={() => handleOpen(null)}
                  className="btn btn-secondary btn-sm w-full mx-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <button className="btn btn-secondary btn-sm w-full mx-auto">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};
export default EditTenantsModal;
