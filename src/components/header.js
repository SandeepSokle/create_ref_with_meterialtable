// import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import CustomSearch from "./CustomSearch";
import { forwardRef, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

export const Header = forwardRef((props, ref) => {
  const {
    data,
    // tableRef,
    tableData,
    setTableData,
    completeData,
    columns,
  } = props;

  console.log(ref?.current?.state?.data);


  const handleDownload = (type) => {
    let localData = type === "all" ? completeData : ref.current.state.data;
    console.log(localData);
    let newData = localData.map((ele) => {
      return `${ele.id},${ele.first_name},${ele.last_name},${ele.email},${ele.gender},${ele.ip_address},${ele.shares}`;
    });
    let finalData = [
      `"Member ID","First Name","Last Name","Member Email","Member Gender","Member ip_address","Shares"`,
      ...newData,
    ].join("\n");
    let hiddenElement = document.createElement("a");
    hiddenElement.href =
      "data:text/csv;charset=utf-8," + encodeURIComponent(finalData);
    hiddenElement.target = "_blank";
    hiddenElement.download = `ss_${type}_data.csv`;
    hiddenElement.click();
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#1976d2!important" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            Create Ref With Meterial Table
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          <Search>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                margin: "0rem 1rem",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgb(25 118 210)",
                  padding: ".2rem 1rem",
                  borderRadius: "4px",
                  color: "white",
                }}
                onClick={() => {
                  handleDownload("all");
                }}
              >
                Complete{" "}
                <DownloadIcon
                  sx={{
                    marginLeft: ".5rem",
                  }}
                ></DownloadIcon>
              </Button>
              <Button
                style={{
                  backgroundColor: "rgb(25 118 210)",
                  padding: ".2rem 1rem",
                  borderRadius: "4px",
                  color: "white",
                }}
                variant="contained"
                onClick={() => {
                  handleDownload("table");
                }}
              >
                Table{" "}
                <DownloadIcon
                  sx={{
                    marginLeft: ".5rem",
                  }}
                ></DownloadIcon>
              </Button>
              {/* <CSVLink data={completeData}>Normal</CSVLink>
              <CSVLink data={ref?.current?.state?.data || []}>createRf</CSVLink> */}
            </Stack>
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            /> */}
            <CustomSearch
              data={data || []}
              ref={ref}
              tableData={tableData}
              setTableData={setTableData}
              rangeSearchCol={[["Shares", "shares"]]}
              columns={columns}
              completeData={completeData}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
});
