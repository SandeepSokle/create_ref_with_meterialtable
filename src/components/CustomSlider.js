import React, { useState, useEffect, forwardRef } from "react";
import {
  Slider,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SliderThumb } from "@mui/material/Slider";
import PropTypes from "prop-types";

const CustomSlider = forwardRef((props,ref) => {
  const { data, col, allVal, setAllVal, allCheckbox, setAllCheckbox } = props;
  const [colName, realCol] = col;
  const [maxVal, setMaxVal] = useState(0);
  // const [value, setValue] = useState([0, maxVal]);
  const handleSliderChange = (event, newValue) => {
    // setValue(newValue);
    setAllVal({ ...allVal, [colName]: newValue });
  };

  const sliderMaxVal = () => {
    let maxValue = ref?.current?.state?.data?.reduce((arr, a) => {
      return [...arr, a[realCol]];
    }, []);
    maxValue = Math.max(...maxValue);
    setMaxVal(maxValue);
    // let myobj = { ...allVal, [col]: [0, maxValue] };
    // console.log("myobj", myobj);
    // setAllVal({ ...allVal, [col]: [0, maxValue] });
  };

  useEffect(() => {
    if (ref?.current?.state?.data?.length > 0) sliderMaxVal();
  }, [ref]);

  const AmountSlider = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {},
          thumb: {
            backgroundColor: "transparent",
          },
          active: {},
          valueLabel: {
            transform: "translateY(80%) scale(1)!important",
            background: "transparent",
            color: "#969696",
            fontSize: "14px",
          },
          track: {
            backgroundColor: "transparent",
            border: "none",
          },
          rail: {
            backgroundColor: "#d9d9d9",
          },
        },
      },
    },
  });

  function ThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 2C0 0.895431 0.895431 0 2 0H10C11.1046 0 12 0.895431 12 2V9.20695C12 9.73965 11.7875 10.2503 11.4096 10.6258L7.40957 14.5996C6.62959 15.3745 5.37041 15.3745 4.59043 14.5996L0.590431 10.6258C0.212518 10.2503 0 9.73965 0 9.20695V2Z"
            fill="#0092E8"
          />
        </svg>
      </SliderThumb>
    );
  }

  ThumbComponent.propTypes = {
    children: PropTypes.node,
  };

  const allowOnlyPositiveNumber = (e) => {
    if (window.event) {
      var charCode = window.event.keyCode;
    } else if (e) {
      var charCode = e.which;
    } else {
      return true;
    }
    if (charCode >= 48 && charCode <= 57) return true;
    else {
      alert("Please enter only positive Integer Number");
      e.preventDefault();
      return false;
    }
  };

  const handleCheckbox = (e) => {
    setAllCheckbox({
      ...allCheckbox,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <ThemeProvider theme={AmountSlider}>
      <FormControlLabel
        control={
          <Checkbox
            name={colName}
            checked={allCheckbox[colName]}
            onChange={handleCheckbox}
          />
        }
        label={colName}
      />
      {allCheckbox[colName] && (
        <>
          <Box
            sx={{
              display: "grid",
              gap: "25px",
              width: "100%",
              alignItems: "center",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <TextField
              id="outlined"
              type="text"
              label="Min"
              placeholder="Min"
              value={allVal[colName][0]}
              onChange={(e) =>
                handleSliderChange(e, [
                  Number(e.target.value),
                  allVal[colName][1],
                ])
              }
              color="grey"
              onKeyPress={allowOnlyPositiveNumber}
              error={allVal[colName][0] > allVal[colName][1]}
              focused
              sx={{ ".MuiOutlinedInput-root": { height: 42 } }}
            />
            <TextField
              id="outlined"
              type="text"
              label={`Max: ${maxVal}`}
              placeholder="Max"
              value={allVal[colName][1]}
              onChange={(e) =>
                handleSliderChange(e, [
                  allVal[colName][0],
                  Number(e.target.value),
                ])
              }
              color="grey"
              onKeyPress={allowOnlyPositiveNumber}
              error={
                allVal[colName][0] > allVal[colName][1] ||
                allVal[colName][1] > maxVal
              }
              focused
              sx={{ ".MuiOutlinedInput-root": { height: 42 } }}
            />
          </Box>
          {/* <Slider
            // getAriaLabel={() => "Temperature range"}
            components={{ Thumb: ThumbComponent }}
            value={allVal[colName]}
            onChange={handleSliderChange}
            valueLabelDisplay="on"
            max={maxVal}
            // defaultValue={[0, 50]}
            sx={{
              "& .MuiSlider-thumb": {
                boxShadow: "none!important",
                "&::before": {
                  boxShadow: "none",
                },
              },
            }}
          /> */}
        </>
      )}
    </ThemeProvider>
  );
});

export default CustomSlider;
