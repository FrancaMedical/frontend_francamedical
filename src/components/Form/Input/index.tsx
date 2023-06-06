import { useForm } from "react-hook-form";

type InputProps = {
  label: string;
  customClass?: string;
  placeholder?: string;
  type: string;
  htmlFor: string;
  id: string;
  name: string;
  value: string;
};

export default function Input({
  label,
  customClass,
  placeholder,
  type,
  htmlFor,
  id,
  name,
  value,
}: InputProps) {
  const { register, handleSubmit } = useForm();
  return (
    <div className={`${customClass} mt-12`}>
      <div className="">
        <label className={`${customClass} text-xl`} htmlFor={htmlFor}>
          {label}
        </label>
        <input
          className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
}
