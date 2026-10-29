import { useState } from "react";
import NewAsset from "./NewAsset";
import AddEmployee from "./AddEmployee";
import Inventory from "./Inventory";

export default function OwnerDashboard({ onBack, user, token }) {
    const [currentSection, setCurrentSection] = useState('dashboard');

    if (currentSection === 'addEmployee') {
        return (
            <AddEmployee 
                token={token} 
                onBack={() => setCurrentSection('dashboard')} 
            />
        );
    }


    if (currentSection === 'newAsset') {
        return (
            <NewAsset 
                token={token}
                onBack={() => setCurrentSection('dashboard')} 
            />
        );
    }

     if (currentSection === 'inventory') {
        return( 
        <Inventory 
        token={token} onBack={() => setCurrentSection('dashboard')}
         />
        );
    }


    if( currentSection === 'lowStock'){
        return(
            <Inventory 
            token={token} 
            filter='low-stock'
            title="low stock item less than 10 units" 
            onBack={()=> setCurrentSection('dashboard') } />
        )
    }

    if(currentSection === 'outOfStock'){
        return(
            <Inventory 
            token={token}
            filter='out-of-stock'
            title="out of stock items with o quantity"
            onBack={()=> setCurrentSection('dashboard')} />
        )
    }

    return (
       <div className="min-h-screen bg-slate-100 p-8">
    <div className="max-w-4xl mx-auto">
        

        <div className="flex justify-between items-center pb-6 border-b border-slate-300">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome, {user?.name || 'Owner'}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                    Warehouse Owner Dashboard
                </p>
            </div>

            <button 
                onClick={onBack}
                className="bg-white border border-slate-300 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg transition"
            >
                Back to Home
            </button>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

      
            <button 
                onClick={() => setCurrentSection('addEmployee')}
                className="bg-white border border-slate-300 hover:border-blue-500 rounded-xl p-6 text-left shadow-sm hover:shadow transition"
            >
                <h3 className="text-lg font-bold text-slate-900">Add Warehouse Worker</h3>
                <p className="text-sm text-slate-500 mt-1">Create logins for new warehouse staff</p>
            </button>

           
            <button 
                onClick={() => setCurrentSection('newAsset')}
                className="bg-white border border-slate-300 hover:border-blue-500 rounded-xl p-6 text-left shadow-sm hover:shadow transition"
            >
                <h3 className="text-lg font-bold text-slate-900">Add New Asset</h3>
                <p className="text-sm text-slate-500 mt-1">Register new products and incoming stock</p>
            </button>

        
            <button 
                onClick={() => setCurrentSection('inventory')}
                className="bg-white border border-slate-300 hover:border-blue-500 rounded-xl p-6 text-left shadow-sm hover:shadow transition"
            >
                <h3 className="text-lg font-bold text-slate-900">Asset Inventory List</h3>
                <p className="text-sm text-slate-500 mt-1">View all assets, details, and dispatch items</p>
            </button>

          
            <button 
                onClick={() => setCurrentSection('lowStock')}
                className="bg-white border border-slate-300 hover:border-amber-500 rounded-xl p-6 text-left shadow-sm hover:shadow transition"
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">Low Stock Items</h3>
                    
                </div>
                <p className="text-sm text-slate-500 mt-1">Quick check on items running low</p>
            </button>


            <button 
                onClick={() => setCurrentSection('outOfStock')}
                className="bg-white border border-slate-300 hover:border-red-500 rounded-xl p-6 text-left shadow-sm hover:shadow transition md:col-span-2"
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">Out of Stock Items</h3>
                  
                </div>
                <p className="text-sm text-slate-500 mt-1">Items that need urgent restocking</p>
            </button>

        </div>

    </div>
</div>
    );
}