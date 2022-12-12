import React from "react";

import {
  TextField as MuiInput,
  StandardTextFieldProps,

  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { UserIcon, UsersIcon } from "@heroicons/react/outline";

interface IInputProps extends StandardTextFieldProps { }

const Input: React.FC<IInputProps> = ({
  label,
  value,
  placeholder,
  size,
  disabled,
  fullWidth,
  className,
  onChange
}) => {
  return (
    <MuiInput 
      label={label}
      value={value}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
      onChange={onChange}
      variant="standard"
      sx={
        {
          border: "1px solid rgb(118, 118, 118, 0.5)",
          borderRadius: "4px",
          background: "rgb(68, 68, 68, 0.8)",

          "& .MuiFormLabel-root": {
            fontSize: "16px",
            fontFamily: "SF Pro Display",
            color: "rgb(255, 255, 255, 0.8)",
            margin: "-5px 16px"
          },

          "& .MuiInputLabel-shrink": {
            marginTop: "10px"
          },

          "& .MuiInputBase-root": {
            padding: "0px 12px 5px 0px"
          },

          "input": {
            paddingLeft: "16px",
            paddingRight: "16px",
            color: "white",
            fontFamily: "SF Pro Display",
          },

              
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiInput-underline:after': {
          borderBottom: 'none',
        },
        '& .MuiInput-root:before': {
          borderBottom: 'none'
        },
        
        '& .MuiInput-root:hover:not(.Mui-disabled):before': {
          borderBottom: 'none'
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        },
        }
      }
    />
  );
};

export default Input;