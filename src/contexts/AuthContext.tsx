
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPhoneNumber,
  ConfirmationResult,
  RecaptchaVerifier
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, setupRecaptcha } from '@/config/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithPhone: (phoneNumber: string) => Promise<{ confirmationResult?: ConfirmationResult; error: any }>;
  verifyPhoneCode: (confirmationResult: ConfirmationResult, code: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<{ error: any }>;
  setupPhoneRecaptcha: (containerId: string) => RecaptchaVerifier;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email || user?.phoneNumber);
      setUser(user);
      
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile({
          uid,
          email: data.email,
          displayName: data.displayName,
          firstName: data.firstName,
          lastName: data.lastName,
          photoURL: data.photoURL,
          phoneNumber: data.phoneNumber,
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const createUserProfile = async (user: User, additionalData?: any) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const { displayName, email, photoURL, phoneNumber } = user;
        const createdAt = new Date();

        await setDoc(userRef, {
          displayName,
          email,
          photoURL,
          phoneNumber,
          createdAt,
          ...additionalData,
        });
      }

      await fetchUserProfile(user.uid);
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      const displayName = firstName && lastName ? `${firstName} ${lastName}` : firstName || '';
      
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      await createUserProfile(user, {
        firstName,
        lastName,
        displayName,
      });

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await createUserProfile(user);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const setupPhoneRecaptcha = (containerId: string) => {
    return setupRecaptcha(containerId);
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      const recaptchaVerifier = setupRecaptcha('recaptcha-container');
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      return { confirmationResult, error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const verifyPhoneCode = async (confirmationResult: ConfirmationResult, code: string) => {
    try {
      const { user } = await confirmationResult.confirm(code);
      await createUserProfile(user);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, data, { merge: true });

      if (data.displayName) {
        await updateProfile(user, { displayName: data.displayName });
      }

      await fetchUserProfile(user.uid);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithPhone,
    verifyPhoneCode,
    signOut,
    updateUserProfile,
    setupPhoneRecaptcha,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
