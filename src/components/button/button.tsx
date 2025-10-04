import React from "react";

import {
  Button as MuiButton,
  ButtonProps
} from "@mui/material";

interface IButtonProps extends ButtonProps { }

const Button: React.FC<IButtonProps> = ({
  variant,
  color,
  children,
  className,
  size,
  disabled,
  fullWidth,
  onClick,
}) => {
  return (
    <div 
      onClick={() => { !disabled && onClick && onClick(null) } }
      id="Void-button"
      className={"bg-[#242424] " + (disabled == true ? "opacity-50 cursor-no-drop " : "") + "px-2 h-6 font-medium text-xs rounded-sm inline-flex justify-center items-center cursor-pointer hover:bg-[rgba(255,_255,_255,_0.2)] transition-all ease-in transform active:scale-[0.97] " + className}
    >
        { children }
    </div>
  );
};

export default Button;