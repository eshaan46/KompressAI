import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import UserProfile from './UserProfile';

interface NavigationProps {
  onNavigateToCompress: () => void;
  onNavigateToHowItWorks: () => void;
  onNavigateToDocumentation: () => void;
  onNavigateToProfile: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToContact: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onNavigateToCompress, 
  onNavigateToHowItWorks, 
  onNavigateToDocumentation,
  onNavigateToProfile,
  onNavigateToDashboard,
  onNavigateToContact
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'How It Works', action: onNavigateToHowItWorks },
    { name: 'Compress Project', action: onNavigateToCompress },
    { name: 'Live Dashboard', action: onNavigateToDashboard },
    { name: 'Documentation', action: onNavigateToDocumentation },
    { name: 'Contact', action: onNavigateToContact }
  ];

  return (
    <nav className="relative z-50 bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              KompressAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 relative group"
              >
                {item.name}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
            <button
              onClick={onNavigateToCompress}
              className="bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </button>
            <UserProfile onOpenProfile={onNavigateToProfile} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <UserProfile onOpenProfile={onNavigateToProfile} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigateToCompress();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;