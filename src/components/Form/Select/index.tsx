import React from "react";

const Select = ({
  customClass,
  id,
  options,
  title,
  name,
  value,
  onChange,
}: any) => {
  return (
    <>
      <div className={`flex flex-col ${customClass}`}>
        <label className="text-xl dark:text-white" htmlFor="">
          {title}
        </label>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`focus:outline-none dark:text-white  w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg ${customClass}`}
        >
          {options}
        </select>
      </div>
    </>
  );
};

export default Select;
