import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut, 
  Edit3, 
  Save, 
  X,
  Shield,
  Activity,
  FileText,
  Clock,
  Zap,
  Bell,
  Eye,
  Palette,
  Globe,
  Lock,
  Key,
  Download,
  Trash2,
  AlertTriangle,
  Moon,
  Sun,
  Monitor,
  Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../hooks/useProjects';
import { usePreferences } from '../contexts/PreferencesContext';
import { useTranslation } from '../utils/translations';
import { formatDateInTimezone, getAvailableTimezones } from '../utils/dateTime';

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const { user, signOut } = useAuth();
  const { projects } = useProjects();
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    timezone,
    setTimezone,
    emailNotifications,
    setEmailNotifications,
    pushNotifications,
    setPushNotifications,
    projectUpdates,
    setProjectUpdates,
    marketingEmails,
    setMarketingEmails,
    autoSave,
    setAutoSave,
    compressionQuality,
    setCompressionQuality,
    defaultAccuracyFloor,
    setDefaultAccuracyFloor,
    apiKeyExpiry,
    setApiKeyExpiry,
  } = usePreferences();
  
  const { t } = useTranslation(language);
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'security' | 'preferences'>('overview');
  const [editedUsername, setEditedUsername] = useState(
    user?.user_metadata?.username || user?.email?.split('@')[0] || ''
  );
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const availableTimezones = getAvailableTimezones();
  
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSaveProfile = () => {
    // In a real implementation, you would update the user profile here
    setIsEditing(false);
    showSaveSuccess();
  };

  const showSaveSuccess = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handlePreferenceChange = (setter: (value: any) => void, value: any) => {
    setter(value);
    showSaveSuccess();
  };

  const formatDate = (dateString: string) => {
    return formatDateInTimezone(dateString, timezone, language);
  };

  const getProjectStats = () => {
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const processing = projects.filter(p => p.status === 'processing').length;
    const draft = projects.filter(p => p.status === 'draft').length;
    
    return { total, completed, processing, draft };
  };

  const stats = getProjectStats();

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'settings', name: 'Account Settings', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette }
  ];

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    disabled = false 
  }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void; 
    disabled?: boolean;
  }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-cyan-400' : 'bg-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white dark:bg-slate-900 light:bg-gray-50 light:text-slate-900">
      {/* Circuit pattern background */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,188,212,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,188,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Save Success Notification */}
      {showSaveNotification && (
        <div className="fixed top-4 right-4 z-50 bg-lime-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right">
          <Check className="w-5 h-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-20 dark:bg-slate-900/95 light:bg-white/95 light:border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200 light:text-gray-600 light:hover:text-cyan-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                Profile & Settings
              </h1>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 light:from-white light:to-gray-50 light:border-gray-200">
                {/* Profile Picture */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white light:text-slate-900">
                    {user?.user_metadata?.username || user?.email?.split('@')[0]}
                  </h3>
                  <p className="text-gray-400 text-sm light:text-gray-600">{user?.email}</p>
                </div>

                {/* Tab Navigation */}
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-400'
                          : 'text-gray-400 hover:text-white hover:bg-slate-700/30 light:text-gray-600 light:hover:text-slate-900 light:hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>

                {/* Sign Out Button */}
                <div className="mt-8 pt-6 border-t border-gray-700/50 light:border-gray-200">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 rounded-lg px-4 py-3 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Project Statistics */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <Activity className="w-6 h-6 text-cyan-400" />
                      <h3 className="text-2xl font-semibold text-white light:text-slate-900">Project Statistics</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="text-center bg-slate-700/30 rounded-xl p-6 light:bg-gray-100">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1 light:text-slate-900">{stats.total}</div>
                        <div className="text-gray-400 text-sm light:text-gray-600">Total Projects</div>
                      </div>
                      
                      <div className="text-center bg-slate-700/30 rounded-xl p-6 light:bg-gray-100">
                        <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-lime-400 mb-1">{stats.completed}</div>
                        <div className="text-gray-400 text-sm light:text-gray-600">Completed</div>
                      </div>
                      
                      <div className="text-center bg-slate-700/30 rounded-xl p-6 light:bg-gray-100">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-purple-400 mb-1">{stats.processing}</div>
                        <div className="text-gray-400 text-sm light:text-gray-600">Processing</div>
                      </div>
                      
                      <div className="text-center bg-slate-700/30 rounded-xl p-6 light:bg-gray-100">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Edit3 className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-400 mb-1">{stats.draft}</div>
                        <div className="text-gray-400 text-sm light:text-gray-600">Drafts</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Projects */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-lime-400" />
                        <h3 className="text-2xl font-semibold text-white light:text-slate-900">Recent Projects</h3>
                      </div>
                      <span className="text-gray-400 text-sm light:text-gray-600">{projects.length} total</span>
                    </div>
                    
                    {projects.length > 0 ? (
                      <div className="space-y-4">
                        {projects.slice(0, 5).map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-all duration-200 light:bg-gray-100 light:hover:bg-gray-200"
                          >
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-1 light:text-slate-900">{project.title}</h4>
                              <p className="text-gray-400 text-sm line-clamp-1 light:text-gray-600">{project.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Created {formatDate(project.created_at)}
                              </p>
                            </div>
                            <div className="ml-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                project.status === 'completed' ? 'bg-lime-400/20 text-lime-400' :
                                project.status === 'processing' ? 'bg-purple-400/20 text-purple-400' :
                                project.status === 'submitted' ? 'bg-cyan-400/20 text-cyan-400' :
                                'bg-gray-400/20 text-gray-400'
                              }`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-400 mb-2">No Projects Yet</h4>
                        <p className="text-gray-500">Start by creating your first AI compression project.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  {/* Appearance */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <Palette className="w-6 h-6 text-cyan-400" />
                      <h3 className="text-2xl font-semibold text-white light:text-slate-900">Appearance</h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3 light:text-gray-600">Theme</label>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { value: 'light', label: 'Light', icon: Sun },
                            { value: 'dark', label: 'Dark', icon: Moon },
                            { value: 'system', label: 'System', icon: Monitor }
                          ].map((themeOption) => (
                            <button
                              key={themeOption.value}
                              onClick={() => handlePreferenceChange(setTheme, themeOption.value)}
                              className={`flex flex-col items-center space-y-2 p-4 rounded-lg border transition-all duration-200 ${
                                theme === themeOption.value
                                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-400'
                                  : 'bg-slate-700/30 border-gray-600 text-gray-400 hover:border-gray-500 light:bg-gray-100 light:border-gray-300 light:text-gray-600 light:hover:border-gray-400'
                              }`}
                            >
                              <themeOption.icon className="w-6 h-6" />
                              <span className="text-sm font-medium">{themeOption.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Localization */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <Globe className="w-6 h-6 text-purple-400" />
                      <h3 className="text-2xl font-semibold text-white light:text-slate-900">Localization</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">Language</label>
                        <select
                          value={language}
                          onChange={(e) => handlePreferenceChange(setLanguage, e.target.value)}
                          className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent light:bg-white light:border-gray-300 light:text-slate-900"
                        >
                          {languages.map((lang) => (
                            <option key={lang.code} value={lang.code} className="bg-slate-800 light:bg-white">
                              {lang.nativeName} ({lang.name})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">Timezone</label>
                        <select
                          value={timezone}
                          onChange={(e) => handlePreferenceChange(setTimezone, e.target.value)}
                          className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent light:bg-white light:border-gray-300 light:text-slate-900"
                        >
                          {availableTimezones.map((tz) => (
                            <option key={tz.value} value={tz.value} className="bg-slate-800 light:bg-white">
                              {tz.label} ({tz.offset})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <Bell className="w-6 h-6 text-purple-400" />
                      <h3 className="text-2xl font-semibold text-white light:text-slate-900">Notification Settings</h3>
                    </div>

                    <div className="space-y-6">
                      {[
                        { 
                          key: 'emailNotifications', 
                          label: 'Email Notifications', 
                          description: 'Receive notifications via email',
                          value: emailNotifications,
                          setter: setEmailNotifications
                        },
                        { 
                          key: 'pushNotifications', 
                          label: 'Push Notifications', 
                          description: 'Receive browser push notifications',
                          value: pushNotifications,
                          setter: setPushNotifications
                        },
                        { 
                          key: 'projectUpdates', 
                          label: 'Project Updates', 
                          description: 'Get notified about project status changes',
                          value: projectUpdates,
                          setter: setProjectUpdates
                        },
                        { 
                          key: 'marketingEmails', 
                          label: 'Marketing Emails', 
                          description: 'Receive product updates and news',
                          value: marketingEmails,
                          setter: setMarketingEmails
                        }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg light:bg-gray-100">
                          <div>
                            <h4 className="text-white font-medium light:text-slate-900">{setting.label}</h4>
                            <p className="text-gray-400 text-sm light:text-gray-600">{setting.description}</p>
                          </div>
                          <ToggleSwitch
                            checked={setting.value}
                            onChange={(checked) => handlePreferenceChange(setting.setter, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compression Defaults */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <Zap className="w-6 h-6 text-lime-400" />
                      <h3 className="text-2xl font-semibold text-white light:text-slate-900">Compression Defaults</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">Compression Quality</label>
                        <select
                          value={compressionQuality}
                          onChange={(e) => handlePreferenceChange(setCompressionQuality, e.target.value)}
                          className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent light:bg-white light:border-gray-300 light:text-slate-900"
                        >
                          <option value="fast" className="bg-slate-800 light:bg-white">Fast (Lower quality)</option>
                          <option value="balanced" className="bg-slate-800 light:bg-white">Balanced (Recommended)</option>
                          <option value="maximum" className="bg-slate-800 light:bg-white">Maximum (Best quality)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">Default Accuracy Floor</label>
                        <select
                          value={defaultAccuracyFloor}
                          onChange={(e) => handlePreferenceChange(setDefaultAccuracyFloor, e.target.value)}
                          className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent light:bg-white light:border-gray-300 light:text-slate-900"
                        >
                          <option value="1-3" className="bg-slate-800 light:bg-white">1–3 pp</option>
                          <option value="3-5" className="bg-slate-800 light:bg-white">3–5 pp</option>
                          <option value="5-10" className="bg-slate-800 light:bg-white">5–10 pp</option>
                          <option value="10-15" className="bg-slate-800 light:bg-white">10–15 pp</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg light:bg-gray-100">
                        <div>
                          <h4 className="text-white font-medium light:text-slate-900">Auto-save Projects</h4>
                          <p className="text-gray-400 text-sm light:text-gray-600">Automatically save project drafts</p>
                        </div>
                        <ToggleSwitch
                          checked={autoSave}
                          onChange={(checked) => handlePreferenceChange(setAutoSave, checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  {/* Profile Information */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <User className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-2xl font-semibold text-white light:text-slate-900">Profile Information</h3>
                      </div>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">Username</label>
                        {isEditing ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editedUsername}
                              onChange={(e) => setEditedUsername(e.target.value)}
                              className="flex-1 bg-slate-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent light:bg-white light:border-gray-300 light:text-slate-900"
                            />
                            <button
                              onClick={handleSaveProfile}
                              className="p-3 text-lime-400 hover:text-lime-300 transition-colors duration-200"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="bg-slate-700/30 rounded-lg p-3 light:bg-gray-100">
                            <span className="text-white light:text-slate-900">{editedUsername}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">Email</label>
                        <div className="bg-slate-700/30 rounded-lg p-3 light:bg-gray-100">
                          <span className="text-white light:text-slate-900">{user?.email}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">Member Since</label>
                        <div className="bg-slate-700/30 rounded-lg p-3 light:bg-gray-100">
                          <span className="text-white light:text-slate-900">
                            {user?.created_at ? formatDate(user.created_at) : 'Unknown'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">Account Status</label>
                        <div className="bg-slate-700/30 rounded-lg p-3 light:bg-gray-100">
                          <span className="text-lime-400 font-semibold">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  {/* Password & Authentication */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <Lock className="w-6 h-6 text-red-400" />
                      <h3 className="text-2xl font-semibold text-white light:text-slate-900">Password & Authentication</h3>
                    </div>

                    <div className="space-y-6">
                      <button className="w-full flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-all duration-200 light:bg-gray-100 light:hover:bg-gray-200">
                        <div>
                          <h4 className="text-white font-medium light:text-slate-900">Change Password</h4>
                          <p className="text-gray-400 text-sm light:text-gray-600">Update your account password</p>
                        </div>
                        <Edit3 className="w-5 h-5 text-gray-400" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-all duration-200 light:bg-gray-100 light:hover:bg-gray-200">
                        <div>
                          <h4 className="text-white font-medium light:text-slate-900">Two-Factor Authentication</h4>
                          <p className="text-gray-400 text-sm light:text-gray-600">Add an extra layer of security</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400 text-sm">Disabled</span>
                          <Settings className="w-5 h-5 text-gray-400" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* API Keys */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <Key className="w-6 h-6 text-lime-400" />
                      <h3 className="text-2xl font-semibold text-white light:text-slate-900">API Key Management</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 light:text-gray-600">API Key Expiry</label>
                        <select
                          value={apiKeyExpiry}
                          onChange={(e) => handlePreferenceChange(setApiKeyExpiry, e.target.value)}
                          className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent light:bg-white light:border-gray-300 light:text-slate-900"
                        >
                          <option value="7" className="bg-slate-800 light:bg-white">7 days</option>
                          <option value="30" className="bg-slate-800 light:bg-white">30 days</option>
                          <option value="90" className="bg-slate-800 light:bg-white">90 days</option>
                          <option value="never" className="bg-slate-800 light:bg-white">Never expire</option>
                        </select>
                      </div>

                      <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200">
                        <Key className="w-5 h-5" />
                        <span>Generate New API Key</span>
                      </button>
                    </div>
                  </div>

                  {/* Data & Privacy */}
                  <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 light:from-white light:to-gray-50 light:border-gray-200">
                    <div className="flex items-center space-x-3 mb-6">
                      <Shield className="w-6 h-6 text-purple-400" />
                      <h3 className="text-2xl font-semibold text-white light:text-slate-900">Data & Privacy</h3>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-all duration-200 light:bg-gray-100 light:hover:bg-gray-200">
                        <div>
                          <h4 className="text-white font-medium light:text-slate-900">Download Your Data</h4>
                          <p className="text-gray-400 text-sm light:text-gray-600">Export all your account data</p>
                        </div>
                        <Download className="w-5 h-5 text-gray-400" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-200">
                        <div>
                          <h4 className="text-red-400 font-medium">Delete Account</h4>
                          <p className="text-gray-400 text-sm">Permanently delete your account and data</p>
                        </div>
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;