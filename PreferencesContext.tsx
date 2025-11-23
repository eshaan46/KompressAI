import React, { createContext, useContext, useEffect, useState } from 'react';

export interface PreferencesContextType {
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  actualTheme: 'light' | 'dark'; // The actual applied theme
  
  // Language
  language: string;
  setLanguage: (language: string) => void;
  
  // Timezone
  timezone: string;
  setTimezone: (timezone: string) => void;
  
  // Notifications
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
  pushNotifications: boolean;
  setPushNotifications: (enabled: boolean) => void;
  projectUpdates: boolean;
  setProjectUpdates: (enabled: boolean) => void;
  marketingEmails: boolean;
  setMarketingEmails: (enabled: boolean) => void;
  
  // Compression defaults
  autoSave: boolean;
  setAutoSave: (enabled: boolean) => void;
  compressionQuality: 'fast' | 'balanced' | 'maximum';
  setCompressionQuality: (quality: 'fast' | 'balanced' | 'maximum') => void;
  defaultAccuracyFloor: string;
  setDefaultAccuracyFloor: (floor: string) => void;
  apiKeyExpiry: '7' | '30' | '90' | 'never';
  setApiKeyExpiry: (expiry: '7' | '30' | '90' | 'never') => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('kompressai-theme');
    return (saved as 'light' | 'dark' | 'system') || 'dark';
  });
  
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark');
  
  // Language state
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('kompressai-language');
    return saved || 'en';
  });
  
  // Timezone state
  const [timezone, setTimezoneState] = useState(() => {
    const saved = localStorage.getItem('kompressai-timezone');
    return saved || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  });
  
  // Notification states
  const [emailNotifications, setEmailNotificationsState] = useState(() => {
    const saved = localStorage.getItem('kompressai-email-notifications');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [pushNotifications, setPushNotificationsState] = useState(() => {
    const saved = localStorage.getItem('kompressai-push-notifications');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [projectUpdates, setProjectUpdatesState] = useState(() => {
    const saved = localStorage.getItem('kompressai-project-updates');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [marketingEmails, setMarketingEmailsState] = useState(() => {
    const saved = localStorage.getItem('kompressai-marketing-emails');
    return saved ? JSON.parse(saved) : false;
  });
  
  // Compression defaults
  const [autoSave, setAutoSaveState] = useState(() => {
    const saved = localStorage.getItem('kompressai-auto-save');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [compressionQuality, setCompressionQualityState] = useState<'fast' | 'balanced' | 'maximum'>(() => {
    const saved = localStorage.getItem('kompressai-compression-quality');
    return (saved as 'fast' | 'balanced' | 'maximum') || 'balanced';
  });
  
  const [defaultAccuracyFloor, setDefaultAccuracyFloorState] = useState(() => {
    const saved = localStorage.getItem('kompressai-default-accuracy-floor');
    return saved || '3-5';
  });
  
  const [apiKeyExpiry, setApiKeyExpiryState] = useState<'7' | '30' | '90' | 'never'>(() => {
    const saved = localStorage.getItem('kompressai-api-key-expiry');
    return (saved as '7' | '30' | '90' | 'never') || '30';
  });

  // Theme effect
  useEffect(() => {
    const updateTheme = () => {
      let newTheme: 'light' | 'dark' = 'dark';
      
      if (theme === 'system') {
        newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        newTheme = theme;
      }
      
      setActualTheme(newTheme);
      
      // Apply theme to document
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      
      // Update meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0f172a' : '#ffffff');
      }
    };

    updateTheme();
    localStorage.setItem('kompressai-theme', theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Language effect
  useEffect(() => {
    localStorage.setItem('kompressai-language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Timezone effect
  useEffect(() => {
    localStorage.setItem('kompressai-timezone', timezone);
  }, [timezone]);

  // Notification effects
  useEffect(() => {
    localStorage.setItem('kompressai-email-notifications', JSON.stringify(emailNotifications));
  }, [emailNotifications]);

  useEffect(() => {
    localStorage.setItem('kompressai-push-notifications', JSON.stringify(pushNotifications));
  }, [pushNotifications]);

  useEffect(() => {
    localStorage.setItem('kompressai-project-updates', JSON.stringify(projectUpdates));
  }, [projectUpdates]);

  useEffect(() => {
    localStorage.setItem('kompressai-marketing-emails', JSON.stringify(marketingEmails));
  }, [marketingEmails]);

  // Compression defaults effects
  useEffect(() => {
    localStorage.setItem('kompressai-auto-save', JSON.stringify(autoSave));
  }, [autoSave]);

  useEffect(() => {
    localStorage.setItem('kompressai-compression-quality', compressionQuality);
  }, [compressionQuality]);

  useEffect(() => {
    localStorage.setItem('kompressai-default-accuracy-floor', defaultAccuracyFloor);
  }, [defaultAccuracyFloor]);

  useEffect(() => {
    localStorage.setItem('kompressai-api-key-expiry', apiKeyExpiry);
  }, [apiKeyExpiry]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
  };

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
  };

  const setTimezone = (newTimezone: string) => {
    setTimezoneState(newTimezone);
  };

  const setEmailNotifications = (enabled: boolean) => {
    setEmailNotificationsState(enabled);
  };

  const setPushNotifications = (enabled: boolean) => {
    setPushNotificationsState(enabled);
  };

  const setProjectUpdates = (enabled: boolean) => {
    setProjectUpdatesState(enabled);
  };

  const setMarketingEmails = (enabled: boolean) => {
    setMarketingEmailsState(enabled);
  };

  const setAutoSave = (enabled: boolean) => {
    setAutoSaveState(enabled);
  };

  const setCompressionQuality = (quality: 'fast' | 'balanced' | 'maximum') => {
    setCompressionQualityState(quality);
  };

  const setDefaultAccuracyFloor = (floor: string) => {
    setDefaultAccuracyFloorState(floor);
  };

  const setApiKeyExpiry = (expiry: '7' | '30' | '90' | 'never') => {
    setApiKeyExpiryState(expiry);
  };

  const value = {
    theme,
    setTheme,
    actualTheme,
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
  };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};