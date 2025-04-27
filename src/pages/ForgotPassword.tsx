
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Shield, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const { forgotPassword, isLoading } = useAuth();
  const [requestSent, setRequestSent] = useState(false);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await forgotPassword({
        email: data.email
      });
      setRequestSent(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      // Error handling is done in the forgotPassword function
    }
  };

  if (requestSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-security-50 to-security-100 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Check Your Email</h1>
            <p className="mt-4 text-gray-600">
              We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
            </p>
            <div className="mt-8">
              <Link to="/login" className="inline-flex items-center text-security-600 hover:text-security-800 font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
              </Link>
            </div>
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
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Forgot Password</h1>
          <p className="mt-2 text-gray-600">Don't worry, we'll help you recover your password</p>
        </div>

        <Card className="border-security-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="your@email.com" 
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
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-center w-full">
              <Link to="/login" className="text-sm font-medium text-security-600 hover:text-security-800 flex items-center">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
