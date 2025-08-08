import React, { useEffect, useState } from "react";


import UseAxios from "../../../Hooks/UseAxios";
import CustomHooks from "../../../Hooks/CustomHooks";

const MyPayments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const { user } = CustomHooks()
  const axiosSecure = UseAxios();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/enrollments?email=${user.email}`)
        .then((res) => {
          setEnrollments(res.data);
        })
        .catch((error) => {
          console.error("Error fetching payments:", error);
        });
    }
  }, [axiosSecure, user]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Payments</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.classTitle}</td>
                <td>{item.price} ৳</td>
                <td>
                  {item.paymentMethod ? (
                    <>
                      {item.paymentMethod.type}
                      {item.paymentMethod.brand && ` (${item.paymentMethod.brand.toUpperCase()})`}
                      {item.paymentMethod.last4 && ` ••••${item.paymentMethod.last4}`}
                    </>
                  ) : "N/A"}
                </td>
                <td>{item.paymentIntentId || "N/A"}</td>
                <td>{item.enrollmentDate ? new Date(item.enrollmentDate).toLocaleDateString() : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {enrollments.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyPayments;
