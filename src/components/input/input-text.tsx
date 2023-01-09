import React from "react";

import {
  TextField as MuiInput,
  StandardTextFieldProps,

  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { UserIcon, UsersIcon } from "@heroicons/react/outline";

interface IInputProps extends StandardTextFieldProps { 
  icon?: JSX.Element
}

const Input: React.FC<IInputProps> = ({
  label,
  placeholder,
  icon,
  size,
  disabled,
  fullWidth,
  className,
  type,
  onChange
}) => {
  return (
    <div className="input-text relative">
      { icon &&
        <div className="w-[10px] absolute top-[9.3px] left-[5px]">
          { icon }
        </div>
      }
      <input 
        onChange={onChange}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className="box-border placeholder:text-gray-800 placeholder:font-medium ease-in-out transition-all border-[1px] border-[rgb(48,48,48)] hover:border-[#5a5a5a] focus:border-[#5a5a5a8f] h-7 w-full font-normal pr-2 text-xs rounded-sm bg-[#242424] text-white pl-5"
      />
    </div>
  );
};

export default Input;