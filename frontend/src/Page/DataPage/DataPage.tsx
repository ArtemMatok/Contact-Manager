import React, { useEffect, useState } from "react";
import { Contact } from "../../Models/Contact";
import { GetContactsAll } from "../../Services/Contact";
import DataTable from "../../Components/DataTable";
import { Link } from "react-router-dom";

type Props = {};

const DataPage = (props: Props) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <DataTable />
        <Link
          to={"/"}
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default DataPage;
