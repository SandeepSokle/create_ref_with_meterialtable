import MaterialTable from "material-table";
import React, { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { createTheme } from "@mui/material";
import { MuiThemeProvider } from "@material-ui/core";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const DataTable = (props) => {
  const {  tableRef } = props;

  const breakpoints = createBreakpoints({});

  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#0094E7",
      },
      secondary: {
        main: "#0092E8",
      },
    },

    typography: {
      h6: {
        fontSize: "13px",
        [breakpoints.up("md")]: {
          fontSize: "15px",
        },
      },
    },
  });

  // React.useEffect(() => {
  //   props.tableRef &&
  //     props.tableRef.current &&
  //     props.tableRef.current.onQueryChange();
  // }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        ref={tableRef}
        icons={tableIcons}
        tableRef={tableRef}
        title={props.title}
        columns={props.columns}
        data={props.data}
        options={props.options}
        onSearchChange={(ele) => {
          console.log("In table : ", ele);
        }}
       
       
      />
      
     
    </MuiThemeProvider>
  );
};
export default DataTable;

