
const variantClasses={
    primary:" text-white bg-gray-800 hover:bg-gray-900  ",
    secondary:" text-white bg-red-400 hover:bg-red-500"
}

export function Button({label, onClick,tag="primary"}) {

    return <button onClick={onClick} type="button" className={variantClasses[tag] + ' ' + "w-full focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"}>{label}</button>
}
