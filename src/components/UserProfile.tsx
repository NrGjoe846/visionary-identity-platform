
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Calendar, Edit, Save, X } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  created_at: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
      });
    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...formData } : null);
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

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-6 bg-golden/20 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-golden/20 rounded"></div>
          <div className="h-4 bg-golden/20 rounded"></div>
          <div className="h-4 bg-golden/20 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-silver/70">Profile not found</p>
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
            onClick={() => setEditing(true)}
            className="button-secondary flex items-center gap-2"
          >
            <Edit size={16} />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={updateProfile}
              className="button-primary flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setFormData({
                  first_name: profile.first_name || '',
                  last_name: profile.last_name || '',
                });
              }}
              className="button-secondary flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="text-golden" size={20} />
          <div>
            <p className="text-silver/70 text-sm">Email</p>
            <p className="text-white">{profile.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-silver/70 text-sm block mb-2">First Name</label>
            {editing ? (
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                className="w-full bg-royal-black/50 border border-golden/20 rounded-lg px-3 py-2 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
                placeholder="Enter first name"
              />
            ) : (
              <p className="text-white">{profile.first_name || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="text-silver/70 text-sm block mb-2">Last Name</label>
            {editing ? (
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                className="w-full bg-royal-black/50 border border-golden/20 rounded-lg px-3 py-2 text-white placeholder-silver/50 focus:outline-none focus:border-golden/50 transition-colors"
                placeholder="Enter last name"
              />
            ) : (
              <p className="text-white">{profile.last_name || 'Not set'}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="text-golden" size={20} />
          <div>
            <p className="text-silver/70 text-sm">Member Since</p>
            <p className="text-white">
              {new Date(profile.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
