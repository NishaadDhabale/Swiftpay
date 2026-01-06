import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { GoogleLogin } from "@react-oauth/google";





const SkeletonLoader = () =>
(<div className="h-screen w-full flex justify-center items-center animate-pulse">
  <div className="p-10 text-center animate-pulse">Loading data...</div>;
</div>
)
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
export const Signup = () => {

    const[FirstName,setFirstName]=useState("");
    const[LastName,setLastName]=useState("");
    const[userName,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

     
    if (loading) return <SkeletonLoader />;
   


    return(<div>{error && <ErrorAlert message={error} />}
     <div className="bg-slate-300 h-screen flex justify-center">
      
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
              setLoading(true);
              try{
                
            const response= await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
              username:userName,
              firstName:FirstName,
              lastName:LastName,
              password:password
            });

            const token=response.data.token
            setLoading(false);
            if (token!=undefined){
            localStorage.setItem("token",token)
            navigate("/dashboard")

            }else{
              setError(response.data.message)
              setLoading(false);
            }}

          catch(err){
            
    const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
    setError(errorMsg);
            setLoading(false);
          }}}


          label={"Sign up"} />
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
        </div>




        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

                    <span className="justify-center">
      <button onClick={()=>{navigate("/")}} className="bg-red-400 text-gray-50 px-10 rounded">Back</button>
    </span>


      </div>
      

    </div>

  </div>
  </div>)
}