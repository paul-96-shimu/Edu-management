import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';


const AddClass = () => {
  const { user } = useContext(AuthContext);

    console.log("Logged-in User:", user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const classData = {
      title: data.title,
      name: user?.displayName || "Anonymous",
      email: user?.email,
      price: parseFloat(data.price),
      description: data.description,
      image: data.image,
      totalEnrollment: 0 
    };

    try {
      const res = await axios.post('https://server-kappa-steel.vercel.app/classes', classData);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success("Class added successfully & pending approval");
        reset();
        navigate('/dashboard/myclasses');
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add class.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md mt-10 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block font-medium">Class Title</label>
          <input {...register("title", { required: true })} type="text" className="input input-bordered w-full" />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        <div>
          <label className="block font-medium">Instructor Name</label>
          <input value={user?.displayName || ''} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label className="block font-medium">Instructor Email</label>
          <input value={user?.email || ''} readOnly className="input input-bordered w-full bg-gray-100" />
        </div>

        <div>
          <label className="block font-medium">Price (BDT)</label>
          <input {...register("price", { required: true })} type="number" className="input input-bordered w-full" />
          {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input {...register("image", { required: true })} type="text" placeholder="https://example.com/image.jpg" className="input input-bordered w-full" />
          {errors.image && <p className="text-red-500 text-sm">Image is required</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" rows="4" />
          {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
