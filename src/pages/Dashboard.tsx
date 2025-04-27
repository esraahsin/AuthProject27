
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, User, Lock, LogOut, Settings, Bell, RefreshCw, Mail } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-security-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Secure Auth System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}!</h2>
          <p className="text-gray-600">Your secure dashboard</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <User className="mt-1 h-5 w-5 text-security-600 mr-2" />
                <div>
                  <p className="font-medium text-sm text-gray-500">Username</p>
                  <p className="text-gray-900">{user?.username}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mt-1 h-5 w-5 text-security-600 mr-2" />
                <div>
                  <p className="font-medium text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user?.email}</p>
                  {user?.emailVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Not Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Lock className="h-5 w-5 text-security-600 mr-2" />
                    Enable Two-Factor Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Add an extra layer of security to your account by enabling 2FA.
                  </p>
                  <Button className="w-full bg-security-600 hover:bg-security-700">
                    Set up 2FA
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <RefreshCw className="h-5 w-5 text-security-600 mr-2" />
                    Update Password Regularly
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    It's recommended to change your password every 3 months.
                  </p>
                  <Button variant="outline" className="w-full border-security-600 text-security-600 hover:bg-security-50">
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
