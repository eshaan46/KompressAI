import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Database, 
  Code, 
  Settings, 
  Target, 
  Clock, 
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save,
  Loader2,
  Smartphone,
  List
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useAuth } from '../contexts/AuthContext';
import { uploadFile, UploadResult } from '../lib/storage';

interface CompressProjectProps {
  onBack: () => void;
}

const CompressProject: React.FC<CompressProjectProps> = ({ onBack }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [modelType, setModelType] = useState<'onnx' | 'sklearn' | ''>('');
  const [preprocessType, setPreprocessType] = useState<'python' | 'docker' | 'savedmodel' | ''>('');
  const [optimizationLevel, setOptimizationLevel] = useState('');
  const [deploymentTarget, setDeploymentTarget] = useState('');
  const [dataConsent, setDataConsent] = useState(false);
  const [dpaConsent, setDpaConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New state for Criterion dropdown
  const [criterion, setCriterion] = useState<'regression' | 'classification' | ''>('');

  const { createProject } = useProjects();
  const { user } = useAuth();

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({
    onnx: null,
    sklearn: null,
    architecture: null,
    dataset: null,
    evaluation: null,
    preprocess: null,
    nda: null
  });

  const [uploadProgress, setUploadProgress] = useState<{[key: string]: boolean}>({});
  const [uploadErrors, setUploadErrors] = useState<{[key: string]: string}>({});

  const deploymentOptions = [
    {
      value: '',
      label: 'Select deployment target...',
      description: ''
    },
    {
      value: 'GPU',
      label: 'GPU',
      description: 'High-performance GPU acceleration for maximum computational power'
    },
    {
      value: 'CPU',
      label: 'CPU',
      description: 'Standard CPU processing for general-purpose computing environments'
    },
    {
      value: 'MCU',
      label: 'MCU',
      description: 'Microcontroller units for ultra-low-power embedded applications'
    },
    {
      value: 'Edge',
      label: 'Edge',
      description: 'Edge computing devices with balanced performance and power efficiency'
    }
  ];

  const optimizationOptions = [
    {
      value: '',
      label: 'Select optimization level...',
      description: ''
    },
    {
      value: 'latency',
      label: 'Latency',
      description: 'Focus on speed and performance - maintains the speed for the device it runs on'
    },
    {
      value: 'size',
      label: 'Size',
      description: 'Prioritize smallest model size - keeps the size less when the size is reduced'
    },
    {
      value: 'accuracy',
      label: 'Accuracy',
      description: 'Maintain highest accuracy during compression - focuses on accuracy while compression'
    }
  ];

  // Criterion options for the new drop down
  const criterionOptions = [
    { value: '', label: 'Select criterion type...' },
    { value: 'regression', label: 'Regression' },
    { value: 'classification', label: 'Classification' }
  ];

  const handleFileUpload = (key: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [key]: file }));
    setUploadErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const uploadFileToStorage = async (file: File, folder: 'models' | 'datasets' | 'scripts' | 'preprocess'): Promise<string | null> => {
    if (!user) throw new Error('User not authenticated');
    const result = await uploadFile(file, folder, user.id);
    if (result.error) {
      throw new Error(result.error);
    }
    return result.url;
  };

  const handleSubmit = async () => {
    if (!projectTitle.trim() || !projectDescription.trim()) {
      alert('Please fill in project title and description');
      return;
    }

    if (!deploymentTarget) {
      alert('Please select a deployment target');
      return;
    }

    if (!optimizationLevel) {
      alert('Please select an optimization level');
      return;
    }

    if (!dataConsent) {
      alert('Please check the consent box');
      return;
    }

    if (!criterion) {
      alert('Please select the criterion type');
      return;
    }

    if (!user) {
      alert('User not authenticated');
      return;
    }

    setSubmitting(true);
    setUploadProgress({});
    setUploadErrors({});

    try {
      let modelFileUrl: string | null = null;
      let datasetFileUrl: string | null = null;
      let evaluationScriptUrl: string | null = null;
      let preprocessingFileUrl: string | null = null;

      // Upload model file
      if (uploadedFiles.onnx) {
        setUploadProgress(prev => ({ ...prev, onnx: true }));
        try {
          modelFileUrl = await uploadFileToStorage(uploadedFiles.onnx, 'models');
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Upload failed';
          setUploadErrors(prev => ({ ...prev, onnx: errorMsg }));
          throw new Error(`Model upload failed: ${errorMsg}`);
        } finally {
          setUploadProgress(prev => ({ ...prev, onnx: false }));
        }
      } else if (uploadedFiles.sklearn) {
        setUploadProgress(prev => ({ ...prev, sklearn: true }));
        try {
          modelFileUrl = await uploadFileToStorage(uploadedFiles.sklearn, 'models');
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Upload failed';
          setUploadErrors(prev => ({ ...prev, sklearn: errorMsg }));
          throw new Error(`Model upload failed: ${errorMsg}`);
        } finally {
          setUploadProgress(prev => ({ ...prev, sklearn: false }));
        }
      }

      // Upload dataset file
      if (uploadedFiles.dataset) {
        setUploadProgress(prev => ({ ...prev, dataset: true }));
        try {
          datasetFileUrl = await uploadFileToStorage(uploadedFiles.dataset, 'datasets');
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Upload failed';
          setUploadErrors(prev => ({ ...prev, dataset: errorMsg }));
          throw new Error(`Dataset upload failed: ${errorMsg}`);
        } finally {
          setUploadProgress(prev => ({ ...prev, dataset: false }));
        }
      }

      const projectData = {
        title: projectTitle,
        description: projectDescription,
        model_file_url: modelFileUrl,
        dataset_file_url: datasetFileUrl,
        evaluation_script_url: evaluationScriptUrl,
        // preprocessing_file_url: preprocessingFileUrl,
        optimization_level: optimizationLevel,
        deployment_target: deploymentTarget,
        criterion: criterion,
        status: 'submitted' as const,
      };

      await createProject(projectData);
      alert('Project submitted successfully!');
      onBack();
    } catch (error) {
      console.error('Error submitting project:', error);
      alert(`Failed to submit project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const FileUploadArea = ({ 
    id, 
    acceptedTypes, 
    label, 
    icon: Icon,
    uploadKey 
  }: {
    id: string;
    acceptedTypes: string;
    label: string;
    icon: any;
    uploadKey: string;
  }) => {
    const isUploading = uploadProgress[uploadKey];
    const hasError = uploadErrors[uploadKey];
    const hasFile = uploadedFiles[uploadKey];

    return (
      <div className="relative">
        <input
          type="file"
          id={id}
          accept={acceptedTypes}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(uploadKey, file);
          }}
          disabled={isUploading}
        />
        <label
          htmlFor={id}
          className={`block border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-300 group ${
            hasError 
              ? 'border-red-500 bg-red-500/5' 
              : hasFile 
                ? 'border-lime-400 bg-lime-400/5' 
                : 'border-gray-600 hover:border-cyan-400/50'
          } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        >
          <div className="text-center">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-spin" />
            ) : (
              <Icon className={`w-8 h-8 mx-auto mb-2 transition-colors duration-200 ${
                hasError 
                  ? 'text-red-400' 
                  : hasFile 
                    ? 'text-lime-400' 
                    : 'text-gray-400 group-hover:text-cyan-400'
              }`} />
            )}
            <p className={`text-sm transition-colors duration-200 ${
              hasError 
                ? 'text-red-300' 
                : hasFile 
                  ? 'text-lime-300' 
                  : 'text-gray-300 group-hover:text-white'
            }`}>
              {isUploading 
                ? 'Uploading...' 
                : hasFile 
                  ? hasFile.name 
                  : label
              }
            </p>
            <p className="text-xs text-gray-500 mt-1">{acceptedTypes}</p>
            {hasError && (
              <p className="text-xs text-red-400 mt-2">{hasError}</p>
            )}
          </div>
          {hasFile && !isUploading && !hasError && (
            <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-lime-400" />
          )}
          {hasError && (
            <AlertCircle className="absolute top-2 right-2 w-5 h-5 text-red-400" />
          )}
        </label>
      </div>
    );
  };

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
                <span>Back to Home</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                Compress Project
              </h1>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
            <div className="space-y-12">
              
              {/* Project Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Project Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g., Image Classification Model Compression"
                      className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Description *
                    </label>
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Describe your model and compression goals..."
                      rows={4}
                      className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* New Criterion Dropdown */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg">
                    <List className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Criterion</h2>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-3">
                    Criterion Type *
                  </label>
                  <select
                    value={criterion}
                    onChange={(e) => setCriterion(e.target.value as 'regression' | 'classification' | '')}
                    className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                    required
                  >
                    {criterionOptions.map(option => (
                      <option 
                        key={option.value}
                        value={option.value}
                        className="bg-slate-800"
                      >{option.label}</option>
                    ))}
                  </select>
                  {criterion && (
                    <div className="mt-3 p-4 bg-slate-700/20 border-l-4 border-pink-400 rounded-r-lg">
                      <p className="text-gray-300 italic">
                        {criterion === 'regression' 
                          ? 'Select this option for regression tasks (predicting continuous values).' 
                          : criterion === 'classification'
                            ? 'Select this option for classification tasks (predicting discrete classes).'
                            : ''}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-gray-400 bg-slate-800/20 p-4 rounded-lg border-l-4 border-pink-400">
                  Choose whether your task is a regression or classification problem. This impacts evaluation and metrics used downstream.
                </p>
              </div>

              {/* Deployment Target */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Deployment Target</h2>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-3">
                    Target Deployment Environment *
                  </label>
                  <select
                    value={deploymentTarget}
                    onChange={(e) => setDeploymentTarget(e.target.value)}
                    className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                    required
                  >
                    {deploymentOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-slate-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  {deploymentTarget && (
                    <div className="mt-3 p-4 bg-slate-700/20 border-l-4 border-cyan-400 rounded-r-lg">
                      <p className="text-gray-300 italic">
                        "{deploymentOptions.find(opt => opt.value === deploymentTarget)?.description}"
                      </p>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-400 bg-slate-800/20 p-4 rounded-lg border-l-4 border-purple-400">
                  Select your target deployment environment to optimize compression settings for your specific hardware constraints and performance requirements.
                </p>
              </div>

              {/* 1. AI Model */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">AI Model</h2>
                </div>

                <FileUploadArea
                  id="aimodel-upload"
                  acceptedTypes=".PTH"
                  label="Drop your AI model file or click to upload"
                  icon={Upload}
                  uploadKey="onnx"
                />
                
                <p className="text-gray-400 bg-slate-800/20 p-4 rounded-lg border-l-4 border-cyan-400">
                  Upload your trained AI model file in .PTH (PyTorch Model Files) format.
                </p>
              </div>

              {/* 2. Dataset Bundle */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Dataset Bundle</h2>
                </div>
                
                <FileUploadArea
                  id="dataset-upload"
                  acceptedTypes=".csv"
                  label="Drop dataset bundle or click to upload"
                  icon={Database}
                  uploadKey="dataset"
                />
                
                <p className="text-gray-400 bg-slate-800/20 p-4 rounded-lg border-l-4 border-purple-400">
                  Upload your dataset file in .csv format.
                </p>
              </div>

              {/* 5. Optimization Level */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Optimization Level</h2>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-3">
                    Performance Optimization Level *
                  </label>
                  <select
                    value={optimizationLevel}
                    onChange={(e) => setOptimizationLevel(e.target.value)}
                    className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                    required
                  >
                    {optimizationOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-slate-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  {optimizationLevel && (
                    <div className="mt-3 p-4 bg-slate-700/20 border-l-4 border-purple-400 rounded-r-lg">
                      <p className="text-gray-300 italic">
                        "{optimizationOptions.find(opt => opt.value === optimizationLevel)?.description}"
                      </p>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-400 bg-slate-800/20 p-4 rounded-lg border-l-4 border-purple-400">
                  Choose the optimization level that balances your performance requirements with model quality constraints.
                </p>
              </div>

              {/* 6. Security / Data Consent */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Security / Data Consent</h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer p-4 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={dataConsent}
                      onChange={(e) => setDataConsent(e.target.checked)}
                      className="w-5 h-5 text-cyan-400 bg-slate-700 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                    />
                    <span className="text-lg text-gray-300">I consent to process my data</span>
                  </label>
                </div>

                <p className="text-gray-400 bg-slate-800/20 p-4 rounded-lg border-l-4 border-cyan-400">
                  We require your consent to process and use your data for compressing.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <button 
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-12 py-4 bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 font-bold text-xl rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200"
                >
                  <span>{submitting ? 'Submitting...' : 'Start Compression'}</span>
                  {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <AlertCircle className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompressProject;
