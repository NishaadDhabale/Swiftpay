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


const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center justify-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 rounded-lg animate-pulse" role="alert">
      <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      <div className="ml-3 text-sm font-medium">
        {message}
      </div>
    </div>
  );
};
const SkeletonLoader = () => (
  <div className="h-screen w-full flex justify-center items-center flex-col gap-4 w-64 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

export const Signin = () => {
 const navigate = useNavigate();
 const[username,setUserName]=useState("");
     const[password,setPassword]=useState("");
     const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  if (loading) return <SkeletonLoader />;
  
    return(
      
      <div>
        {error && <ErrorAlert message={error} />}
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
            setLoading(true);
            try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
              username:username,
              password:password
            });
            console.log("request sent",response)
            const token=response.data.token
            setLoading(false);
            if(token!=undefined){

            localStorage.setItem("token",token)
            navigate("/dashboard")}


        else{ setError(response.data.message)
          }
        
           } catch(error){
             const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
    setError(errorMsg);
    setLoading(false);
           }}
          }
           label={"Sign in"} />

        </div>
         <div className="rounded-2xl flex justify-center w-full">
              <GoogleLogin className="w-full flex justify-center mt-4"
      onSuccess={async (credentialResponse) => {
        setLoading(true);
        const idToken = credentialResponse.credential;

        // Send token to backend
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/auth/google`, {
          token: idToken,
        });
        setLoading(false);
       

        
        localStorage.setItem("token", res.data.token); // your app JWT
        
        navigate("/dashboard");
      }}
      onError={() => {
         {error && <ErrorAlert message={"Login Failed"} />}
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