import React, { useContext } from "react";
import Image from "next/image";

const ContentMain = (props: any) => {
  const { title, showHeader, showButtonAdd, onClick } = props;

  return (
    <div className="h-full px-8 py-12 ml-24 min-h-screen mt-16 bg-whiteEdited dark:bg-darkSecondary">
      <div className=" bg-whiteEdited dark:bg-darkSecondary rounded-md p-6">
        {showHeader == true ? (
          <div className="w-full bg-blueMain dark:bg-dark rounded-t-3xl p-5 flex justify-between items-center">
            <div>
              <h1 className="text-3xl text-white">{title} </h1>
            </div>

            {showButtonAdd == true ? (
              <div className="cursor-pointer">
                <Image
                  alt=""
                  onClick={onClick}
                  src="img/VectorAdd.svg"
                  width={36}
                  height={36}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {props.children}
      </div>
    </div>
  );
};

export default ContentMain;
