import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Key,
  Copy,
  Eye,
  EyeOff,
  Download,
  ExternalLink,
  Cpu,
  Database,
  Code,
  Settings,
  Zap,
  Target,
  Shield,
  Globe,
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, onBack }) => {
  const { projects, loading } = useProjects();
  const [showApiKey, setShowApiKey] = useState(false);
  
  const project = projects.find(p => p.id === projectId);

  // Generate dummy API key
  const generateApiKey = (projectId: string) => {
    return `ak_${projectId.slice(0, 8)}_${Math.random().toString(36).substring(2, 15)}`;
  };

  // Mock compressed model data
  const getCompressedModelData = (project: any) => {
    const originalSize = Math.floor(Math.random() * 500) + 100; // 100-600 MB
    const compressedSize = Math.floor(originalSize * 0.05); // 95% reduction
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    return {
      originalSize,
      compressedSize,
      compressionRatio,
      latencyImprovement: Math.floor(Math.random() * 8) + 2, // 2-10x
      accuracyRetention: (Math.random() * 3 + 97).toFixed(1), // 97-100%
      apiEndpoint: `https://api.kompressai.io/v1/models/${project.id}/predict`,
      deploymentUrl: `https://${project.id.slice(0, 8)}.kompressai.app`,
      modelFormat: ['ONNX', 'TensorFlow Lite', 'PyTorch Mobile'][Math.floor(Math.random() * 3)],
      throughput: Math.floor(Math.random() * 1000) + 500, // 500-1500 requests/sec
      memoryUsage: Math.floor(Math.random() * 2000) + 500, // 500-2500 MB
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-lime-400" />;
      case 'processing':
        return <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />;
      case 'submitted':
        return <Clock className="w-6 h-6 text-cyan-400" />;
      case 'failed':
        return <AlertCircle className="w-6 h-6 text-red-400" />;
      default:
        return <FileText className="w-6 h-6 text-gray-400" />;
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const apiKey = generateApiKey(project.id);
  const modelData = getCompressedModelData(project);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
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
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Projects</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                Project Details
              </h1>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Project Header */}
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex items-center space-x-6">
                  <div className={`flex items-center space-x-3 px-4 py-2 rounded-full border text-lg font-semibold ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-5 h-5" />
                    <span>Created {formatDate(project.created_at)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-5 h-5" />
                    <span>Updated {formatDate(project.updated_at)}</span>
                  </div>
                </div>
              </div>
              
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Project Configuration */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Project Configuration */}
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-cyan-400" />
                  Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Accuracy Floor</label>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <span className="text-white">{project.accuracy_floor || 'Not specified'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Optimization Level</label>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <span className="text-white capitalize">{project.optimization_level || 'Not specified'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Deployment Target</label>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <span className="text-white">{project.deployment_target || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploaded Files */}
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-lime-400" />
                  Uploaded Files
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-300">Model File</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${project.model_file_url ? 'bg-lime-400' : 'bg-gray-600'}`}></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Dataset</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${project.dataset_file_url ? 'bg-lime-400' : 'bg-gray-600'}`}></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Code className="w-5 h-5 text-lime-400" />
                      <span className="text-gray-300">Evaluation Script</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${project.evaluation_script_url ? 'bg-lime-400' : 'bg-gray-600'}`}></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-300">Preprocessing</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${project.preprocessing_file_url ? 'bg-lime-400' : 'bg-gray-600'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Performance & API */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Performance Metrics (only for completed projects) */}
              {project.status === 'completed' && (
                <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-3 text-lime-400" />
                    Performance Metrics
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center bg-slate-700/30 rounded-xl p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-lime-400 mb-1">{modelData.compressionRatio}%</div>
                      <div className="text-gray-400 text-sm">Compression Ratio</div>
                    </div>
                    
                    <div className="text-center bg-slate-700/30 rounded-xl p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-cyan-400 mb-1">{modelData.latencyImprovement}x</div>
                      <div className="text-gray-400 text-sm">Latency Improvement</div>
                    </div>
                    
                    <div className="text-center bg-slate-700/30 rounded-xl p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-purple-400 mb-1">{modelData.accuracyRetention}%</div>
                      <div className="text-gray-400 text-sm">Accuracy Retention</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Model Size Comparison</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Original Size</span>
                          <span className="text-white font-semibold">{modelData.originalSize} MB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Compressed Size</span>
                          <span className="text-lime-400 font-semibold">{modelData.compressedSize} MB</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-lime-400 to-cyan-400 h-3 rounded-full"
                            style={{ width: `${100 - parseFloat(modelData.compressionRatio)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">Runtime Performance</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Throughput</span>
                          <span className="text-cyan-400 font-semibold">{modelData.throughput} req/s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Memory Usage</span>
                          <span className="text-purple-400 font-semibold">{modelData.memoryUsage} MB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Model Format</span>
                          <span className="text-white font-semibold">{modelData.modelFormat}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* API Access (only for completed projects) */}
              {project.status === 'completed' && (
                <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Key className="w-6 h-6 mr-3 text-purple-400" />
                    API Access & Deployment
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">API Key</label>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-slate-700/50 rounded-lg px-4 py-3 font-mono text-sm">
                          {showApiKey ? apiKey : '•'.repeat(apiKey.length)}
                        </div>
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                        >
                          {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey)}
                          className="p-3 text-gray-400 hover:text-lime-400 transition-colors duration-200"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">API Endpoint</label>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-slate-700/50 rounded-lg px-4 py-3 font-mono text-sm text-cyan-400">
                          {modelData.apiEndpoint}
                        </div>
                        <button
                          onClick={() => copyToClipboard(modelData.apiEndpoint)}
                          className="p-3 text-gray-400 hover:text-lime-400 transition-colors duration-200"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-3">Deployment URL</label>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-slate-700/50 rounded-lg px-4 py-3 font-mono text-sm text-purple-400">
                          {modelData.deploymentUrl}
                        </div>
                        <button
                          onClick={() => copyToClipboard(modelData.deploymentUrl)}
                          className="p-3 text-gray-400 hover:text-lime-400 transition-colors duration-200"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => window.open(modelData.deploymentUrl, '_blank')}
                        className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>View Live Demo</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 px-6 py-3 rounded-lg transition-all duration-200">
                        <Download className="w-5 h-5" />
                        <span>Download Model</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Processing Status (for non-completed projects) */}
              {project.status !== 'completed' && (
                <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Activity className="w-6 h-6 mr-3 text-cyan-400" />
                    Project Status
                  </h3>
                  
                  <div className="text-center py-12">
                    {getStatusIcon(project.status)}
                    <h4 className="text-2xl font-semibold text-white mt-4 mb-2 capitalize">
                      {project.status}
                    </h4>
                    <p className="text-gray-400 mb-6">
                      {project.status === 'processing' && 'Your model is currently being compressed. This may take several hours depending on model complexity.'}
                      {project.status === 'submitted' && 'Your project has been submitted and is waiting to be processed.'}
                      {project.status === 'draft' && 'This project is still in draft mode. Complete the submission to start processing.'}
                      {project.status === 'failed' && 'There was an error processing your project. Please check your files and try again.'}
                    </p>
                    
                    {project.status === 'processing' && (
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                      </div>
                    )}
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

export default ProjectDetails;