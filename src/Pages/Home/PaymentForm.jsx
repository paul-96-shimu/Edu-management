import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';
import Swal from 'sweetalert2';

import CustomHooks from '../../Hooks/CustomHooks';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = CustomHooks()
  const { classId } = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const axiosSecure = UseAxios();

  const { isPending, data: classData = {} } = useQuery({
    queryKey: ['class', classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${classId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p className="text-center py-10">⏳ Loading class details...</p>;
  }

  const amount = classData.price;
  const amountInCents = amount * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element not found");
      return;
    }

    // 🔹 Step 1: Create payment intent
    let clientSecret;
    try {
      const res = await axiosSecure.post('/create-payment-intent', {
        amount: amountInCents,
        classId,
      });
      clientSecret = res.data.clientSecret;
      if (!clientSecret) throw new Error('No clientSecret returned');
    } catch (err) {
      setError('Failed to create payment intent', err);
      return;
    }

    // 🔹 Step 2: Confirm payment
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || 'Student',
          email: user?.email,
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      return;
    }

    // 🔹 Step 3: If payment successful → save enrollment
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      const enrollData = {
        classId: classData._id,
        classTitle: classData.title,
        classImage: classData.image,
        instructorName: classData.instructorName,
        instructorEmail: classData.instructorEmail,
        studentEmail: user?.email,
        price: classData.price, // ✅ এটা ensure করো
        enrollmentDate: new Date(),
        status: 'enrolled',
        paymentMethod: 'Card',
        paymentIntentId: paymentIntent.id
      };

      try {
        const enrollRes = await axiosSecure.post('/enrollments', enrollData);
        if (enrollRes.data?.insertedId) {
          Swal.fire({
            icon: 'success',
            title: '✅ Enrollment Successful!',
            text: 'You have successfully enrolled in the class.',
            confirmButtonColor: '#2563eb',
          }).then(() => {
            navigate('/dashboard/my-enroll-class');
          });
        } else {
          setError('Payment succeeded but enrollment save failed.');
        }
      } catch (err) {
        setError('Payment succeeded but enrollment save failed.', err);
      }
    } else {
      setError('Payment failed.',);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#32325d',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full"
        >
          💳 Pay $ {amount}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
