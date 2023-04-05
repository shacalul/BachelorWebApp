import React from "react";
import { Phone } from "react-telephone";
import { useCountries } from "use-react-countries";
import { Select, Option } from "@material-tailwind/react";

const BookRoom = () => {
  const { countries } = useCountries();
  return (
    <div className="min-h-screen">
      <div class="flex items-center justify-center p-10 py-10">
        <div class="mx-auto w-full max-w-[550px]">
          <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 class="h2 text-center ">Booking</h2>
            <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              You're just one step away from your new home. Thank you for
              choosing our student housing campus. Please fill out the booking
              information and we'll take care of the rest.
            </p>
            <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/3">
                <div class="mb-5">
                  <label
                    for="fName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="fName"
                    id="fName"
                    placeholder="First Name"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/3">
                <div class="mb-5">
                  <label
                    for="lName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="mName"
                    id="mName"
                    placeholder="(optional)"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/3">
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
            <div class="mb-5">
              <label class="mb-3 block text-base font-medium text-[#07074D]">
                Country Of Provenience
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
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="fName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Start Of Programme
                  </label>
                  <input
                    type="text"
                    name="uniStartDate"
                    id="uniStartDate"
                    placeholder="(dd.mm.yyyy)"
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
                    End Of Programme
                  </label>
                  <input
                    type="text"
                    name="uniFinishDate"
                    id="uniFinishDate"
                    placeholder="(dd.mm.yyyy)"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
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
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
            </div>
            <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="arrivalBooking"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Arrival
                  </label>
                  <input
                    type="text"
                    name="arrivalBooking"
                    id="arrivalBooking"
                    placeholder="(dd.mm.yyyy)"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="departureBooking"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Departure
                  </label>
                  <input
                    type="text"
                    name="departureBooking"
                    id="departureBooking"
                    placeholder="(dd.mm.yyyy)"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRoom;
