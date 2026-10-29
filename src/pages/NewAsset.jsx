import { API_URL } from "./config";

export default function NewAsset({ onBack, token }) {

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;

        const assetData = {
            name: form.name.value.trim(),
            quantity: Number(form.quantity.value),
            price: Number(form.price.value),
            purchaseDate: form.date.value,
            category: form.category.value,
            supplier: form.supplier.value.trim(),
            lowStockThreshold: 10,
        };

        try {
            const response = await fetch(`${API_URL}/api/assets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(assetData),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Error creating asset');
                return;
            }

            alert(`Asset "${assetData.name}" created successfully in MongoDB!`);
            form.reset();
            if (onBack) onBack(); 
        } catch (error) {
            console.error('Error connecting to server:', error);
            alert('Cannot connect to backend server.');
        }
    }

    return (
       <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 py-8">
    <div className="w-full max-w-lg bg-white border border-slate-300 rounded-xl p-8 shadow-sm">

     
        <h2 className="text-2xl font-bold text-slate-900 text-center">
            Add New Asset
        </h2>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
            Register incoming warehouse inventory and stock
        </p>


        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
                <label htmlFor="itemname" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Asset / Product Name
                </label>
                <input 
                    type="text" 
                    name="name" 
                    id="itemname" 
                    required 
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Category
                    </label>
                    <select 
                        name="category" 
                        id="category" 
                        required 
                        defaultValue=""
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                    >
                        <option value="" disabled>Select category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Bike">Bike</option>
                        <option value="Car">Car</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Stationery">Stationery</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="supplier" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Supplier Name
                    </label>
                    <input 
                        type="text" 
                        name="supplier" 
                        id="supplier" 
                        required 
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                    />
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="quantity" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Quantity
                    </label>
                    <input 
                        type="number" 
                        name="quantity" 
                        id="quantity" 
                        min="0" 
                        required 
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Price Per Piece (₹)
                    </label>
                    <input 
                        type="number" 
                        name="price" 
                        id="price" 
                        min="0" 
                        step="0.01" 
                        required 
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                    />
                </div>
            </div>


            <div>
                <label htmlFor="date" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Purchase Date
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition shadow-sm mt-3"
            >
                Save Asset to Warehouse
            </button>
        </form>

 
        <div className="border-t border-slate-200 mt-6 pt-4 text-center">
            <button 
                onClick={onBack}
                className="text-sm text-slate-500 hover:text-slate-800 font-medium transition"
            >
                ← Cancel & Back to Dashboard
            </button>
        </div>

    </div>
</div>
    );
}