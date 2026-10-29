import { useState } from 'react';
import { API_URL } from "../pages/config.js";

export default function OwnerRegister({ onBack , onGoToRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register-owner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      alert('Owner account created successfully! Please sign in.');
      onBack(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md bg-white border border-slate-300 rounded-xl p-8 shadow-sm">

        <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">
            Create Owner Account
        </h2>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 text-center mb-4">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="name"
                placeholder="Owner Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
            />

            <input
                type="email"
                name="email"
                placeholder="Owner Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
            />

            <input
                type="password"
                name="password"
                placeholder="Password (min 8 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
            />

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-2"
            >
                {loading ? 'Creating...' : 'Register as Owner'}
            </button>
        </form>

        <div className="border-t border-slate-200 mt-6 pt-4 text-center">
            <button 
                onClick={onBack}
                className="text-sm text-slate-500 hover:text-slate-800 font-medium transition"
            >
                ← Back to Owner Login
            </button>
        </div>

    </div>
</div>
  );
}