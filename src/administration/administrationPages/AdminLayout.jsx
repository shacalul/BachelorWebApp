import React from "react";

import SideBarAdministration from "../administrationComponents/SideBarAdministration";

const AdminLayout = ({ children }) => {
  return (
    <>
      {/* Card widget */}
      <SideBarAdministration />

      <div
        style={{ maxWidth: "750px", margin: "0 auto" }}
        // className='mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6'
      >
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
