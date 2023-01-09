import React from "react";

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { 
  icon?: JSX.Element
  items?: [];
  ref?: React.Ref<HTMLSelectElement>;
}

const Select: React.FC<ISelectProps> = ({
  icon,
  items,
  disabled,
  className,
  ref,
  onChange
}) => {
  return (
    <div className="input-text relative">
      { icon &&
        <div className="w-[10px] absolute top-[9.3px] left-[5px]">
          { icon }
        </div>
      }


      <select 
        ref={ref}
        onChange={onChange}
        disabled={disabled}
        className="flex flex-grow box-border placeholder:text-gray-800 placeholder:font-medium ease-in-out transition-all border-[1px] border-[rgb(48,48,48)] hover:border-[#5a5a5a] focus:border-[#5a5a5a8f] h-7 w-full font-normal leading-3 text-xs rounded-sm bg-[#242424] text-white pl-5"
        >
          <option value="" disabled selected>Bitte auswählen:</option>
          { 
            items && 
              items.map(item =>
                <option value={item}>{item}</option>
              )
          }
        </select>
    </div>
  );
};

export default Select;