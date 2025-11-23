import React from 'react';
import { 
  ArrowRight, 
  Upload, 
  Brain, 
  Zap, 
  Target, 
  Shield, 
  CheckCircle,
  TrendingUp,
  Cpu,
  Database,
  Code,
  Settings,
  Clock,
  Package,
  Plug,
  ArrowLeft
} from 'lucide-react';

interface HowItWorksProps {
  onBack: () => void;
  onNavigateToCompress: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onBack, onNavigateToCompress }) => {
  const compressionTechniques = [
    {
      icon: Brain,
      title: 'Knowledge Distillation',
      description: 'Transfer knowledge from large teacher models to smaller, efficient student models while preserving performance.',
      benefits: ['90% size reduction', 'Maintains accuracy', 'Faster inference'],
      color: 'from-purple-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Structured Pruning',
      description: 'Remove redundant neurons and connections systematically to reduce model complexity.',
      benefits: ['Removes dead weights', 'Preserves architecture', 'Hardware optimized'],
      color: 'from-cyan-500 to-lime-500'
    },
    {
      icon: Zap,
      title: 'Quantization',
      description: 'Reduce numerical precision from 32-bit to 8-bit or lower while maintaining model quality.',
      benefits: ['4x memory reduction', '2-4x speed boost', 'Edge deployment ready'],
      color: 'from-lime-500 to-purple-500'
    },
    {
      icon: Package,
      title: 'Expert Splitting',
      description: 'Partition models into specialized components for distributed and efficient inference.',
      benefits: ['Parallel processing', 'Scalable deployment', 'Resource optimization'],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      icon: Upload,
      title: 'Upload Your Model',
      description: 'Start by uploading your trained model in ONNX or PyTorch format along with your dataset and evaluation scripts.',
      details: ['Support for .onnx, .pt, .pth formats', 'Automatic model analysis', 'Secure encrypted transfer']
    },
    {
      step: '02',
      icon: Brain,
      title: 'Intelligent Analysis',
      description: 'Our AI analyzes your model architecture, identifies optimization opportunities, and creates a compression strategy.',
      details: ['Architecture profiling', 'Performance bottleneck detection', 'Optimization roadmap generation']
    },
    {
      step: '03',
      title: 'Compression Pipeline',
      icon: Settings,
      description: 'Execute our 9-phase compression pipeline with real-time monitoring and quality assurance.',
      details: ['Multi-technique optimization', 'Real-time progress tracking', 'Quality checkpoints']
    },
    {
      step: '04',
      icon: CheckCircle,
      title: 'Validation & Deployment',
      description: 'Validate compressed model performance and deploy with production-ready APIs and monitoring.',
      details: ['Accuracy validation', 'Performance benchmarking', 'API containerization']
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: '65% Size Reduction',
      description: 'Achieve dramatic model size reductions without sacrificing accuracy',
      metric: '65%'
    },
    {
      icon: Zap,
      title: '10x Faster Inference',
      description: 'Accelerate model inference for real-time applications',
      metric: '10x'
    },
    {
      icon: Cpu,
      title: 'Edge Deployment Ready',
      description: 'Deploy on mobile devices, IoT, and edge computing platforms',
      metric: '100%'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security compliance',
      metric: 'SOC2'
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
                How It Works
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
                Advanced AI Model
              </span>
              <br />
              <span className="text-white">Compression Technology</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your large AI models into efficient, production-ready solutions 
              using cutting-edge compression techniques while maintaining accuracy and performance.
            </p>
            <div className="flex justify-center">
              <button
                onClick={onNavigateToCompress}
                className="bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105 flex items-center"
              >
                Start Compressing
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Compression Techniques */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-4">
                Compression Techniques
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We employ multiple state-of-the-art compression techniques to achieve 
                optimal model performance and efficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {compressionTechniques.map((technique, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${technique.color} p-4 mb-6`}>
                    <technique.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {technique.title}
                  </h4>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {technique.description}
                  </p>
                  
                  <div className="space-y-2">
                    {technique.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Steps */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-4">
                Our 4-Step Process
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From model upload to production deployment, we guide you through 
                every step of the compression journey.
              </p>
            </div>

            <div className="space-y-16">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {step.title}
                        </h4>
                        <p className="text-lg text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      {step.details.map((detail, i) => (
                        <div
                          key={i}
                          className="bg-slate-800/30 rounded-lg p-4 border border-gray-700/50"
                        >
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Visual */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl p-8 flex items-center justify-center">
                      <step.icon className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-4">
                Why Choose Our Platform
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Industry-leading compression results with enterprise-grade security and support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full p-4 mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {benefit.metric}
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h4>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Deep Dive */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-4">
                Technical Deep Dive
              </h3>
              <p className="text-xl text-gray-300">
                Understanding the science behind our compression technology.
              </p>
            </div>

            <div className="space-y-12">
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Database className="w-8 h-8 text-cyan-400" />
                  <h4 className="text-2xl font-semibold text-white">Knowledge Distillation Process</h4>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our knowledge distillation process transfers the learned representations from large teacher models 
                  to smaller student models. We use advanced techniques including attention transfer, feature matching, 
                  and progressive distillation to ensure maximum knowledge retention.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-lime-400 font-semibold mb-2">Temperature Scaling</div>
                    <div className="text-sm text-gray-400">Softmax temperature adjustment for better knowledge transfer</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-cyan-400 font-semibold mb-2">Feature Alignment</div>
                    <div className="text-sm text-gray-400">Intermediate layer matching for deeper understanding</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-purple-400 font-semibold mb-2">Progressive Training</div>
                    <div className="text-sm text-gray-400">Gradual complexity increase during training</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Code className="w-8 h-8 text-lime-400" />
                  <h4 className="text-2xl font-semibold text-white">Quantization Techniques</h4>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement post-training quantization and quantization-aware training to reduce model precision 
                  while maintaining accuracy. Our approach includes dynamic quantization, static quantization, 
                  and mixed-precision optimization.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="text-cyan-400 font-semibold">Supported Precisions</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">FP32 → INT8</span>
                        <span className="text-lime-400">4x reduction</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">FP32 → INT4</span>
                        <span className="text-lime-400">8x reduction</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Mixed Precision</span>
                        <span className="text-lime-400">Optimal balance</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-purple-400 font-semibold">Hardware Optimization</div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div>• CPU SIMD instructions</div>
                      <div>• GPU tensor cores</div>
                      <div>• Mobile NPU acceleration</div>
                      <div>• Edge TPU compatibility</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Compress Your Models?
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of developers and researchers who trust our platform 
              for production-ready AI model optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onNavigateToCompress}
                className="bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                Start Compression
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border border-purple-500 text-purple-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-200 flex items-center justify-center">
                View Documentation
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
