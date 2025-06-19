
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Calendar, Edit, Save, X, Camera, Phone } from 'lucide-react';

const UserProfile = () => {
  const { user, userProfile, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    displayName: userProfile?.displayName || '',
  });

  const handleUpdateProfile = async () => {
    try {
      const { error } = await updateUserProfile({
        ...formData,
        displayName: `${formData.firstName} ${formData.lastName}`.trim() || formData.displayName,
      });

      if (error) {
        throw error;
      }

      setEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-silver/70">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="text-golden" />
          My Profile
        </h2>
        {!editing ? (
          <button
            onClick={() => {
              setFormData({
                firstName: userProfile?.firstName || '',
                lastName: userProfile?.lastName || '',
                displayName: userProfile?.displayName || user.displayName || '',
              });
              setEditing(true);
            }}
            className="button-secondary flex items-center gap-2"
          >
            <Edit size={16} />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleUpdateProfile}
              className="button-primary flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="button-secondary flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-golden/30"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-golden/20 flex items-center justify-center border-2 border-golden/30">
              <User size={32} className="text-golden" />
            </div>
          )}
          <button className="absolute bottom-0 right-0 bg-golden text-royal-black p-2 rounded-full hover:bg-golden/80 transition-colors">
            <Camera size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {user.email && (
          <div className="flex items-center gap-3">
            <Mail className="text-golden" size={20} />
            <div>
              <p className="text-silver/70 text-sm">Email</p>
              <p className="text-white">{user.email}</p>
            </div>
          </div>
        )}

        {user.phoneNumber && (
          <div className="flex items-center gap-3">
            <Phone className="text-golden" size={20} />
            <div>
              <p className="text-silver/70 text-sm">Phone Number</p>
              <p className="text-white">{user.phoneNumber}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-silver/70 text-sm block mb-2">First Name</label>
            {editing ? (
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full bg-royal-black/50 border border-golden/20 rounded-lg px-3 py-2 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
                placeholder="Enter first name"
              />
            ) : (
              <p className="text-white">{userProfile?.firstName || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="text-silver/70 text-sm block mb-2">Last Name</label>
            {editing ? (
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full bg-royal-black/50 border border-golden/20 rounded-lg px-3 py-2 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
                placeholder="Enter last name"
              />
            ) : (
              <p className="text-white">{userProfile?.lastName || 'Not set'}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-silver/70 text-sm block mb-2">Display Name</label>
          {editing ? (
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
              className="w-full bg-royal-black/50 border border-golden/20 rounded-lg px-3 py-2 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
              placeholder="Enter display name"
            />
          ) : (
            <p className="text-white">{userProfile?.displayName || user.displayName || 'Not set'}</p>
          )}
        </div>

        {user.metadata?.creationTime && (
          <div className="flex items-center gap-3">
            <Calendar className="text-golden" size={20} />
            <div>
              <p className="text-silver/70 text-sm">Member Since</p>
              <p className="text-white">
                {new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
