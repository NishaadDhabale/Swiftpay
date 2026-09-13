import {
  BrowserRouter ,
  Route ,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney.jsx";
import { Initial } from "./pages/Initial.jsx";
import LandingPage from "./pages/Landing.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import {UpdateDetails} from "./pages/UpdateDetails.jsx";
import { DashboardLayout } from "./components/layout/DashboardLayout.jsx";
import { Transactions } from "./pages/Transactions.jsx";

function App() {


  return (
   <>
   <BrowserRouter>

   <Routes>
    <Route path="/" element={<LandingPage/>}/>
        <Route path="/landing2" element={<Initial/>}/>
        <Route path="/signup" element={<Signup  />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route
    path="/update"
    element={<ProtectedRoute><UpdateDetails /></ProtectedRoute>}
/>
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/send" element={<SendMoney />} />
        </Route>
   </Routes>

   </BrowserRouter>


   </>

  )
}

export default App
