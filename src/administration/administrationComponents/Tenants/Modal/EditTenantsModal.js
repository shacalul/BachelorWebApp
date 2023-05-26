import { React, Fragment, useState, useEffect } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";

import { getCustomers, updateCustomer } from "../../../../api/customers";

const EditTenantsModal = ({ disabled, customer }) => {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  const tenant = customer;
  const [firstName, setFirstName] = useState(tenant.firstName);
  const [lastName, setLastName] = useState(tenant.surname);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phoneNumber);
  const [departure, setDeparture] = useState(customer.endRentDate);
  const [customers, setCustomers] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customersData = await getCustomers();
      setCustomers(customersData);
    } catch (error) {
      console.error("Error fetching room bookings:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: customer.id,
      firstName: firstName,
      surname: lastName,
      email: email,
      phoneNumber: phone,
      nationality: customer.nationality,
      country: customer.country,
      streetName: customer.streetName,
      streetNumber: customer.streetNumber,
      postalCode: customer.postalCode,
      city: customer.city,
      passportNumber: customer.passportNumber,
      idNumber: customer.idNumber,
    };

    console.log(payload);

    try {
      const response = await updateCustomer(customer.id, payload);
      console.log(response);

      handleOpen(null);
    } catch (error) {
      console.error("Error updating administrator:", error);
    }
  };

  return (
    <Fragment>
      <div>
        <button
          className={`text-white bg-[#fde68a] hover:bg-[#fcd34d] focus:outline-none focus:ring-4  
  focus:ring-amber-300  dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-900 font-bold  py-2 px-4 rounded-r rounded-l ${
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
                          onChange={(e) => setFirstName(e.target.value)}
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
                          onChange={(e) => setLastName(e.target.value)}
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
                              onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPhone(e.target.value)}
                                id="phone"
                                placeholder="Phone"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              />
                            </div>
                          </div>
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
                <button
                  className="btn btn-secondary btn-sm w-full mx-auto"
                  onClick={handleSubmit}
                >
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
