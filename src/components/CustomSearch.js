import { Button, Slider, TextField } from "@mui/material";
import { Box, Popover } from "@mui/material";
import React, { useEffect, useState, useRef, memo, forwardRef } from "react";
import { useDispatch } from "react-redux";
// import { loaderStartActionCreater } from "../../Redux/Loader/LoaderActionCreator";
// import { openSnackbar } from "../../Redux/Snackbar/snackbarStore";
import CustomSlider from "./CustomSlider";

const CustomSearch = forwardRef((props, ref) => {
  const { data, setTableData, rangeSearchCol, columns, setOptionVal } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  // const [searchVal, setSearchVal] = useState(null);
  // console.log(data);
  // console.log(ref);

  const sliderMaxVal = (col) => {
    // let maxValue = data?.reduce((arr, a) => {
    // console.log(ref);
    // console.log(ref?.current?.state?.data);
    let maxValue = ref?.current?.state?.data?.reduce((arr, a) => {
      return [...arr, parseInt(a[col])];
    }, []);
    // console.log(maxValue);
    maxValue = Math.max(...maxValue);
    // console.log(maxValue);
    return maxValue;
  };
  const [allVal, setAllVal] = useState(
    rangeSearchCol.reduce((stateVal, col) => {
      stateVal[col[0]] = [0, 0];
      return stateVal;
    }, {})
  );

  const [allCheckbox, setAllCheckbox] = useState(
    rangeSearchCol.reduce((stateVal, col) => {
      stateVal[col[0]] = false;
      return stateVal;
    }, {})
  );

  useEffect(() => {
    if (ref?.current?.state?.data?.length > 0) {
      let myState = rangeSearchCol.reduce((stateVal, col) => {
        stateVal[col[0]] = [0, sliderMaxVal(col[1])];
        return stateVal;
      }, {});
      setAllVal(myState);
    }
  }, [ref]);

  const searchVal = useRef(null);
  const dispatch = useDispatch();

  const arrowHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const arrowHandleClose = () => {
    setAnchorEl(null);
  };

  const openP = Boolean(anchorEl);
  const id = openP ? "simple-popover" : undefined;

  const customSearch = () => {
    if (
      rangeSearchCol
        .filter(([colName, realCol]) => allCheckbox[colName])
        .some(([colName, realCol]) => allVal[colName][0] > allVal[colName][1])
    ) {
      // dispatch(
      //   openSnackbar("Minimum value cannot be greater than Maximum", "error")
      // );
    } else if (
      rangeSearchCol
        .filter(([colName, realCol]) => allCheckbox[colName])
        .some(
          ([colName, realCol]) => allVal[colName][1] > sliderMaxVal(realCol)
        )
    ) {
      // dispatch(
      //   openSnackbar(
      //     "Maximum value cannot be greater than Maximum value possible",
      //     "error"
      //   )
      // );
    } else {
      // dispatch(loaderStartActionCreater());
      // console.log(ref);
      let newData = ref?.current?.state?.data?.filter((item) =>
        rangeSearchCol
          .filter(([colName, realCol]) => allCheckbox[colName])
          .every(
            ([colName, realCol]) =>
              item[realCol] >= allVal[colName][0] &&
              item[realCol] <= allVal[colName][1]
          )
      );
      setTableData(newData);
    }
  };

  const allSearch = () => {
    if (searchVal.current?.value.trim() !== "") {
      // let newData = data?.filter((item) => {
      //   return Object.keys(item).some((key) => {
      //     if (!columns.map((col) => col.field).includes(key)) return false;

      //     let searchFun = columns.find(
      //       (col) => col.field === key
      //     )?.customFilterAndSearch;

      //     if (searchFun) console.log("mylog", key, searchFun);

      //     let boolVal = searchFun
      //       ? searchFun(searchVal.current.value, item)
      //       : String(item[key])
      //           .toLowerCase()
      //           .indexOf(searchVal.current.value.toLowerCase()) > -1;
      //     return boolVal;
      //   });
      // });

      let newData = ref?.current?.state?.data.filter((rowData) =>
        columns.some((col) => {
          if (col.customFilterAndSearch) {
            return col.customFilterAndSearch(searchVal.current.value, rowData);
          } else if (col.render) {
            let renderText = col.render(rowData);
            if (typeof renderText === "object")
              renderText = renderText.props.children;
            return (
              renderText
                .toLowerCase()
                .indexOf(searchVal.current.value.toLowerCase()) > -1
            );
          } else {
            return (
              rowData[col.field]
                ?.toString()
                .toLowerCase()
                .indexOf(searchVal.current.value.toLowerCase()) > -1
            );
          }
        })
      );
      setTableData(newData);
    } else if (searchVal.current?.value === "") {
      setTableData(data);
      if (setOptionVal) setOptionVal("All Members");
    }
  };

  return (
    <>
      <TextField
        id="outlined-search"
        className="searchBox"
        type="search"
        placeholder="Search"
        inputRef={searchVal}
        onChange={allSearch}
        InputProps={{
          endAdornment: (
            <i
              className="fa fa-caret-down"
              onClick={arrowHandleClick}
              style={{ fontSize: "20px", color: "#787878", cursor: "pointer" }}
            />
          ),
          startAdornment: (
            <i className="fa fa-search" style={{ color: "#858585" }} />
          ),
        }}
        sx={{
          backgroundColor: "#f6f6f6",
          borderRadius: "5px",
          "& input": {
            padding: "10px",
          },
          "& fieldset": {
            display: "none",
          },
        }}
      />
      <Popover
        id={id}
        open={openP}
        anchorEl={anchorEl}
        onClose={arrowHandleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: "300px" }}>
          <div
            style={{
              display: "grid",
              gap: "10px",
              width: "100%",
              padding: "20px 30px 20px",
              alignItems: "center",
            }}
          >
            {rangeSearchCol.map((col) => (
              <CustomSlider
                data={data}
                col={col}
                ref={ref}
                allVal={allVal}
                setAllVal={setAllVal}
                allCheckbox={allCheckbox}
                setAllCheckbox={setAllCheckbox}
              />
            ))}
          </div>
          <hr className="m-0" />
          <div
            style={{
              padding: "20px 20px 20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={arrowHandleClose}>Cancel</Button>
            <Button variant="contained" onClick={customSearch}>
              Search
            </Button>
          </div>
        </Box>
      </Popover>
    </>
  );
});

export default memo(CustomSearch);
