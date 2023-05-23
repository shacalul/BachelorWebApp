import { React, Fragment, useState, useRef, useEffect } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { getRoles, createRole } from "../../../../api/roles";
const AddRole = ({ onSubmit, disabled }) => {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fRoleRef = useRef();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error("Error fetching roles bookings:", error);
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);

    const greatestId = roles.reduce(
      (maxId, role) => Math.max(maxId, role.id),
      0
    );
    const rolePayLoad = {
      id: greatestId + 1,
      name: fRoleRef.current.value,
    };

    for (let key in rolePayLoad) {
      if (rolePayLoad[key] === null) {
        delete rolePayLoad[key];
      }
    }
    const createdRole = await createRole(rolePayLoad);
    console.log(createdRole);

    window.location.reload();
  };

  return (
    <Fragment>
      <div>
        <button
          className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${
            disabled ? "add-disabled" : ""
          }`}
          onClick={() => handleOpen("sm")}
          disabled={disabled}
        >
          Add Role
        </button>
      </div>
      <Dialog
        open={size === "sm"}
        size={size}
        handler={handleOpen}
        style={{ paddingBottom: "50px" }}
      >
        <DialogBody divider>
          <div style={{ overflow: "hidden" }}>
            <div style={{ maxHeight: "300px" }}>
              <div className="min-h-screen">
                <div class="flex items-center justify-center p-10 py-10">
                  <div class="mx-auto w-full max-w-[550px]">
                    <div class="py-4 lg:py-4 px-4 mx-auto max-w-screen-md">
                      <h2 class="h2 text-center ">Add a new role</h2>

                      <div class="-mx-3 flex flex-wrap">
                        <div class="mb-5 w-full">
                          <label
                            for="fRole"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Role
                          </label>
                          <input
                            ref={fRoleRef}
                            type="text"
                            name="role"
                            id="role"
                            placeholder="Role"
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
                  loading={loading}
                  onClick={handleSubmit}
                  className="btn btn-secondary btn-sm w-full mx-auto"
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
export default AddRole;
