
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const AuthButton = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
      setShowDropdown(false);
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <a
        href="/auth"
        className="button-primary flex items-center gap-2"
      >
        <User size={18} />
        Sign In
      </a>
    );
  }

  const displayName = userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'User';

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 text-silver hover:text-white transition-colors duration-300"
      >
        {user.photoURL ? (
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <UserCircle size={24} />
        )}
        <span className="hidden sm:block">
          {displayName}
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-lg shadow-lg border border-golden/20 z-50">
          <div className="p-2">
            <button
              onClick={() => {
                navigate('/profile');
                setShowDropdown(false);
              }}
              className="w-full text-left px-3 py-2 text-silver hover:text-white hover:bg-golden/10 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              <User size={16} />
              Profile
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2 text-silver hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
