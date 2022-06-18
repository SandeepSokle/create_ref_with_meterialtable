import { Autocomplete, Button, TextField } from "@mui/material";
import { Box, Popover } from "@mui/material";
import React, { useEffect, useState, useRef, memo, forwardRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import { openSnackbar } from "../../Redux/Snackbar/snackbarStore";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const CustomSearch = forwardRef((props, ref) => {
  const { data, setTableData } = props;
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    console.log(e);
    setValue(e);
  };

  const handleUpdate = () => {
    setTableData(
      data.filter((ele) => {
        return (
          `${ele.id}`.toLowerCase().includes(value.toLowerCase()) ||
          `${ele.first_name}`.toLowerCase().includes(value.toLowerCase()) ||
          `${ele.gender}`.toLowerCase().includes(value.toLowerCase()) ||
          `${ele.last_name}`.toLowerCase().includes(value.toLowerCase()) ||
          `${ele.shares}`.toLowerCase().includes(value.toLowerCase()) ||
          `${ele.ip_address}`.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  };

  return (
    <div
      style={{
        width: 350,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SearchIcon
        onClick={() => {
          handleUpdate();
        }}
        sx={{
          cursor: "pointer",
        }}
      />
      <Search
        sx={{
          width: "80%",
        }}
      >
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          value={value}
        />
      </Search>
      {/* <SearchIconWrapper
        onClick={() => {
          handleUpdate();
        }}
        sx={{
          cursor: "pointer",
        }}
      > */}
      {/* </SearchIconWrapper> */}
    </div>
  );
});

export default CustomSearch;
