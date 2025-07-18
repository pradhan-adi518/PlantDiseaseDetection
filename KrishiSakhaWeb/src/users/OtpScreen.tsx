import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      toast.error('Invalid OTP. Please enter a 6-digit code.');
      return;
    }

    setIsSubmitting(true);

    // Simulating OTP verification
    setTimeout(() => {
      // On success
      toast.success('OTP Verified Successfully!');
      setIsSubmitting(false);

      // On error
      // toast.error('Invalid OTP. Please try again.');
    }, 2000);
  };

  const handleResend = (): void => {
    toast.info('Resending OTP...');
    // Simulate resend OTP action here
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50">
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">
          Verify OTP
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Please enter the OTP sent to your registered mobile number.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              maxLength={6}
              name="otp"
              value={otp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </form>

        {/* Resend OTP */}
        <div className="text-center mt-4">
          <button
            type="button"
            className="text-green-600 hover:underline"
            onClick={handleResend}
          >
            Resend OTP
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default OTPVerification;
