import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import UseAxios from '../../../Hooks/UseAxios';
import CustomHooks from '../../../Hooks/CustomHooks';

const EnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxios();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit,  } = useForm();
 

  const { user } = CustomHooks();

  // Fetch class details
  const { data: classDetails = {}, isLoading: classLoading } = useQuery({
    queryKey: ['classDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  // Fetch assignments
  const { data: assignments = [], isLoading: assignmentLoading, refetch } = useQuery({
    queryKey: ['assignments', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`);
      return res.data;
    },
  });

  // Assignment submission modal state
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const { register: registerAssignment, handleSubmit: handleAssignmentFormSubmit, reset: resetAssignmentForm } = useForm();

  // Open modal for assignment submission
  const openAssignmentModal = (assignment) => {
    setSelectedAssignment(assignment);
    setShowAssignmentModal(true);
  };

  // Submit assignment to backend
  const onAssignmentSubmit = async (data) => {
    const submissionData = {
      assignmentId: selectedAssignment._id,
      assignmentTitle: selectedAssignment.title,
      studentEmail: user?.email,
      studentName: user?.displayName,
      submissionFile: data.submissionFile,
      comments: data.comments,
      submittedAt: new Date(),
      classId: id
    };
    try {
      const res = await axiosSecure.post('/assignments/submit', submissionData);
      if (res.data.insertedId) {
        toast.success('Assignment submitted successfully');
        setShowAssignmentModal(false);
        resetAssignmentForm();
        refetch();
      }
    } catch (err) {
      toast.error('Failed to submit assignment',err);
    }
  };

  const onTERSubmit = async (data) => {
    const feedbackData = {
     feedbackText: data.feedbackText,
    userName: data.userName,
      classTitle: classDetails?.title, 
      classId: classDetails?._id,
      studentEmail: user?.email,
      rating: parseFloat(data.rating) || 0,
    timestamp: new Date()
    };

    console.log("Submitting:", feedbackData); // ✅ Check before submit

    try {
      const res = await axiosSecure
      .post("/feedbacks", feedbackData);
      if (res.data.insertedId) {
        toast.success("Feedback submitted successfully");
        setShowModal(false);
      
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to submit feedback");
    }
  };

  if (classLoading || assignmentLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{classDetails.title}</h2>
      <img src={classDetails.image} alt={classDetails.title} className="w-full h-64 object-cover rounded mb-6" />
      <p className="text-lg mb-4">{classDetails.description}</p>

      {/* Assignments */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">Assignments</h3>
      {assignments.length > 0 ? (
        <ul className="space-y-4">
          {assignments.map(assignment => (
            <li key={assignment._id} className="border p-4 rounded shadow">
              <h4 className="text-xl font-bold">{assignment.title}</h4>
              <p className="text-gray-700">{assignment.description}</p>
              <p className="text-sm text-gray-500">Deadline: {new Date(assignment.deadline).toLocaleDateString()}</p>
              <button
                onClick={() => openAssignmentModal(assignment)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit Assignment
              </button>
      {/* Assignment Submission Modal */}
      {showAssignmentModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setShowAssignmentModal(false)}
              className="absolute top-2 right-3 text-xl font-bold text-red-600"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold mb-4">Submit Assignment: {selectedAssignment.title}</h3>
            <form onSubmit={handleAssignmentFormSubmit(onAssignmentSubmit)} className="space-y-4">
              <input
                {...registerAssignment('submissionFile')}
                type="text"
                placeholder="Submission File URL (Google Drive, etc)"
                className="input input-bordered w-full"
                required
              />
              <textarea
                {...registerAssignment('comments')}
                placeholder="Comments (optional)"
                className="textarea textarea-bordered w-full"
              ></textarea>
              <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
          </div>
        </div>
      )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments available for this class.</p>
      )}

      {/* Teaching Evaluation Report (TER) */}
      <div className="mt-10">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
        >
          Teaching Evaluation Report (TER)
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-xl font-bold text-red-600"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold mb-4">Submit Teaching Evaluation</h3>
 <form onSubmit={handleSubmit(onTERSubmit)} className="space-y-4">
  <input
    {...register("userName")}
    defaultValue={user?.displayName}
    type="text"
    placeholder="Your Name"
    className="input input-bordered w-full"
    required
  />
  <textarea
    {...register("feedbackText")}
    placeholder="Your Feedback"
    className="textarea textarea-bordered w-full"
    required
  ></textarea>
  <input
    {...register("rating")}
    type="number"
    min="0"
    max="5"
    step="0.1"
    placeholder="Rating (0-5)"
    className="input input-bordered w-full"
    required
  />


  <input
    {...register("classTitle")}
    type="hidden"
    value={classDetails?.title || ""}
    readOnly
  />

  <button type="submit" className="btn btn-primary w-full">Submit Feedback</button>
</form>

      </div>
        </div>
      )}
    </div>
  );
};

export default EnrollClassDetails;
