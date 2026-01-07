import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import {useEffect,useState} from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Dashboard = () => {
    const [loading,setLoading]=useState(false);
const [balance,setBalance]=useState(0);
useEffect(()=>{
    setLoading(true);
     axios.get(`${BACKEND_URL}/api/v1/account/balance`,{headers:{
         Authorization:"Bearer " + localStorage.getItem("token")
    }})
    .then(response=>{
        setLoading(false);
        setBalance(response.data.balance)
    })
    },[])
    const [click,setClick]=useState(false);

    return (
        <div >
       < Appbar name={"nishaad"} />
       <Balance balance={balance} loading={loading} setClick={setClick}/>
       <Users click={click} setClick={setClick} />
   </div>
)
}