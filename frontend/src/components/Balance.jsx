export const Balance = ({balance,setClick,loading}) => {
    return <div onClick={()=>{
        setClick(false)
    }} className="m-8 shadow h-14 flex justify-start gap-x-4">
        <div className="flex flex-col justify-center h-full ml-4 font-bold">
            Your Balance
        </div>
            {!loading ? <div className="flex flex-col justify-center h-full mr-4 font-semibold ">
  Rs {balance}
            </div> :<div className="flex items-center"> <div className="h-2 bg-gray-200 dashed rounded w-12"></div></div>}


    </div>
}