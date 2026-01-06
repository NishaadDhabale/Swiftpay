import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import { GoogleLogin } from "@react-oauth/google";

export const Signin = () => {
 const navigate = useNavigate();
 const[username,setUserName]=useState("");
     const[password,setPassword]=useState("");
    return(
      <div>
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
       <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox
       onChange={e=>{
          setUserName(e.target.value);
        }}placeholder="harkirat@gmail.com" type="text" label={"Email"} />
        <InputBox
        type="password"
        onChange={e=>{
          setPassword(e.target.value);
        }}
        placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
            const response= await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
              username:username,
              password:password
            });
            console.log("request sent",response)
            const token=response.data.token
            if(token!=undefined){

            localStorage.setItem("token",token)
            navigate("/dashboard")}


        else{ alert("Invalid Credentials")}

           } }
           label={"Sign in"} />

        </div>
         <div className="rounded-2xl flex justify-center w-full">
              <GoogleLogin className="w-full flex justify-center mt-4"
      onSuccess={async (credentialResponse) => {
        const idToken = credentialResponse.credential;

        // Send token to backend
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/auth/google`, {
          token: idToken,
        });

        
        localStorage.setItem("token", res.data.token); // your app JWT
        navigate("/dashboard");
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
    </div>
        <BottomWarning
          label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />

            <span className="justify-center">
      <button onClick={()=>{navigate("/")}} className="bg-red-400 text-gray-50 px-10 rounded">Back</button>
    </span>

    </div>
      </div>

  </div>
  </div>
   ) }