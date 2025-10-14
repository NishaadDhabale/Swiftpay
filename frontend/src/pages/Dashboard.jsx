import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import {useEffect,useState} from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Dashboard = () => {
const [balance,setBalance]=useState(0);
useEffect(()=>{
     axios.get(`${BACKEND_URL}/api/v1/account/balance`,{headers:{
         Authorization:"Bearer " + localStorage.getItem("token")
    }})
    .then(response=>{
        setBalance(response.data.balance)
    })
    },[])
    const [click,setClick]=useState(false);

    return (
        <div >
       < Appbar name={"nishaad"} />
       <Balance balance={balance} setClick={setClick}/>
       <Users click={click} setClick={setClick} />
   </div>
)
}