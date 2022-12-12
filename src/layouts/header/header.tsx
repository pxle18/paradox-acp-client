import React from "react";

import Logo from "assets/vectors/santander-logo.svg";

const Header: React.FC = () => {
  return (
    <div 
      className="
        flex flex-row justify-between 
        fixed left-0 top-0 
        w-full h-20 z-20 
        bg-white shadow-[rgb(222,237,242)_0px_2px_15px]
        border-b-[#cedee7] border-t-primary
        border-t-4 border-b-[1px]
        
        md:border-t-[5px]
        md:min-h-[100px]"
    >
      <a
        className="flex pl-8 place-items-center"
      >
        <img src={Logo} className="
          hidden
          w-36
          
          md:inline-block
          md:float-left
        " alt="logo" />

        <svg 
          width="1" 
          height="34" 
          viewBox="0 0 1 34" 
          fill="none" 
          className="
            hidden
            mt-2 mx-4 mb-0
            
            lg:block
            lg:float-left
          "
        >
          <rect y="0.5" width="1" height="33" fill="#CCCCCC"></rect>
        </svg>

        <p
          className="
            hidden
            font-headline
            text-2xl
            mt-[5px]
            text-gray-900

            lg:block
            lg:float-left
          ">
          Banking
        </p>
      </a>
    </div>
  );
};

export default Header;