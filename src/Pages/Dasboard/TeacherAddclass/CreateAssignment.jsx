import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxios from '../../../Hooks/UseAxios';

const CreateAssignment = ({ classId, onAssignmentCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxios();

  const onSubmit = async (data) => {
    try {
      const assignmentData = { ...data, classId };
      const res = await axiosSecure.post('/assignments', assignmentData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Assignment created successfully!',
        });
        reset();
        setIsModalOpen(false);
        onAssignmentCreated?.(); // Optional callback to update UI
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to create assignment.',error,
      });
    }
  };

  return (
    <>
      {/* Create Button */}
      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Create</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Create New Assignment</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register('title')} className="input input-bordered w-full" placeholder="Assignment Title" required />
              <textarea {...register('description')} className="textarea textarea-bordered w-full" placeholder="Description" required />
              <input {...register('deadline')} type="date" className="input input-bordered w-full" required />
              <button type="submit" className="btn btn-success w-full">Add Assignment</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAssignment;
