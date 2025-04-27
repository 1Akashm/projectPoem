import React from "react";

const Input = ({ icons: Icon, ...props }) => {
  return (
    <div className="mt-10 relative mb-6 flex gap-2">
      <div className="relative inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="size-5 text-green-300" />
      </div>
      <input
        {...props}
        className="w-full pl-2 py-2 outline-0 bg-gray-100 rounded-b-lg border-b-1 border-b-gray-300 border-r-0 border-l-0 border-t-0 focus:border focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:border-green-300  focus-green-ring-500 text-green-400 placeholder:gray-400 transition duration-200"
      />

    

    </div>
  );
};

export default Input;
