
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Shield, Lock, Mail, User } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { useState } from 'react';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must not exceed 20 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .refine(val => passwordRegex.test(val), {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  confirmPassword: z.string(),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    if (!recaptchaValue) {
      alert('Please verify that you are not a robot');
      return;
    }
    
    try {
      await register({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
    } catch (error) {
      console.error('Registration error:', error);
      // Error handling is done in the register function
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    form.setValue('password', password);
    
    // Calculate password strength
    let strength = 0;
    if (password.length > 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    
    setPasswordStrength(strength);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-security-50 to-security-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-security-600 mx-auto" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Secure Auth System</h1>
          <p className="mt-2 text-gray-600">Create an account to get started</p>
        </div>

        <Card className="border-security-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Create a new account with strong security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            placeholder="johndoe" 
                            className="pl-10" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                            type="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                      <FormLabel>Confirm Password</FormLabel>
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
                
                <div className="my-6 flex justify-center">
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={(value) => setRecaptchaValue(value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-security-600 hover:bg-security-700"
                  disabled={isLoading || !recaptchaValue}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-600 w-full">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-security-600 hover:text-security-800"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
