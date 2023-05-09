import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBaradministration = () => {
  const handleSignout = (e) => {
    e.preventDefault();
    // signout using redux
  };
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to="/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/tenants"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Tenants</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/invoices"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Invoices</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/Finances"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Finances</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/profile"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/administrators"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">
                Administrators
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signout"
              onClick={(e) => handleSignout(e)}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBaradministration;
