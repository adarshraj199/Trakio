import { useEffect, useState } from 'react';
import { API_URL } from './config';

export default function Inventory({ onBack, token, filter = 'all' , title = 'Inventory' }) {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAssets() {
            try {
                const url = filter === 'all' ?`${API_URL}/api/assets` : `${API_URL}/api/assets?status=${filter}`;
                
                const response = await fetch(url , {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setAssets(data.assets);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchAssets();
    }, [token , filter]);

    const handleSelectAsset = async (asset) => {
        setSelectedAsset(asset);
        try {
            const response = await fetch(`${API_URL}/api/assets/${asset._id}/movements`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setMovements(data.movements || []);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDispatch = async (e) => {
        e.preventDefault();
        const form = e.target;
        const qtyToDeduct = Number(form.quantity.value);

        const dispatchData = {
            quantity: qtyToDeduct,
            recipient: form.recipient.value,
            destination: form.destination.value,
            paymentStatus: form.paymentStatus.value,
        };

        try {
            const response = await fetch(`${API_URL}/api/assets/${selectedAsset._id}/dispatch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(dispatchData),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Error updating stock');
                return;
            }

            const newQuantity = data.currentQuantity !== undefined 
                ? data.currentQuantity 
                : (data.asset?.quantity !== undefined ? data.asset.quantity : selectedAsset.quantity - qtyToDeduct);

            setSelectedAsset((prev) => ({ 
                ...prev, 
                quantity: newQuantity 
            }));

            if (data.movement) {
                setMovements((prev) => [data.movement, ...prev]);
            }

            setAssets((prev) =>
                prev.map((item) =>
                    item._id === selectedAsset._id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

            alert(`Dispatched successfully! Remaining stock: ${newQuantity}`);
            form.reset();
        } catch (err) {
            console.error(err);
            alert('Cannot connect to server.');
        }
    };


const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${selectedAsset.name}"? This cannot be undone.`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API_URL}/api/assets/${selectedAsset._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Error deleting asset');
                return;
            }

            setAssets((prev) => prev.filter((item) => item._id !== selectedAsset._id));
            setSelectedAsset(null);
            alert('Asset deleted successfully!');
        } catch (err) {
            console.error(err);
            alert('Cannot connect to server.');
        }
    };


    if (selectedAsset) {
        return (
            <div className="min-h-screen bg-slate-100 p-6 md:p-8">
                <div className="max-w-4xl mx-auto bg-white border border-slate-300 rounded-xl p-6 md:p-8 shadow-sm">
                    
                    <button 
                        onClick={() => setSelectedAsset(null)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium px-4 py-2 rounded-lg transition mb-6"
                    >
                        Back to List
                    </button>

                       <button 
                          onClick={handleDelete}
                          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition ml-10"
                         >
                            Delete Asset
                       </button>

                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        {selectedAsset.name}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
                        <p>Category: <span className="font-semibold">{selectedAsset.category}</span></p>
                        <p>Available Quantity: <strong className="text-blue-600">{selectedAsset.quantity}</strong></p>
                        <p>Price: <span className="font-semibold">₹{selectedAsset.price}</span></p>
                        <p>Supplier: <span className="font-semibold">{selectedAsset.supplier}</span></p>
                        <p className="sm:col-span-2">Created by: <span className="font-semibold">{selectedAsset.createdBy?.name || 'Unknown'}</span></p>
                    </div>

                    <hr className="border-slate-200 my-6" />

                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                        Dispatch / Remove Stock
                    </h3>

                    <form onSubmit={handleDispatch} className="flex flex-col gap-3 max-w-md">
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity to remove"
                            min="1"
                            max={selectedAsset.quantity}
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                        <input
                            type="text"
                            name="recipient"
                            placeholder="Sent to (Recipient / Client)"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                        <input
                            type="text"
                            name="destination"
                            placeholder="Destination location"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />
                        <select 
                            name="paymentStatus" 
                            defaultValue="unpaid"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        >
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>

                        <button 
                            type="submit" 
                            disabled={selectedAsset.quantity === 0}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed mt-2"
                        >
                            {selectedAsset.quantity === 0 ? 'Out of Stock' : 'Confirm Dispatch'}
                        </button>
                    </form>

                    <hr className="border-slate-200 my-6" />

                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                        Movement History
                    </h3>

                    {movements.length === 0 ? (
                        <p className="text-slate-500">No history found for this item.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border border-slate-300 rounded-lg">
                                <thead className="bg-slate-100 text-slate-700 text-sm">
                                    <tr>
                                        <th className="p-3 border border-slate-300 font-semibold">Date</th>
                                        <th className="p-3 border border-slate-300 font-semibold">Type</th>
                                        <th className="p-3 border border-slate-300 font-semibold">Quantity</th>
                                        <th className="p-3 border border-slate-300 font-semibold">Performed By</th>
                                        <th className="p-3 border border-slate-300 font-semibold">Recipient</th>
                                        <th className="p-3 border border-slate-300 font-semibold">Destination</th>
                                        <th className="p-3 border border-slate-300 font-semibold">Payment</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-slate-800">
                                    {movements.map((m) => (
                                        <tr key={m._id} className="hover:bg-slate-50">
                                            <td className="p-3 border border-slate-300">{new Date(m.createdAt).toLocaleDateString()}</td>
                                            <td className="p-3 border border-slate-300 font-medium capitalize">{m.type}</td>
                                            <td className="p-3 border border-slate-300 font-semibold">{m.quantity}</td>
                                            <td className="p-3 border border-slate-300">{m.performedBy?.name || 'Staff'}</td>
                                            <td className="p-3 border border-slate-300">{m.recipient || m.client || '-'}</td>
                                            <td className="p-3 border border-slate-300">{m.destination || '-'}</td>
                                            <td className="p-3 border border-slate-300 capitalize">{m.paymentStatus || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6 md:p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center pb-6 border-b border-slate-300">
                    <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
                    <button 
                        onClick={onBack}
                        className="bg-white border border-slate-300 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg transition"
                    >
                        Back to Dashboard
                    </button>
                </div>

                {loading ? (
                    <p className="mt-6 text-slate-500">Loading...</p>
                ) : assets.length === 0 ? (
                    <p className="mt-6 text-slate-500">No assets available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {assets.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => handleSelectAsset(item)}
                                className="bg-white border border-slate-300 hover:border-blue-500 rounded-xl p-5 shadow-sm hover:shadow transition cursor-pointer"
                            >
                                <h4 className="text-lg font-bold text-slate-900">{item.name}</h4>
                                <p className="text-sm text-slate-600 mt-1">Category: {item.category}</p>
                                <p className="text-sm text-slate-600">Stock: <span className="font-semibold text-slate-900">{item.quantity}</span></p>
                                <p className="text-sm text-slate-600">Price: ₹{item.price}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}