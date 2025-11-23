import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProcessFlow from './components/ProcessFlow';
import Dashboard from './components/Dashboard';
import CompressProject from './components/CompressProject';
import HowItWorks from './components/HowItWorks';
import Documentation from './components/Documentation';
import Profile from './components/Profile';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetails from './components/ProjectDetails';
import ContactUs from './components/ContactUs';
import Chatbot from './components/Chatbot';
//dummy ahh comm

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'compress' | 'how-it-works' | 'documentation' | 'profile' | 'dashboard' | 'projects' | 'project-details' | 'contact'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleNavigateToCompress = () => {
    setCurrentPage('compress');
  };

  const handleNavigateToHowItWorks = () => {
    setCurrentPage('how-it-works');
  };

  const handleNavigateToDocumentation = () => {
    setCurrentPage('documentation');
  };

  const handleNavigateToProfile = () => {
    setCurrentPage('profile');
  };

  const handleNavigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigateToProjects = () => {
    setCurrentPage('projects');
  };

  const handleNavigateToContact = () => {
    setCurrentPage('contact');
  };

  const handleNavigateToProjectDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('project-details');
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    setSelectedProjectId(null);
  };

  return (
    <AuthProvider>
      <PreferencesProvider>
        <ProtectedRoute>
          <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden dark:bg-slate-900 light:bg-white light:text-slate-900">
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
            
            <div className="relative z-10">
              {currentPage === 'compress' && (
                <CompressProject onBack={handleNavigateToHome} />
              )}

              {currentPage === 'how-it-works' && (
                <HowItWorks 
                  onBack={handleNavigateToHome} 
                  onNavigateToCompress={handleNavigateToCompress}
                />
              )}

              {currentPage === 'documentation' && (
                <Documentation 
                  onBack={handleNavigateToHome} 
                  onNavigateToCompress={handleNavigateToCompress}
                />
              )}

              {currentPage === 'profile' && (
                <Profile onBack={handleNavigateToHome} />
              )}

              {currentPage === 'projects' && (
                <ProjectsPage 
                  onBack={handleNavigateToHome} 
                  onProjectClick={handleNavigateToProjectDetails}
                />
              )}

              {currentPage === 'project-details' && selectedProjectId && (
                <ProjectDetails 
                  projectId={selectedProjectId}
                  onBack={() => setCurrentPage('projects')}
                />
              )}

              {currentPage === 'contact' && (
                <ContactUs onBack={handleNavigateToHome} />
              )}

              {currentPage === 'dashboard' && (
                <div>
                  {/* Header for Dashboard Page */}
                  <div className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-20 dark:bg-slate-900/95 light:bg-white/95 light:border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex items-center justify-between h-16">
                        <button
                          onClick={handleNavigateToHome}
                          className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200 light:text-gray-600 light:hover:text-cyan-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span>Back to Home</span>
                        </button>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                          Live Dashboard
                        </h1>
                        <div className="w-24"></div> {/* Spacer for centering */}
                      </div>
                    </div>
                  </div>
                  <Dashboard onNavigateToProjects={handleNavigateToProjects} />
                </div>
              )}

              {currentPage === 'home' && (
                <>
                  <Navigation 
                    onNavigateToCompress={handleNavigateToCompress}
                    onNavigateToHowItWorks={handleNavigateToHowItWorks}
                    onNavigateToDocumentation={handleNavigateToDocumentation}
                    onNavigateToProfile={handleNavigateToProfile}
                    onNavigateToDashboard={handleNavigateToDashboard}
                    onNavigateToContact={handleNavigateToContact}
                  />
                  <Hero 
                    onNavigateToCompress={handleNavigateToCompress}
                    onNavigateToDocumentation={handleNavigateToDocumentation}
                  />
                  <ProcessFlow />
                  <Dashboard onNavigateToProjects={handleNavigateToProjects} />
                </>
              )}
            </div>


            {/* Chatbot - Always visible */}
            <Chatbot />
          </div>
        </ProtectedRoute>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;
