
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { X, IndianRupee, Phone, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface LoginProps {
  open: boolean;
  onClose: () => void;
}

const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number must be 10 digits").max(10, "Phone number must be 10 digits").refine(val => /^\d+$/.test(val), {
    message: "Phone number must contain only digits"
  })
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits")
});

const Login = ({ open, onClose }: LoginProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const { toast } = useToast();
  
  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: ''
    }
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  });

  const onPhoneSubmit = (values: z.infer<typeof phoneSchema>) => {
    console.log("Phone submitted:", values);
    // In a real app, this would call an API to send the OTP
    toast({
      title: "OTP sent",
      description: `A verification code has been sent to ${values.phone}`,
    });
    setStep('otp');
  };

  const onOtpSubmit = (values: z.infer<typeof otpSchema>) => {
    console.log("OTP submitted:", values);
    // In a real app, this would verify the OTP with an API
    toast({
      title: "Login successful",
      description: "You have been successfully logged in",
    });
    onClose();
  };

  const handleResendOtp = () => {
    toast({
      title: "OTP resent",
      description: "A new verification code has been sent to your phone",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-bold">
              {step === 'phone' ? 'Login' : 'Verify OTP'}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="p-6">
          {step === 'phone' ? (
            <Form {...phoneForm}>
              <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                <FormField
                  control={phoneForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Mobile Number</FormLabel>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-muted border border-input rounded-l-md border-r-0">
                          +91
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter your 10 digit mobile number"
                            className="rounded-l-none"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-grocery-green hover:bg-grocery-darkGreen"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Send OTP
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Enter 6-digit OTP</Label>
                  <div className="flex justify-center py-4">
                    <InputOTP 
                      maxLength={6} 
                      value={otpForm.watch('otp')}
                      onChange={(value) => otpForm.setValue('otp', value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {otpForm.formState.errors.otp && (
                    <p className="text-sm font-medium text-destructive">
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-grocery-green hover:bg-grocery-darkGreen"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Verify & Login
                </Button>
                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="link"
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </Button>
                </div>
                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep('phone')}
                    className="mt-2"
                  >
                    Change Phone Number
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Login;
