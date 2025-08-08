import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const TeachOnEdu = () => {
  const { user } = useContext(AuthContext);
  // const axiosSecure = UseAxios();
  const [existingRequest, setExistingRequest] = useState(null);
  const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://server-kappa-steel.vercel.app/teacher-requests/${user.email}`)
        .then(res => setExistingRequest(res.data));
    }
  }, [user]);

  const onSubmit = async (data) => {
    const teacherData = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      experience: data.experience,
      title: data.title,
      category: data.category,
    };

    try {
      const res = await axios.post('https://server-kappa-steel.vercel.app/teacher-requests', teacherData);
      if (res.data.insertedId) {
        toast.success('Request sent for review!');
        reset();
        navigate('/dashboard/teacher-request');
      }
    } catch (err) {
      toast.error('Failed to send request.', err);
    }
  };

  if (existingRequest?.status === 'accepted') {
    return <p className="text-green-500 text-center mt-10 text-xl">✅ You're already a teacher!</p>;
  }

  if (existingRequest?.status === 'rejected') {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">❌ Your request was rejected.</p>
        <button
          className="btn btn-primary"
          onClick={() => setExistingRequest(null)}
        >
          Request Again
        </button>
      </div>
    );
  }

  if (existingRequest?.status === 'pending') {
    return <p className="text-yellow-500 text-center mt-10 text-xl">⏳ Your request is under review...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Apply to Teach on EduManage</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name</label>
          <input defaultValue={user?.displayName} readOnly className="input input-bordered w-full" />
        </div>
        <div>
          <label>Email</label>
          <input defaultValue={user?.email} readOnly className="input input-bordered w-full" />
        </div>
        <div>
          <label>Experience</label>
          <select {...register("experience", { required: true })} className="select select-bordered w-full">
            <option value="">Select Experience</option>
            <option value="Beginner">Beginner</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Experienced">Experienced</option>
          </select>
        </div>
        <div>
          <label>Title</label>
          <input {...register("title", { required: true })} className="input input-bordered w-full" placeholder="Ex: Fullstack Developer" />
        </div>
        <div>
          <label>Category</label>
          <select {...register("category", { required: true })} className="select select-bordered w-full">
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
        <button className="btn btn-primary w-full">Submit for Review</button>
      </form>
    </div>
  );
};

export default TeachOnEdu;
