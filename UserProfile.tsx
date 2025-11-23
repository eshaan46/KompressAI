import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileProps {
  onOpenProfile: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onOpenProfile }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <button
      onClick={onOpenProfile}
      className="flex items-center space-x-2 hover:bg-slate-800/50 rounded-lg px-3 py-2 transition-all duration-200"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
      <span className="text-gray-300 hidden sm:block hover:text-white transition-colors duration-200">
        {user.user_metadata?.username || user.email?.split('@')[0]}
      </span>
    </button>
  );
};

export default UserProfile;