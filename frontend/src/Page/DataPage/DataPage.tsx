import React, { useEffect, useState } from "react";
import { Contact } from "../../Models/Contact";
import { GetContactsAll } from "../../Services/Contact";
import DataTable from "../../Components/DataTable";

type Props = {};

const DataPage = (props: Props) => {
  
  return (
    <>

        <DataTable />
     
    </>
  );
};

export default DataPage;
