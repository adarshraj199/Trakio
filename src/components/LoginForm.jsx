import { useState } from 'react'
import { API_URL } from '../config.js';

export default function LoginForm({ role, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Could not sign in.')
        return
      }

      localStorage.setItem('trakio_session', JSON.stringify(data));
      onLogin(data);
      
    } catch {
      setError('Could not reach the Trakio server.')
    } finally {
      setLoading(false)
    }
  }
 

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
  
        <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Email Address
            </label>
            <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
            />
        </div>


        <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Password
            </label>
            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
            />
        </div>


        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 text-center">
                {error}
            </div>
        )}

       
        <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-1"
        >
            {loading ? 'Signing in...' : 'Sign in'}
        </button>
    </form>
);
}