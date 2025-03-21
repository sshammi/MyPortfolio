/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { changePasswordSchema } from '@/components/modules/auth/LoginValidation';
import { changePassword } from '@/services/authServices';

const ChangePasswordPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '', // Ensure default value
      newPassword: '',      // Ensure default value
      confirmPassword: '',  // Ensure default value
    },
  });

  const { formState: { isSubmitting }, watch, reset } = form;

  //console.log(user);
  
  const password = watch('newPassword');
  const passwordConfirm = watch('confirmPassword');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (password !== passwordConfirm) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      const response = await changePassword({
        email: user?.email,
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (response.success) {
        toast.success('Password changed successfully');
        reset();
        router.push('/login');
      } else {
        toast.error(response.message || 'Failed to change password');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
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
                  <Input type="password" {...field} />
                </FormControl>
                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage>Passwords do not match</FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />
          <Button
            disabled={!!passwordConfirm && password !== passwordConfirm || isSubmitting}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? 'Updating...' : 'Change Password'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;