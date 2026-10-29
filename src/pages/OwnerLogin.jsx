import { useState } from "react"
import LoginForm from "../components/LoginForm"
import OwnerDashboard from "./OwnerDashboard";
export default function OwnerLogin({onBack , onGoToRegister}){

    const [session , setSession] = useState(null);

    if(session){
        return <OwnerDashboard 
        onBack={onBack}
        user={session.user}
        token={session.token}
        />;
    }

    return(
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md bg-white border border-slate-300 rounded-xl p-8 shadow-sm">


        <h1 className="text-2xl font-bold text-slate-900 text-center">
            Owner Portal
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
            Please sign in to access your warehouse dashboard
        </p>

    
        <div className="mb-6">
            <LoginForm role="owner" onLogin={setSession} />
        </div>

       
        <div className="border-t border-slate-200 pt-5 text-center">
            <p className="text-sm text-slate-600">
                New Owner?{' '}
                <button 
                    type="button" 
                    onClick={onGoToRegister}
                    className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                    Create an account
                </button>
            </p>

            <button 
                onClick={onBack}
                className="mt-4 text-sm text-slate-500 hover:text-slate-800 font-medium transition"
            >
                ← Back to home page
            </button>
        </div>

    </div>
</div>
    )
}