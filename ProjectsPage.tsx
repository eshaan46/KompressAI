import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Search,
  Filter,
  Grid,
  List,
  Zap,
  Database,
  Code,
  Settings,
  Download        // 👈 NEW
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

interface ProjectsPageProps {
  onBack: () => void;
  onProjectClick: (projectId: string) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, onProjectClick }) => {
  const { projects, loading } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-lime-400" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />;
      case 'submitted':
        return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-lime-400/20 text-lime-400 border-lime-400/30';
      case 'processing':
        return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
      case 'submitted':
        return 'bg-cyan-400/20 text-cyan-400 border-cyan-400/30';
      case 'failed':
        return 'bg-red-400/20 text-red-400 border-red-400/30';
      default:
        return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const getProjectIcon = (project: any) => {
    if (project.model_file_url) return <Zap className="w-6 h-6" />;
    if (project.dataset_file_url) return <Database className="w-6 h-6" />;
    if (project.evaluation_script_url) return <Code className="w-6 h-6" />;
    return <Settings className="w-6 h-6" />;
  };

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    processing: projects.filter(p => p.status === 'processing').length,
    submitted: projects.filter(p => p.status === 'submitted').length,
    draft: projects.filter(p => p.status === 'draft').length,
    failed: projects.filter(p => p.status === 'failed').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Circuit pattern background */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,188,212,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,188,212,0.1) 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                All Projects
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status ({statusCounts.all})</option>
                  <option value="completed">Completed ({statusCounts.completed})</option>
                  <option value="processing">Processing ({statusCounts.processing})</option>
                  <option value="submitted">Submitted ({statusCounts.submitted})</option>
                  <option value="draft">Draft ({statusCounts.draft})</option>
                  <option value="failed">Failed ({statusCounts.failed})</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
              <div className="text-sm text-gray-500">
                {searchTerm && `Filtered by: "${searchTerm}"`}
                {statusFilter !== 'all' && ` • Status: ${statusFilter}`}
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          {filteredProjects.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onProjectClick(project.id)}
                  className={`bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/10 ${
                    viewMode === 'list' ? 'flex items-center space-x-6' : ''
                  }`}
                >
                  {/* Project Icon */}
                  <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                      {getProjectIcon(project)}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div
                      className={`${
                        viewMode === 'list' ? 'flex items-center justify-between' : ''
                      }`}
                    >
                      <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p
                          className={`text-gray-400 mb-4 ${
                            viewMode === 'list' ? 'line-clamp-1' : 'line-clamp-2'
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Status and Date */}
                      <div
                        className={`${
                          viewMode === 'list' ? 'flex items-center space-x-4 ml-6' : 'space-y-3'
                        }`}
                      >
                        <div
                          className={`flex items-center space-x-2 ${
                            viewMode === 'list' ? '' : 'justify-between'
                          }`}
                        >
                          <div
                            className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-semibold ${getStatusColor(
                              project.status
                            )}`}
                          >
                            {getStatusIcon(project.status)}
                            <span className="capitalize">{project.status}</span>
                          </div>
                        </div>

                        <div
                          className={`flex items-center space-x-2 text-sm text-gray-500 ${
                            viewMode === 'list' ? '' : 'justify-between'
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(project.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Project Details (Grid view only) */}
                    {viewMode === 'grid' && (
                      <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                project.model_file_url ? 'bg-lime-400' : 'bg-gray-600'
                              }`}
                            ></div>
                            <span className="text-gray-400">Model</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                project.dataset_file_url ? 'bg-lime-400' : 'bg-gray-600'
                              }`}
                            ></div>
                            <span className="text-gray-400">Dataset</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                project.evaluation_script_url ? 'bg-lime-400' : 'bg-gray-600'
                              }`}
                            ></div>
                            <span className="text-gray-400">Evaluation</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                project.preprocessing_file_url ? 'bg-lime-400' : 'bg-gray-600'
                              }`}
                            ></div>
                            <span className="text-gray-400">Preprocessing</span>
                          </div>

                          {/* 🔹 Download compressed model (if available) */}
                          {project.compressed_file && (
                            <div className="col-span-2 mt-2">
                              <a
                                href={project.compressed_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()} // don't trigger card click
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-lime-400 text-slate-900 font-semibold text-xs hover:shadow-lg hover:shadow-cyan-400/25 transition"
                              >
                                <Download className="w-4 h-4" />
                                <span>
                                  Download compressed model (
                                  {project.compressed_file
                                    .split('/')
                                    .pop()
                                    ?.split('?')[0] ?? 'file'}
                                  )
                                </span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' ? 'No projects found' : 'No projects yet'}
              </h3>
              <p className="text-gray-500 mb-8">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start by creating your first AI compression project.'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <button className="bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105">
                  Create First Project
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
