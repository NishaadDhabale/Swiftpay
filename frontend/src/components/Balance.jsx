export const Balance = ({balance}) => {
    return <div className="m-8 shadow h-14 flex justify-start gap-x-4">
        <div className="flex flex-col justify-center h-full ml-4 font-bold">
            Your Balance
        </div>
            <div className="flex flex-col justify-center h-full mr-4 font-semibold ">
  Rs {balance}
            </div>
           
       
    </div>
}