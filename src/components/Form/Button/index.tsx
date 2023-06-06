import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  name: string;
  customClass?: string;
  type: any;
  onClick?: any;
};

export default function Button({
  name,
  customClass,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${customClass} dark:text-white  w-full rounded-xl p-4 text-xl hover:opacity-90 transition-all duration-1000`}
    >
      {name}
    </button>
  );
}
