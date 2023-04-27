import { React, Fragment, useState } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { Phone } from "react-telephone";
import { Select, Option } from "@material-tailwind/react";
import { arrivalList } from "../../website/websiteComponents/Arrival";
import { departureList } from "../../website/websiteComponents/Departure";
import { categoryData } from "../../website/data/CategoryData";
const AddTenantsModal = () => {
  const [size, setSize] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleOpen = (value) => setSize(value);
  const { countries } = useCountries();
  return (
    <Fragment>
      <div>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => handleOpen("lg")}
        >
          Add Tenant
        </button>
      </div>
      <Dialog open={size === "lg"} size={size} handler={handleOpen}>
        <DialogBody divider>
          <div style={{ overflow: "hidden" }}>
            <div style={{ overflowY: "auto", maxHeight: "500px" }}>
              <div className="min-h-screen">
                <div class="flex items-center justify-center p-10 py-10">
                  <div class="mx-auto w-full max-w-[550px]">
                    <div class="py-4 lg:py-4 px-4 mx-auto max-w-screen-md">
                      <h2 class="h2 text-center ">Add a new tenant</h2>

                      <div class="-mx-3 flex flex-wrap">
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
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>

                        <div class="w-full px-3 sm:w-1/2">
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
                              id="lName"
                              placeholder="Last Name"
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
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
                              id="email"
                              placeholder="Email"
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-5">
                        <div class="-mx-3 flex flex-wrap">
                          <div class="w-full px-3 sm:w-1/2">
                            <div>
                              <label
                                for="cCode"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                              >
                                Country Code
                              </label>
                              <Phone>
                                <Phone.Country className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                              </Phone>
                            </div>
                          </div>
                          <div class="w-full px-3 sm:w-1/2">
                            <div>
                              <label
                                for="pNumber"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                              >
                                Phone number
                              </label>
                              <Phone>
                                <Phone.Number className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                              </Phone>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                          <div class="mb-5">
                            <label class="mb-3 block text-base font-medium text-[#07074D]">
                              Nationality
                            </label>
                            <div className="w-full">
                              <Select
                                size="lg"
                                label="Select Nationality"
                                selected={(element) =>
                                  element &&
                                  React.cloneElement(element, {
                                    className:
                                      "flex items-center px-0 gap-2 pointer-events-none",
                                  })
                                }
                              >
                                {countries.map(({ name, flags }) => (
                                  <Option
                                    key={name}
                                    value={name}
                                    className="flex items-center gap-2"
                                  >
                                    <img
                                      src={flags.svg}
                                      alt={name}
                                      className="h-5 w-5 rounded-full object-cover"
                                    />
                                    {name}
                                  </Option>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                          <div class="mb-5">
                            <label class="mb-3 block text-base font-medium text-[#07074D]">
                              Country
                            </label>
                            <div className="w-full">
                              <Select
                                size="lg"
                                label="Select Country"
                                selected={(element) =>
                                  element &&
                                  React.cloneElement(element, {
                                    className:
                                      "flex items-center px-0 gap-2 pointer-events-none",
                                  })
                                }
                              >
                                {countries.map(({ name, flags }) => (
                                  <Option
                                    key={name}
                                    value={name}
                                    className="flex items-center gap-2"
                                  >
                                    <img
                                      src={flags.svg}
                                      alt={name}
                                      className="h-5 w-5 rounded-full object-cover"
                                    />
                                    {name}
                                  </Option>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                          <div class="mb-5">
                            <label
                              for="city"
                              class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              placeholder="City"
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                          <div class="mb-5">
                            <label
                              for="pCode"
                              class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Postcode
                            </label>
                            <input
                              type="text"
                              name="pCode"
                              id="pCode"
                              placeholder="Postcode"
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>

                        <div class="w-full px-3 sm:w-1/2">
                          <div class="mb-5">
                            <label
                              for="sName"
                              class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Street Name
                            </label>
                            <input
                              type="text"
                              name="sName"
                              id="sName"
                              placeholder="Street Name"
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                          <div class="mb-5">
                            <label
                              for="sNumber"
                              class="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Street Number
                            </label>
                            <input
                              type="text"
                              name="sNumber"
                              id="sNumber"
                              placeholder="Street Nr/House Nr"
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mb-5">
                        <label class="mb-3 block text-base font-medium text-[#07074D]">
                          Personal Identification
                        </label>
                        <div class="flex items-center space-x-6">
                          <div class="flex items-center">
                            <input
                              type="radio"
                              name="radio1"
                              id="nationalIDNumber"
                              class="h-5 w-5"
                            />
                            <label
                              for="nationalIDNumber1"
                              class="pl-3 text-base font-medium text-[#07074D]"
                            >
                              National ID Number
                            </label>
                          </div>
                          <div class="flex items-center">
                            <input
                              type="radio"
                              name="radio1"
                              id="passportNumber"
                              class="h-5 w-5"
                            />
                            <label
                              for="passportNumber"
                              class="pl-3 text-base font-medium text-[#07074D]"
                            >
                              Passport Number
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="mb-5">
                        <div class="flex items-center space-x-6">
                          <div class="flex items-center w-full">
                            <input
                              type="text"
                              name="Personal Identification"
                              id="personalIdentification"
                              placeholder="National ID Number/Passport Number"
                              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                          <div class="mb-5">
                            <label class="mb-3 block text-base font-medium text-[#07074D]">
                              University
                            </label>
                            <div class="flex items-center space-x-6">
                              <div class="flex items-center w-full">
                                <input
                                  type="text"
                                  name="university"
                                  id="university"
                                  placeholder="University"
                                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                          <div class="mb-5">
                            <label class="mb-3 block text-base font-medium text-[#07074D]">
                              Study programme
                            </label>
                            <div class="flex items-center space-x-6">
                              <div class="flex items-center w-full">
                                <input
                                  type="text"
                                  name="sProgramme"
                                  id="sProgramme"
                                  placeholder="Study programme"
                                  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <label
                              className="mb-3 block text-base font-medium text-[#07074D]"
                              htmlFor="sProgram"
                            >
                              Start Of Programme
                            </label>
                            <div
                              className="w-full border "
                              name="sProgram"
                              id="sProgram"
                            >
                              <Select size="lg" label="Select Date">
                                {arrivalList.map((option) => (
                                  <Option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.name}
                                  </Option>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <label
                              className="mb-3 block text-base font-medium text-[#07074D]"
                              htmlFor="eProgram"
                            >
                              End Of Programme
                            </label>
                            <div
                              className="w-full border "
                              name="eProgram"
                              id="eProgram"
                            >
                              <Select size="lg" label="Select Date">
                                {departureList.map((option) => (
                                  <Option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.name}
                                  </Option>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="mb-5">
                        <label
                          class="mb-3 block text-base font-medium text-[#07074D]"
                          for="roomCategoryDropDown"
                        >
                          Room Category
                        </label>
                        <div
                          className="w-full border "
                          name="roomCategoryDropDown"
                          id="roomCategoryDropDown"
                        >
                          <Select size="lg" label="Select Room Category">
                            {categoryData.map((category) => (
                              <Option key={category.id}>{category.name}</Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div class="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <label
                              className="mb-3 block text-base font-medium text-[#07074D]"
                              htmlFor="arrivalDepartureDropDown"
                            >
                              Arrival Date
                            </label>
                            <div
                              className="w-full border "
                              name="arrivalDepartureDropDown"
                              id="arrivalDepartureDropDown"
                            >
                              <Select size="lg" label="Select Date">
                                {arrivalList.map((option) => (
                                  <Option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.name}
                                  </Option>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <label
                              className="mb-3 block text-base font-medium text-[#07074D]"
                              htmlFor="departureDepartureDropDown"
                            >
                              Departure Date
                            </label>
                            <div
                              className="w-full border "
                              name="departureDepartureDropDown"
                              id="departureDepartureDropDown"
                            >
                              <Select size="lg" label="Select Date">
                                {departureList.map((option) => (
                                  <Option
                                    key={option.value}
                                    value={option.value}
                                  >
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
export default AddTenantsModal;
