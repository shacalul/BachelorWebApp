import { React, Fragment, useState, useRef, useEffect } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Phone } from "react-telephone";
import { getCountryCallingCode } from "libphonenumber-js";
import { Select, Option } from "@material-tailwind/react";
import {
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles,
} from "../../api/roles";
const ProfileInfo = ({ onSubmit }) => {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [countryCode, setCountryCode] = useState("");
  const [roles, setRoles] = useState([]);

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const countryRef = useRef();
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, [dataUpdated]);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching Roles:", error);
    }
  };
  const handleSubmit = (e) => {
    const payload = {
      firstName: fNameRef.current.value,
      surname: lNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber:
        "+" +
        getCountryCallingCode(countryCode.toUpperCase()) +
        phoneRef.current.value,
    };

    onSubmit(payload);
    handleOpen(null);
  };

  return (
    <Fragment>
      <div style={{ maxHeight: "500px" }}>
        <div className="min-h-screen">
          <div class="flex items-center justify-center ">
            <div class="mx-auto w-full max-w-[550px]">
              <div class="py-4 lg:py-4 px-4 mx-auto max-w-screen-md">
                <h2 class="h2 text-center ">Profile</h2>

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
                        ref={fNameRef}
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
                        ref={lNameRef}
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
                        ref={emailRef}
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
                          <Phone.Country
                            ref={countryRef}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
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
                          <Phone.Number
                            ref={phoneRef}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </Phone>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-5">
                  <label class="mb-3 block text-base font-medium text-[#07074D]">
                    Role
                  </label>
                  <div class="flex items-center space-x-6">
                    <div
                      className="w-full border"
                      name="rolesDropDown"
                      id="rolesDropDown"
                    >
                      <Select
                        size="lg"
                        label="Select Role"
                        onChange={(value) => setRoles(value)}
                      >
                        {roles.map((role) => (
                          <Option key={role.id}>{role.name}</Option>
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

      <div class="-mx-3 flex flex-wrap w-full mt-10">
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
              onClick={(e) => handleSubmit(e)}
              className="btn btn-secondary btn-sm w-full mx-auto"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ProfileInfo;
