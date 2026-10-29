import { API_URL } from "./config";

export default function AddEmployee({ onBack, token }) {

  const handleSubmit = async (e) => {
    e.preventDefault();


    const form = e.target;
    const workerData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(workerData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to create worker');
        return;
      }

      alert(`Worker "${workerData.name}" created successfully!`);
      form.reset(); 
    } catch (err) {
      alert('Network error. Could not connect to server.');
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md bg-white border border-slate-300 rounded-xl p-8 shadow-sm">

        <h2 className="text-2xl font-bold text-slate-900 text-center">
            Add Warehouse Worker
        </h2>
        <p className="text-sm text-slate-500 text-center mt-1 mb-6">
            Create login credentials for your warehouse staff
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Worker Full Name
                </label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="e.g. Ramesh Kumar" 
                    required 
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Worker Email (Used to Log in)
                </label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="worker@example.com" 
                    required 
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Initial Password
                </label>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Create a temporary password" 
                    required 
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition shadow-sm mt-2"
            >
                Create Worker Account
            </button>
        </form>


        <div className="border-t border-slate-200 mt-6 pt-4 text-center">
            <button 
                onClick={onBack}
                className="text-sm text-slate-500 hover:text-slate-800 font-medium transition"
            >
                ← Back to Dashboard
            </button>
        </div>

    </div>
</div>
  );
}