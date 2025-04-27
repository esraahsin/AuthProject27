
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle, AlertTriangle, RefreshCw, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-security-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Secure Auth System</h1>
          </div>
          <div className="space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-security-600 hover:bg-security-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-security-600 text-security-600 hover:bg-security-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-security-600 hover:bg-security-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-security-50 to-security-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Enterprise-Grade Authentication
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Implement the most secure authentication system with multi-layer protection, 
                strong password policies, and robust security features.
              </p>
              <div className="mt-10">
                <Link to="/register">
                  <Button className="px-8 py-6 text-lg bg-security-600 hover:bg-security-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Advanced Security Features</h2>
              <p className="mt-4 text-xl text-gray-600">
                Comprehensive protection with industry-leading security standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="bg-security-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-security-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Multi-Factor Authentication</h3>
                <p className="mt-2 text-gray-600">
                  Strengthen account security with an additional verification layer beyond passwords.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="bg-security-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-security-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Brute Force Protection</h3>
                <p className="mt-2 text-gray-600">
                  Intelligent rate limiting and account lockout mechanisms to prevent unauthorized access attempts.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="bg-security-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-security-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Email Verification</h3>
                <p className="mt-2 text-gray-600">
                  Verify user identities with secure email confirmation to prevent account spoofing.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="bg-security-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-security-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Advanced Encryption</h3>
                <p className="mt-2 text-gray-600">
                  Protect sensitive data with modern encryption algorithms and secure hashing techniques.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="bg-security-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <RefreshCw className="h-6 w-6 text-security-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Secure Password Reset</h3>
                <p className="mt-2 text-gray-600">
                  Time-limited, one-time use password recovery tokens delivered securely via email.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="bg-security-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-security-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Role-Based Access Control</h3>
                <p className="mt-2 text-gray-600">
                  Fine-grained permission management to ensure users only access appropriate resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-security-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Secure Your Application?</h2>
            <p className="mt-4 text-xl text-security-100">
              Get started with our enterprise-grade authentication system today
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button className="px-8 py-6 text-lg bg-white text-security-800 hover:bg-gray-100">
                  Create Secure Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-security-400" />
                <span className="ml-2 text-xl font-bold text-white">Secure Auth System</span>
              </div>
              <p className="mt-2 text-sm">Enterprise-grade security for your applications</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white">Security</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Secure Auth System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
