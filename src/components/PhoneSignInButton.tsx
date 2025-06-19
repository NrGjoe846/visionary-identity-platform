import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Phone, Shield } from 'lucide-react';
import { ConfirmationResult } from 'firebase/auth';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const PhoneSignInButton = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const { signInWithPhone, verifyPhoneCode } = useAuth();
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // If it doesn't start with a country code, assume it's Indian number
    if (digits.length === 10 && !digits.startsWith('91')) {
      return `+91${digits}`;
    }
    
    // If it starts with 91 but no +, add the +
    if (digits.startsWith('91') && digits.length === 12) {
      return `+${digits}`;
    }
    
    // If it already has +, return as is
    if (value.startsWith('+')) {
      return `+${digits}`;
    }
    
    // For other international numbers, add + if not present
    return digits.length > 0 ? `+${digits}` : '';
  };

  const validatePhoneNumber = (phone: string) => {
    // Remove + and check if it's a valid format
    const digits = phone.replace(/^\+/, '');
    
    // Indian number validation (91 + 10 digits)
    if (digits.startsWith('91') && digits.length === 12) {
      return true;
    }
    
    // Other international numbers (minimum 10 digits, maximum 15)
    if (digits.length >= 10 && digits.length <= 15) {
      return true;
    }
    
    return false;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
  };

  const handlePhoneSignIn = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number with country code (e.g., +91 for India).",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting to sign in with phone:', phoneNumber);
      const { confirmationResult, error } = await signInWithPhone(phoneNumber);
      if (error) {
        throw error;
      }
      
      if (confirmationResult) {
        setConfirmationResult(confirmationResult);
        setShowOTPInput(true);
        setShowPhoneInput(false);
        toast({
          title: "OTP Sent",
          description: "Please check your phone for the verification code.",
        });
      }
    } catch (error: any) {
      console.error('Phone sign in error:', error);
      toast({
        title: "Phone Sign In Error",
        description: error.message || "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async () => {
    if (!otp || !confirmationResult) {
      toast({
        title: "Verification code required",
        description: "Please enter the 6-digit code sent to your phone.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Verifying OTP:', otp);
      const { error } = await verifyPhoneCode(confirmationResult, otp);
      if (error) {
        throw error;
      }
      toast({
        title: "Success!",
        description: "You have successfully signed in with your phone number.",
      });
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        title: "Verification Error",
        description: error.message || "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPhoneAuth = () => {
    setShowPhoneInput(false);
    setShowOTPInput(false);
    setPhoneNumber('');
    setOtp('');
    setConfirmationResult(null);
  };

  if (showOTPInput) {
    return (
      <div className="w-full space-y-4">
        <div className="text-center">
          <Shield className="mx-auto mb-2 text-blue-500" size={24} />
          <p className="text-sm text-silver/70 mb-4">
            Enter the 6-digit code sent to {phoneNumber}
          </p>
        </div>
        
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
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

        <div className="flex gap-2">
          <button
            onClick={handleOTPVerification}
            disabled={loading || otp.length !== 6}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              'Verify Code'
            )}
          </button>
          <button
            onClick={resetPhoneAuth}
            className="px-4 py-3 text-silver hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (showPhoneInput) {
    return (
      <div className="w-full space-y-4">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver/50" size={18} />
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="w-full bg-royal-black/50 border border-golden/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
          />
        </div>
        
        <div className="text-xs text-silver/60 mb-2">
          Enter your phone number with country code (e.g., +91 for India)
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handlePhoneSignIn}
            disabled={loading || !phoneNumber}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending Code...
              </div>
            ) : (
              'Send Verification Code'
            )}
          </button>
          <button
            onClick={() => setShowPhoneInput(false)}
            className="px-4 py-3 text-silver hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
        
        {/* Invisible reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowPhoneInput(true)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-3"
    >
      <Phone size={18} />
      <span>Continue with Phone</span>
    </button>
  );
};

export default PhoneSignInButton;
