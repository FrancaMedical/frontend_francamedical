export default function Button ({name, customClass}) {
    return (
        <div className="w-full">
            <button className={`${customClass}  w-full rounded-xl p-4 text-xl hover:opacity-90 transition-all duration-1000`}>{name}</button>
        </div>
    )
}