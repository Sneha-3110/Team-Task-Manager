import { useState } from 'react';
import { register } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeClosed, UserPlus } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Member' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard', { replace: true });
      window.location.reload();
    } catch (err) {
      console.error('Registration Error Details:', err.response?.data || err.message);
      alert(err.response?.data?.msg || 'Registration Failed!');
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-slate-50 px-5 py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:grid-cols-[.95fr_1.05fr]">
        <aside className="hidden bg-slate-950 p-10 text-white md:block">
          <Link to="/" className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
            <ArrowLeft size={16} />
            Back home
          </Link>
          <h1 className="text-4xl font-black leading-tight tracking-tight">
            Create your workspace identity.
          </h1>
          <p className="mt-5 leading-7 text-slate-300">
            Register as a member to receive tasks, or as an admin to assign and manage work.
          </p>
          <div className="mt-10 rounded-xl border border-white/10 bg-white/[.06] p-5">
            <p className="text-sm font-semibold text-slate-300">Choose your access</p>
            <p className="mt-2 text-3xl font-black text-cyan-300">Admin / Member</p>
            <p className="mt-2 text-sm text-slate-400">Role-based screens are enabled after signup.</p>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <UserPlus size={24} />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Create account</h2>
            <p className="mt-2 text-slate-600">Create a workspace identity to start assigning work.</p>
          </div>

          <input
            type="text"
            placeholder="Name"
            className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <select
            className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 pr-14 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          </div>

          <button className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-800">
            Create Account
          </button>

          <Link
            to="/login"
            className="mt-4 block w-full rounded-xl py-2 text-center text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}
