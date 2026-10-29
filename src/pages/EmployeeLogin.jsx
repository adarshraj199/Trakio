import { useState } from "react"
import LoginForm from "../components/LoginForm"
import EmployeeDashboard from "./EmployeeDashboard"


export default function EmployeeLogin({onBack}){
    const [session , setSession] = useState(null);

    if(session){
        return <EmployeeDashboard 
        user={session.user}
        token={session.token}
        onBack={onBack}/>;
    }
    return(
       <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md bg-white border border-slate-300 rounded-xl p-8 shadow-sm">

       
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-1">
            Welcome to Employee Dashboard
        </h1>
        <p className="text-sm text-slate-500 text-center mb-6">
            Please Login
        </p>


        <LoginForm role="employee" onLogin={setSession} />


        <div className="border-t border-slate-200 mt-6 pt-4 text-center">
            <button 
                onClick={onBack}
                className="text-sm text-slate-500 hover:text-slate-800 font-medium transition"
            >
                ← Back to home page
            </button>
        </div>

    </div>
</div>
    )
}