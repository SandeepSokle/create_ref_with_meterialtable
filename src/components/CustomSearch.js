import React, { useState, forwardRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // width: "12ch",
      // "&:focus": {
      //   width: "20ch",
      // },
    },
  },
}));

const CustomSearch = forwardRef((props, ref) => {
  const { data, completeData, setTableData } = props;
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    console.log(e);
    setValue(e);
  };
 

  const handleUpdate = (type) => {
    console.log(ref.current.state.data);
    console.log(type, { completeData });
    let localData = type === "all" ? completeData : ref.current.state.data;
    setTableData(
      localData.filter((ele) => {
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
    setAnchorEl(null);
    setValue("");
  };



  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleUpdate();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div
        style={{
          width: 350,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px 0px 10px black",
          padding: "0px",
        }}
      >
        <Search
          sx={{
            width: "120%",
            padding: "0px",
          }}
        >
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            value={value}
            sx={{
              width: "150%",
            }}
          />
        </Search>
        <SearchIcon
          onClick={(e) => {
            handleClick(e);
          }}
          sx={{
            cursor: "pointer",
            width: "20%",
          }}
        />

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
      {open ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            <Stack direction="column" spacing={2}>
              <Button
                style={{
                  backgroundColor: "rgb(25 118 210)",
                  padding: ".2rem 1rem",
                  borderRadius: "4px",
                  color: "white",
                }}
                variant="contained"
                onClick={() => {
                  handleUpdate("all");
                }}
              >
                From Complete Data (Normal)
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
                  handleUpdate("table");
                }}
              >
                From Table Data (createRef)
              </Button>
            </Stack>
          </Typography>
        </Popover>
      ) : (
        ""
      )}
    </>
  );
});

export default CustomSearch;
