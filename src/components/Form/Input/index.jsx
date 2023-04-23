export default function Input ({name, customClass, placeholder, type}) {
    return (
        <div className={`${customClass} mt-12`}>
           <div className="">
           <label className={`${customClass} text-xl`} htmlFor="">{name}</label>
            <input type={type} placeholder={placeholder} className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg" />
           </div>
        </div>
    )
}