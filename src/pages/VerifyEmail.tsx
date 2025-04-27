
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, CheckCircle, XCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { verifyEmail, isLoading } = useAuth();
  const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationState('error');
        return;
      }

      try {
        const success = await verifyEmail({ token });
        setVerificationState(success ? 'success' : 'error');
      } catch (error) {
        console.error('Email verification error:', error);
        setVerificationState('error');
      }
    };

    verifyToken();
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-security-50 to-security-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-security-600 mx-auto" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Email Verification</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-security-200">
          {verificationState === 'loading' && (
            <div className="text-center">
              <Loader className="h-16 w-16 text-security-500 mx-auto animate-spin" />
              <h2 className="mt-6 text-xl font-semibold text-gray-900">Verifying Your Email</h2>
              <p className="mt-2 text-gray-600">Please wait while we verify your email address...</p>
            </div>
          )}

          {verificationState === 'success' && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="mt-6 text-xl font-semibold text-gray-900">Email Verified Successfully!</h2>
              <p className="mt-2 text-gray-600">
                Your email address has been successfully verified. You can now login to your account.
              </p>
              <div className="mt-8">
                <Link to="/login">
                  <Button className="bg-security-600 hover:bg-security-700">
                    Proceed to Login
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {verificationState === 'error' && (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto" />
              <h2 className="mt-6 text-xl font-semibold text-gray-900">Verification Failed</h2>
              <p className="mt-2 text-gray-600">
                The email verification link is invalid or has expired. Please request a new verification email.
              </p>
              <div className="mt-8">
                <Link to="/login">
                  <Button className="bg-security-600 hover:bg-security-700 mr-4">
                    Back to Login
                  </Button>
                </Link>
                <Link to="/resend-verification">
                  <Button variant="outline" className="border-security-600 text-security-600 hover:bg-security-50">
                    Resend Verification
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
