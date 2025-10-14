import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


export const Signup = () => {

    const[FirstName,setFirstName]=useState("");
    const[LastName,setLastName]=useState("");
    const[userName,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox  type="text"  onChange={e=>{
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox
         type="text" onChange={e=>{
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox
        type="text" onChange={e=>{
          setUserName(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox
        type="password" onChange={e=>{
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button
          onClick={

            async()=>{
              try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
              username:userName,
              firstName:FirstName,
              lastName:LastName,
              password:password
            });

            const token=response.data.token
            if (token!=undefined){
            localStorage.setItem("token",token)
            navigate("/dashboard")

            }}

          catch(err){
            alert("User Already Exists try an different email or sign in")
          }}}


          label={"Sign up"} />
        </div>




        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

                    <span className="justify-center">
      <button onClick={()=>{navigate("/")}} className="bg-red-400 text-gray-50 px-10 rounded">Back</button>
    </span>


      </div>
    </div>
  </div>
}