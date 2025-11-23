import React from 'react';
import { Upload, Database, Code, Settings, Target, Clock, Shield } from 'lucide-react';

const WorkflowCards = () => {
  const workflowSteps = [
    {
      icon: Upload,
      title: 'Upload Baseline Model',
      description: 'Upload your .pt, .onnx, or TensorFlow model files',
      acceptedFiles: '.pt, .onnx, .pb',
      color: 'from-cyan-500 to-purple-500'
    },
    {
      icon: Database,
      title: 'Upload Dataset Bundle',
      description: 'Provide training/validation datasets for optimization',
      acceptedFiles: '.zip, .tar.gz',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code,
      title: 'Upload Evaluation Script',
      description: 'Custom evaluation metrics and validation logic',
      acceptedFiles: '.py, .ipynb',
      color: 'from-pink-500 to-cyan-500'
    },
    {
      icon: Settings,
      title: 'Upload Preprocess Pipeline',
      description: 'Data preprocessing and transformation pipelines',
      acceptedFiles: '.py, .json',
      color: 'from-cyan-500 to-lime-500'
    },
    {
      icon: Target,
      title: 'Set Accuracy Floor',
      description: 'Define minimum acceptable model performance',
      acceptedFiles: 'Config',
      color: 'from-lime-500 to-purple-500'
    },
    {
      icon: Clock,
      title: 'Memory/Latency Targets',
      description: 'Specify performance and resource constraints',
      acceptedFiles: 'Parameters',
      color: 'from-purple-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Upload NDA/DPA',
      description: 'Data protection and confidentiality agreements',
      acceptedFiles: '.pdf, .docx',
      color: 'from-cyan-500 to-purple-500'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Compression Workflow
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow our streamlined process to compress and optimize your AI models
            with precision and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workflowSteps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 cursor-pointer"
            >
              {/* Drag and drop area */}
              <div className="border-2 border-dashed border-gray-600 group-hover:border-cyan-400/50 rounded-lg p-4 mb-4 transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} p-3 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-200">
                  Drop files or click to upload
                </p>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                {step.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                {step.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-slate-700/50 px-2 py-1 rounded">
                  {step.acceptedFiles}
                </span>
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-purple-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:via-purple-400/5 group-hover:to-cyan-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowCards;