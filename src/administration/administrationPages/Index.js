import React from "react";
import Cards from "../administrationComponents/Dashboard/Cards";
import Tables from "../administrationComponents/Dashboard/Tables";
import MessagesDash from "../administrationComponents/Dashboard/MessagesDash";
import Chart from "../administrationComponents/Dashboard/Chart";
import { userData } from "../administrationComponents/Dashboard/dummyData";
const Index = () => {
  return (
    <>
      <h2 className="h2 text-center">Overview</h2>
      <Cards />
      <h2 className="h2 text-center">Analytics</h2>
      <div className="m-5">
        <Chart
          data={userData}
          title="Yearly User Analytics"
          grid
          dataKey="Tenants"
        />
        <h2 className="h2 text-center">Recent activity</h2>
        <div className="px-[-50]">
          <Tables />

          <MessagesDash />
        </div>
      </div>
    </>
  );
};

export default Index;
