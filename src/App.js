// Create Ref With Meterial Table
import * as React from "react";
// import "./App.css";
import { dummyTabeData } from "./dummyData/dummyTabeData";
import DataTable from "./components/Table";
import Header from "./components/header";

const columns = [
  {
    title: "Member ID",
    field: "id",
    headerStyle: {
      whiteSpace: "nowrap",
    },
  },
  {
    title: "First Name",
    field: "first_name",
    headerStyle: {
      whiteSpace: "nowrap",
    },
  },
  {
    title: "Last Name",
    field: "last_name",
    headerStyle: {
      whiteSpace: "nowrap",
    },
  },
  {
    title: "Member Email",
    field: "email",
    headerStyle: {
      whiteSpace: "nowrap",
    },
  },
  {
    title: "Member Gender",
    field: "gender",
    headerStyle: {
      whiteSpace: "nowrap",
    },
  },
  {
    title: "Member ip_address",
    field: "ip_address",
    headerStyle: {
      whiteSpace: "nowrap",
    },
  },
  {
    title: "Shares",
    field: "shares",
    headerStyle: {
      whiteSpace: "nowrap",
    },
  },
];

const options = {
  search: false,
  // selection: true,
  filtering: true,

  headerStyle: {
    backgroundColor: "#E7E7E7",
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Mulish",
    padding: "8px 5px",
  },
  cellStyle: {
    padding: "10px",
  },
  maxBodyHeight: "60vh",
  pageSize: 10,
  searchFieldStyle: {
    marginRight: "6vw",
    width: "15vw",
  },
  filterCellStyle: {
    padding: "5px 18px 5px 8px",
  },
};

function App() {
  const tableRef = React.createRef();
  return (
    <div
      className="App"
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header tableRef={tableRef} />
      <div
        style={{
          height: 700,
          width: "95%",
          padding: "1rem",
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <DataTable
          tableRef={tableRef}
          title=""
          columns={columns}
          data={dummyTabeData}
          options={options}
        />
      </div>
    </div>
  );
}

export default App;
