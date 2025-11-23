import React from 'react';
import { 
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Brain,
  Upload,
  Database,
  Code,
  Settings,
  Target,
  Clock,
  Shield,
  CheckCircle,
  FileText,
  Zap,
  Cpu,
  HardDrive,
  Smartphone,
  Server,
  Globe,
  Lock,
  TrendingDown,
  Timer,
  Activity
} from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
  onNavigateToCompress: () => void;
}

const Documentation: React.FC<DocumentationProps> = ({ onBack, onNavigateToCompress }) => {
  const fileRequirements = [
    {
      icon: Brain,
      title: 'Sklearn Model',
      options: ['model.onnx', 'model.pt + model architecture file'],
      description: 'This is your fully trained teacher model.',
      details: [
        'ONNX models should be exported with opset version 11+',
        'PyTorch models require separate architecture definition',
        'Models must be in evaluation mode'
      ]
    },
    {
      icon: Database,
      title: 'Dataset Bundle',
      options: ['your .csv file'],
      description: 'the dataset bundle must be in .csv format.',
      details: [
        'Maintain original folder structure',
        'Include schema.yaml with data specifications',
        'Support for image, text, and tabular data'
      ]
    },
    {
      icon: Settings,
      title: 'Preprocessing Pipeline',
      options: ['preprocess.py', 'Dockerfile', 'SavedModel preprocessing layer'],
      description: 'Defines how input is normalized or resized before inference.',
      details: [
        'Python scripts for custom preprocessing',
        'Docker containers for complex environments',
        'TensorFlow SavedModel preprocessing layers'
      ]
    },
    {
      icon: Target,
      title: 'Optimization Level',
      options: ['Dropdown options (extreme,balanced,latency,size,accuracy)'],
      description: 'Determines the device on which model is to be deployed.',
      details: [
        'choose size for the smallest model',
        'choose latency for least time',
        'choose balanced for keeping everything neutral',
        'choose extreme to get the best possible in each of the above sectors'
      ]
    },
    {
      icon: Shield,
      title: 'Security / Consent',
      options: ['check the consent box'],
      description: 'Required for data processing permission.',
      details: [
        'by checking the box you allow us to process you data limited to model compression only',

      ]
    }
  ];

  const deploymentChallenges = [
    {
      icon: HardDrive,
      title: 'Excessive Memory Usage',
      description: 'Large models consume gigabytes of RAM, making deployment expensive and limiting scalability.',
      impact: 'High infrastructure costs'
    },
    {
      icon: Timer,
      title: 'High Latency',
      description: 'Complex models take too long to process requests, creating poor user experiences.',
      impact: 'User abandonment'
    },
    {
      icon: Smartphone,
      title: 'Edge Deployment Failure',
      description: 'Models too large for mobile devices, IoT sensors, and embedded systems.',
      impact: 'Limited deployment options'
    },
    {
      icon: TrendingDown,
      title: 'GPU Strain & Costs',
      description: 'Resource-hungry models require expensive GPU infrastructure and long training times.',
      impact: 'Unsustainable operational costs'
    }
  ];

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
                Documentation
              </h1>
              <button
                onClick={onNavigateToCompress}
                className="bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-lime-400 bg-clip-text text-transparent">
                Technical Documentation
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Complete guide to AI model compression, setup requirements, and deployment best practices.
            </p>
          </div>
        </section>

        {/* Section 1: The Problem with AI Deployment */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-400 mr-4" />
                The AI Deployment Bottleneck
              </h3>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-12">
                  Training and deploying large AI models is expensive and inefficient. Teacher models are resource-hungry, 
                  slow to train, and often too large for real-world devices. This causes excessive GPU strain, high latency, 
                  long training times, and often leads to deployment failure — especially on edge hardware like phones or 
                  microcontrollers. Without optimization, model performance becomes inaccessible and wasteful.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {deploymentChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 hover:border-red-400/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 mb-6">
                    <challenge.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {challenge.title}
                  </h4>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {challenge.description}
                  </p>
                  
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <div className="text-red-400 text-sm font-semibold">Impact:</div>
                    <div className="text-red-300 text-sm">{challenge.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Our Solution */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <Zap className="w-10 h-10 text-lime-400 mr-4" />
                A Smarter, Smaller AI: Our Compression Approach
              </h3>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  We provide an end-to-end AI model compression pipeline that converts large teacher models into 
                  lightweight student versions. Our system maintains user-defined accuracy guarantees while reducing 
                  memory size and latency using cutting-edge techniques like knowledge distillation, pruning, 
                  quantization, and expert routing.
                </p>
                <div className="bg-gradient-to-r from-lime-400/10 to-cyan-400/10 border border-lime-400/20 rounded-xl p-6">
                  <p className="text-2xl font-semibold text-lime-400 mb-2">
                    All you need to do is upload your files and set your targets — we handle the rest.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Benefits */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-lime-500/20 rounded-xl p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-full p-4 mx-auto mb-6">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-lime-400 mb-2">65%</h4>
                <p className="text-white font-semibold mb-2">Size Reduction</p>
                <p className="text-gray-400">Dramatic model compression without accuracy loss</p>
              </div>
              
              <div className="text-center bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full p-4 mx-auto mb-6">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-cyan-400 mb-2">10x</h4>
                <p className="text-white font-semibold mb-2">Faster Inference</p>
                <p className="text-gray-400">Accelerated performance for real-time applications</p>
              </div>
              
              <div className="text-center bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-purple-400 mb-2">100%</h4>
                <p className="text-white font-semibold mb-2">Secure</p>
                <p className="text-gray-400">Enterprise-grade security and compliance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Files & Inputs You Need */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <FileText className="w-10 h-10 text-cyan-400 mr-4" />
                Files & Inputs You Need
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Prepare these files and configurations before starting the compression process.
              </p>
            </div>

            <div className="space-y-12">
              {fileRequirements.map((requirement, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <div className="flex items-start space-x-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg p-4">
                        <requirement.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-2xl font-semibold text-white mb-4">
                        🔹 {requirement.title}
                      </h4>
                      
                      {/* Options */}
                      <div className="mb-4">
                        <p className="text-gray-300 mb-2">Choose either:</p>
                        <div className="space-y-2">
                          {requirement.options.map((option, i) => (
                            <div key={i} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                              <code className="bg-slate-700/50 px-3 py-1 rounded text-cyan-400 text-sm">
                                {option}
                              </code>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-slate-700/20 border-l-4 border-cyan-400 p-4 mb-4">
                        <p className="text-gray-300 italic">"{requirement.description}"</p>
                      </div>

                      {/* Technical Details */}
                      <div className="grid md:grid-cols-3 gap-4">
                        {requirement.details.map((detail, i) => (
                          <div key={i} className="bg-slate-700/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Ready to Compress? */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/20 to-slate-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12">
              <h3 className="text-4xl font-bold text-white mb-6 flex items-center justify-center">
                <ArrowRight className="w-10 h-10 text-lime-400 mr-4" />
                Ready to Compress?
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Already have your files and settings ready? Start the compression process here.
              </p>

              {/* Checklist */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-left space-y-3">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-4">Before You Start:</h4>
                  {[
                    'Model files (.onnx or .pt + architecture)',
                    'Dataset bundle (.csv file)',
                    'Optimization level (device)',
                    'Preprocessing pipeline'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-lime-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-left space-y-3">
                  <h4 className="text-lg font-semibold text-purple-400 mb-4">Configuration Ready:</h4>
                  {[
                    'deployment target defined',
                    'optimization level set',
                    'Consent provided',
                    'Deployment requirements clear'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-lime-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onNavigateToCompress}
                className="bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-12 py-4 rounded-lg font-bold text-xl hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                Go to Compress Project
                <ArrowRight className="ml-3 w-6 h-6" />
              </button>

              <p className="text-gray-400 mt-4 text-sm">
                Need help? Check our <button className="text-cyan-400 hover:text-cyan-300 underline">support documentation</button> or <button className="text-cyan-400 hover:text-cyan-300 underline">contact our team</button>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
