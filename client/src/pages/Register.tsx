// src/components/Register.tsx
import React, { useState } from 'react';
import { register } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const { loginUser } = useAuth();
  const [form, setForm] = useState<RegisterForm>({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(form);
      loginUser(res.data); // sets user and token
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-hero">
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md bg-gray-900 text-white p-8 rounded-xl shadow-lg"
    >
      <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
      <p className="text-center text-gray-400 mb-6">
        Sign up to start your productivity journey
      </p>

      {/* Username */}
      <label className="block mb-2 font-medium text-left">Username</label>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Enter your username"
        className="w-full mb-4 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Email */}
      <label className="block mb-2 font-medium text-left">Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="w-full mb-4 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Password */}
      <label className="block mb-2 font-medium text-left">Password</label>
      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-bold hover:opacity-90 transition"
      >
        Register
      </button>

      <p className="text-center text-gray-400 text-sm">
        Already have an account? <a href="/" className="text-purple-400 hover:underline">Sign in</a>
      </p>
    </form>
  </div>
);

};

export default Register;
