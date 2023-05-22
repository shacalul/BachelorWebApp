import React, { Fragment, useState } from "react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import {
  getAdministrators,
  deleteAdministrator,
} from "../../api/administrators";
import { deleteRole } from "../../api/roles";

const DeleteRoleModal = ({ id, disabled, onDeleteComplete }) => {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  const message = `Are you sure you want to delete this role? This action cannot be undone and will also remove the employees who have this role from our system.
  
  If you are ready to proceed, please click 'Confirm'. Otherwise, click 'Cancel' or simply close this modal.
  `;

  const formattedMessage = message.split("\n").map((para, index) => (
    <p key={index} className="mb-4">
      {para}
    </p>
  ));

  const handleDelete = async () => {
    console.log("Deleting role with ID:", id);

    try {
      const administrators = await getAdministrators();

      const administratorsToRemove = administrators.filter(
        (administrator) => administrator.roleId === id
      );

      const deleteResponse = await deleteRole(id);
      console.log("Role deleted. Response:", deleteResponse);

      const deletePromises = administratorsToRemove.map((administrator) =>
        deleteAdministrator(administrator.id)
      );

      await Promise.all(deletePromises);
      console.log("Administrators with the role removed successfully.");
      window.location.reload();
      onDeleteComplete(true);
      handleOpen(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <div>
        <button
          className={`text-white bg-[#fca5a5] hover:bg-[#f87171] focus:outline-none focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-bold py-2 px-4 rounded-r ${
            disabled ? "delete-disabled" : ""
          }`}
          onClick={() => handleOpen("sm")}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
      <Dialog open={size === "sm"} size={size} handler={handleOpen}>
        <DialogBody divider>{formattedMessage}</DialogBody>
        <DialogFooter>
          <div className="-mx-3 flex flex-wrap w-full">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <button
                  onClick={() => handleOpen(null)}
                  className="btn btn-secondary btn-sm w-full mx-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <button
                  className="btn btn-secondary btn-sm w-full mx-auto"
                  onClick={handleDelete}
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

export default DeleteRoleModal;
