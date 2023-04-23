import React from 'react'

const Select = ({customClass, id, options, title, name, value, onChange}) => {
  
    return (
        <>
          <div className="flex flex-col mt-12">
            <label className="text-xl" htmlFor="">{title}</label>
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              className={`focus:outline-none  w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg ${customClass}`}
            >
              {options}
            </select>
          </div>
        </>
      );
}

export default Select