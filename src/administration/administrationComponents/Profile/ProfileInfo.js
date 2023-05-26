import React, { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Phone } from "react-telephone";
import { getCountryCallingCode } from "libphonenumber-js";
import { Select, Option } from "@material-tailwind/react";
import {
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles,
} from "../../../api/roles";

import { useSelector, useDispatch } from "react-redux";
import { updateAdministrator } from "../../../api/administrators";
import { updateUser } from "../../../store/reducers/authSlice";

const ProfileInfo = ({ onSubmit }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  const [roles, setRoles] = useState([]);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.surname || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [roleId, setRoleId] = useState(user.roleId || "");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: firstName,
      surname: lastName,
      email: email,
      phone: phone,
      roleId: roleId,
      id: user.id,
      password: password,
    };

    console.log(payload);

    try {
      const response = await updateAdministrator(user.id, payload);
      console.log(response);

      dispatch(updateUser(payload));
      handleOpen(null);
    } catch (error) {
      console.error("Error updating administrator:", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Fragment>
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
                      value={firstName}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                  Password
                </label>
                <div class="flex items-center space-x-6">
                  <div class="flex items-center w-full">
                    <input
                      ref={emailRef}
                      value={password}
                      onChange={handlePasswordChange}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                <div>
                  <label
                    for="pNumber"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Phone number
                  </label>
                  <div class="flex items-center w-full">
                    <input
                      ref={emailRef}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div class="mb-5">
                <label class="mb-3 block text-base font-medium text-[#07074D]">
                  Role (
                  {roles.length > 0 &&
                    capitalizeFirstLetter(
                      roles.find((r) => r.id === roleId).name
                    )}
                  )
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
                      value={roleId}
                      onChange={(e) => setRoleId(e.target.value)}
                      disabled
                    >
                      {roles.map((role) => (
                        <Option value={role.id} key={role.id}>
                          {role.name}
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
              onClick={handleSubmit}
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

// Utility functions
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
