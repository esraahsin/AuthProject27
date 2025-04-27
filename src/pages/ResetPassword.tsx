
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Shield, Lock, CheckCircle } from 'lucide-react';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
    .refine(val => passwordRegex.test(val), {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  confirmPassword: z.string(),
})
.refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      alert('Invalid reset token');
      return;
    }

    try {
      const success = await resetPassword({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      
      if (success) {
        setResetSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      // Error handling is done in the resetPassword function
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    form.setValue('newPassword', password);
    
    // Calculate password strength
    let strength = 0;
    if (password.length > 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    
    setPasswordStrength(strength);
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-security-50 to-security-100 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Password Reset Successful</h1>
            <p className="mt-4 text-gray-600">
              Your password has been reset successfully. You will be redirected to the login page in a few seconds.
            </p>
            <div className="mt-8">
              <Link to="/login" className="inline-flex items-center justify-center px-6 py-2 bg-security-600 text-white rounded-md hover:bg-security-700">
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-security-50 to-security-100 p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600">Invalid Token</h1>
          <p className="mt-4 text-gray-600">
            The password reset link is invalid or has expired. Please request a new one.
          </p>
          <div className="mt-8">
            <Link to="/forgot-password" className="inline-flex items-center justify-center px-6 py-2 bg-security-600 text-white rounded-md hover:bg-security-700">
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-security-50 to-security-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-security-600 mx-auto" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-gray-600">Create a new secure password for your account</p>
        </div>

        <Card className="border-security-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Set New Password</CardTitle>
            <CardDescription>
              Please create a strong password that you don't use on any other site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            type="password" 
                            placeholder="********" 
                            className="pl-10" 
                            {...field}
                            onChange={handlePasswordChange}
                          />
                        </div>
                      </FormControl>
                      <PasswordStrengthMeter strength={passwordStrength} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            type="password" 
                            placeholder="********" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-security-600 hover:bg-security-700 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Resetting password...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-600 w-full">
              Remember your password?{' '}
              <Link 
                to="/login" 
                className="font-medium text-security-600 hover:text-security-800"
              >
                Back to login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
