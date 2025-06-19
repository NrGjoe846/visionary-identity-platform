
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import PhoneSignInButton from '@/components/PhoneSignInButton';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'google' | 'phone'>('email');
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          throw error;
        }
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) {
          throw error;
        }
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-royal-black flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-golden/10 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-silver/10 blur-3xl opacity-50"></div>
      
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-silver hover:text-white transition-colors duration-300 flex items-center gap-2 z-10"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="glass-card p-8 w-full max-w-md mx-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-silver/70">
            {isLogin 
              ? 'Sign in to access your account' 
              : 'Join us and start your journey'
            }
          </p>
        </div>

        {/* Authentication Method Selector */}
        <div className="flex mb-6 bg-royal-black/30 rounded-lg p-1">
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-2 px-3 rounded-md text-sm transition-colors ${
              authMethod === 'email' 
                ? 'bg-golden text-royal-black font-semibold' 
                : 'text-silver hover:text-white'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setAuthMethod('google')}
            className={`flex-1 py-2 px-3 rounded-md text-sm transition-colors ${
              authMethod === 'google' 
                ? 'bg-golden text-royal-black font-semibold' 
                : 'text-silver hover:text-white'
            }`}
          >
            Google
          </button>
          <button
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 py-2 px-3 rounded-md text-sm transition-colors ${
              authMethod === 'phone' 
                ? 'bg-golden text-royal-black font-semibold' 
                : 'text-silver hover:text-white'
            }`}
          >
            Phone
          </button>
        </div>

        {/* Google Sign In */}
        {authMethod === 'google' && (
          <div className="mb-6">
            <GoogleSignInButton />
          </div>
        )}

        {/* Phone Sign In */}
        {authMethod === 'phone' && (
          <div className="mb-6">
            <PhoneSignInButton />
          </div>
        )}

        {/* Email Sign In Form */}
        {authMethod === 'email' && (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver/50" size={18} />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-royal-black/50 border border-golden/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
                      required={!isLogin}
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver/50" size={18} />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-royal-black/50 border border-golden/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver/50" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-royal-black/50 border border-golden/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver/50" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-royal-black/50 border border-golden/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver/50 hover:text-silver transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full button-primary py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-royal-black/30 border-t-royal-black rounded-full animate-spin"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-silver/70">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="text-golden hover:text-golden/80 font-semibold ml-2 transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
