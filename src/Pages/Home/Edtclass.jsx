import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import UseAxios from '../../Hooks/UseAxios';
import Swal from 'sweetalert2';

const EditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxios();
  const { register, handleSubmit, reset } = useForm();

  // Load existing class data
  useEffect(() => {
    axiosSecure.get(`/classes/${id}`)
      .then(res => {
        reset(res.data); // prefill form
      })
      .catch(() => {
        toast.error("Failed to load class");
      });
  }, [id, reset, axiosSecure]);

const onSubmit = async (data) => {
  try {
    const res = await axiosSecure.put(`/classes/${id}`, data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Class updated successfully!',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/dashboard/myclasses');
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to update class!', error,
    });
  }
};
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">✏️ Edit Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
        <input {...register("price")} type="number" placeholder="Price" className="input input-bordered w-full" />
        <input {...register("image")} placeholder="Image URL" className="input input-bordered w-full" />
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default EditClass;
