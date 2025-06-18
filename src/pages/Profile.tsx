
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserProfile from '@/components/UserProfile';
import LoadingSpinner from '@/components/LoadingSpinner';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-royal-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="bg-royal-black min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                User <span className="text-gradient-gold">Profile</span>
              </h1>
              <div className="w-20 h-1 bg-gradient-royal mx-auto rounded-full"></div>
            </div>
            
            <UserProfile />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
