// import { React, Fragment, useState, useEffect } from "react";
// import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

// import { deleteCustomer, getCustomers } from "../../../../api/customers";
// import { getFinances, deleteFinance } from "../../../../api/finances";
// import {
//   getRoomBookings,
//   deleteRoomBookings,
// } from "../../../../api/roombookings";
// const DeleteModal = ({ id, disabled, onDeleteComplete }) => {
//   const [size, setSize] = useState(null);
//   const handleOpen = (value) => setSize(value);
//   const [customers, setCustomers] = useState([]);
//   const [roomBookings, setRoomBookings] = useState([]);
//   const [finances, setFinances] = useState([]);

//   const message = `Are you sure you want to delete this tenant? This action will remove their information from our system and cannot be undone.

//   If you are ready to proceed, please click 'Confirm'. Otherwise, click 'Cancel' or simply close this modal.
//   `;
//   const formattedMessage = message
//     .split("\n")
//     .map((para) => <p className="mb-4">{para}</p>);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const customersData = await getCustomers();
//       setCustomers(customersData);
//       const bookingsData = await getRoomBookings();
//       setRoomBookings(bookingsData);
//       const financesData = await getFinances();
//       setFinances(financesData);
//     } catch (error) {
//       console.error("Error fetching room bookings:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const hasRoomBookings = roomBookings.some(
//         (booking) => booking.customerId === id
//       );

//       const hasFinances = finances.some((finance) => finance.customerId === id);

//       if (hasRoomBookings) {
//         const deletedBookings = await deleteRoomBookings(id);
//         console.log("Related room bookings deleted:", deletedBookings);
//       }

//       if (hasFinances) {
//         const deletedFinances = await deleteFinance(id);
//         console.log("Related finances deleted:", deletedFinances);
//       }

//       const deleteResponse = await deleteCustomer(id);
//       console.log("Customer deleted. Response:", deleteResponse);

//       onDeleteComplete(true);
//       handleOpen(null);
//     } catch (error) {
//       console.error("Error deleting customer:", error);
//     }
//   };
//   return (
//     <Fragment>
//       <div>
//         <button
//           className={`text-white bg-[#fca5a5] hover:bg-[#f87171] focus:outline-none focus:ring-4 focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-bold py-2 px-4 rounded-r ${
//             disabled ? "delete-disabled" : ""
//           }`}
//           onClick={() => handleOpen("sm")}
//           disabled={disabled}
//         >
//           Delete
//         </button>
//       </div>
//       <Dialog open={size === "sm"} size={size} handler={handleOpen}>
//         <DialogBody divider>
//           <p>{formattedMessage}</p>
//         </DialogBody>
//         <DialogFooter>
//           <div class="-mx-3 flex flex-wrap w-full">
//             <div class="w-full px-3 sm:w-1/2 ">
//               <div class="mb-5 ">
//                 <button
//                   onClick={() => handleOpen(null)}
//                   className="btn btn-secondary btn-sm w-full mx-auto"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//             <div class="w-full px-3 sm:w-1/2">
//               <div class="mb-5">
//                 <button
//                   className="btn btn-secondary btn-sm w-full mx-auto"
//                   onClick={() => handleDelete(id)}
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </DialogFooter>
//       </Dialog>
//     </Fragment>
//   );
// };
// export default DeleteModal;
