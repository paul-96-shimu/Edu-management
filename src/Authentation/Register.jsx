import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import CustomHooks from '../Hooks/CustomHooks';
import { Link } from 'react-router'; // ✅ fix import
import Sociallogin from './Sociallogin';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UseAxios from '../Hooks/UseAxios';



const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = CustomHooks();
  const [profilePic, setProfilePic] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const axiosSecure = UseAxios()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const userProfile = {
        displayName: data.name,
        photoURL: profilePic,
      
      };
       console.log(result)
      await updateUserProfile(userProfile);

      const userInfo = {
        name: data.name,
         email: data.email.toLowerCase(),
        photoURL: profilePic,
        role: 'student',
        created_at: new Date().toISOString()
      };

      await axiosSecure .post('/users', userInfo);
      Swal.fire({ title: 'Registration Successful!', icon: 'success' }).then(() => navigate('/'));
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleImageupload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imagUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Create an Account</h1>

        <label className="label mt-2">Your Name</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="input input-bordered w-full"
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

        <label className="label mt-2">Profile Picture</label>
        <input type="file" onChange={handleImageupload} className="input input-bordered w-full" />

        <label className="label mt-2">Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="input input-bordered w-full"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

        {/* ✅ Password with Show/Hide */}
        <label className="label mt-4">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register('password', {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            })}
            className="input input-bordered w-full pr-10"
            placeholder="Password"
          />
          <span onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer text-gray-500">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errors.password?.type === 'required' && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}
        {errors.password?.type === 'minLength' && (
          <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
        )}
        {errors.password?.type === 'pattern' && (
          <p className="text-red-500 text-sm">
            Must include 1 uppercase, 1 lowercase, and 1 number
          </p>
        )}

        <button className="btn btn-primary w-full mt-6">Register</button>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?
            <Link className="btn btn-link" to="/login"> Login</Link>
          </p>
          <Sociallogin />
        </div>
      </form>
    </div>
  );
};





export default Register;
