// PaymentSuccess.tsx
import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          
          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful</h1>
          
          <p className="text-gray-600 text-center mb-8">
            Your transaction has been completed successfully. A confirmation has been sent to your email.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link href="/home" className="w-full">
              <button className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow transition-colors duration-300">
                Go to Dashboard
              </button>
            </Link>
            
            <Link href="/products" className="w-full">
              <button className="w-full py-3 px-6 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-200 transition-colors duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
          
          {/* Transaction ID */}
          {/* <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
            <p className="text-gray-500 text-sm">
              Transaction ID: <span className="font-medium">TXN238942789</span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;