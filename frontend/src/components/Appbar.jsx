import { Link } from "react-router-dom"
import {useNavigate} from "react-router-dom";


export const Appbar = () => {
    const navigate = useNavigate();
    return <div className="m-8 shadow h-14 flex justify-between items-center px-4">

        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>

        <div className="flex h-full ml-4x">
            
        
            <button onClick= {()=>{
                localStorage.removeItem("token");
                        navigate("/signup");
                        
                }}
                className="mt-2 rounded-md bg-green-500 text-white text-sm px-6 h-10 flex items-center justify-center mr-4 hover:bg-green-600 transition"

            >
                Logout
            </button>
           
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}