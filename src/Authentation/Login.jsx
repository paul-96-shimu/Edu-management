import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Sociallogin from './Sociallogin';
import CustomHooks from '../Hooks/CustomHooks';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = CustomHooks();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(result => {
        console.log(result.user);
        navigate(from);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Email */}
        <label className="label mt-2">Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="input input-bordered w-full"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}

      
        <label className="label mt-4">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: true, minLength: 6 })}
            className="input input-bordered w-full pr-10"
            placeholder="Password"
          />
          <span
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password?.type === 'required' && <p className="text-red-500 text-sm mt-1">Password is required</p>}
        {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}

        {/* Submit */}
        <button className="btn btn-neutral w-full mt-6">Login</button>

    
        <div className="text-center mt-4">
          <p className="text-sm">
            New to this website? <Link className="btn btn-link" to="/register">Register</Link>
          </p>
          <Sociallogin />
        </div>
      </form>
    </div>
  );
};

export default Login;
