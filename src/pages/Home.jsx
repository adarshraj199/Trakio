import OwnerLogin from "./OwnerLogin"
import EmployeeLogin from "./EmployeeLogin"
import OwnerRegister from "./OwnerRegister";
import { useState } from "react"
export default function Home(){

    const [currentSection , setCurrentSection] = useState('home');

    if(currentSection === 'owner'){
        return(
        <OwnerLogin onBack={ ()=> setCurrentSection('home') } 
         onGoToRegister={()=> setCurrentSection('owner-register') }
        />
        )
    }

      if (currentSection === 'owner-register') {
        return (
          <OwnerRegister 
            onBack={() => setCurrentSection('owner')} 
          />
        );
    }
    
    if(currentSection === 'employee'){
        return (
        <EmployeeLogin onBack={ ()=> setCurrentSection('home') } />
        )

    }
    return(
        <div className="min-h-screen  flex ">

    <div className="w-1/2 bg-blue-950 text-white flex flex-col justify-center items-center p-8 text-center shadow-md">
        <h1 className="text-9xl font-bold tracking-tight">
            Trakio
        </h1>
        <h3 className="text-2xl font-serif text-yellow-400 mt-4">
            Your Personal Management System
        </h3>
    </div>

    <div className="w-1/2 bg-slate-400 flex flex-col justify-center items-center p-8 shadow-md border border-slate-300">

      <div className="h-80 w-96 border-solid border-[2px] border-black bg-[#95D2F0] p-12 rounded-2xl ">

          <p className="text-xl font-thin mb-6 text-black">
            Please select your Designation
        </p>

        <div className="w-64 flex flex-col gap-4">
            <button 
                onClick={() => setCurrentSection('owner')}
                className="w-full border-[1px] border-white py-3 px-4 rounded-lg font-semibold bg-white hover:bg-black hover:text-white transition duration-200"
            >
                Owner
            </button>

            <button 
                onClick={() => setCurrentSection('employee')}
                className="w-full border-[1px] border-white py-3 px-4 rounded-lg font-semibold bg-white hover:bg-black hover:text-white transition duration-200"
            >
                Employee
            </button>
        </div>

      </div>

    </div>

</div>
      
    )
}