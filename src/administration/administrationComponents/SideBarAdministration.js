import React, {useState} from "react";

const SideBarAdministration = () => {
  
  
  return (
   

<aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              
               <span className="ml-3">Dashboard</span>
            </a>
         </li>
  
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
           
               <span className="flex-1 ml-3 whitespace-nowrap">Tenants</span>
               
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               
               <span className="flex-1 ml-3 whitespace-nowrap">Invoices</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              
               <span className="flex-1 ml-3 whitespace-nowrap">Finances</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              
               <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               
               <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </a>
         </li>
        
      </ul>
   </div>
</aside>


   


  );
};

export default SideBarAdministration;
