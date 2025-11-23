import React from 'react';
import { 
  HandHeart, 
  Brain, 
  Camera, 
  Droplets, 
  Scissors, 
  Gauge, 
  Split, 
  Package, 
  Plug 
} from 'lucide-react';

const ProcessFlow = () => {
  const phases = [
    {
      icon: HandHeart,
      title: 'Client Hand-Off',
      description: 'Secure model and data transfer with encryption',
      status: 'completed'
    },
    {
      icon: Brain,
      title: 'Dataset Intelligence',
      description: 'Analyze data patterns and model architecture',
      status: 'completed'
    },
    {
      icon: Camera,
      title: 'Teacher Snapshot',
      description: 'Capture baseline model performance metrics',
      status: 'completed'
    },
    {
      icon: Droplets,
      title: 'Distillation',
      description: 'Knowledge transfer to smaller student model',
      status: 'active'
    },
    {
      icon: Scissors,
      title: 'Structured Prune',
      description: 'Remove redundant parameters and connections',
      status: 'pending'
    },
    {
      icon: Gauge,
      title: 'Quantization Fine-Tune',
      description: 'Optimize numerical precision for efficiency',
      status: 'pending'
    },
    {
      icon: Split,
      title: 'Expert Splitting',
      description: 'Partition model for distributed inference',
      status: 'pending'
    },
    {
      icon: Package,
      title: 'API Packaging',
      description: 'Containerize and prepare for deployment',
      status: 'pending'
    },
    {
      icon: Plug,
      title: 'Client Integration',
      description: 'Deploy optimized model to production',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-lime-400 border-lime-400 text-slate-900';
      case 'active':
        return 'bg-cyan-400 border-cyan-400 text-slate-900 animate-pulse';
      case 'pending':
        return 'bg-slate-700 border-gray-500 text-gray-400';
      default:
        return 'bg-slate-700 border-gray-500 text-gray-400';
    }
  };

  const getConnectorColor = (currentStatus: string, nextStatus: string) => {
    if (currentStatus === 'completed') {
      return 'bg-lime-400';
    } else if (currentStatus === 'active' && nextStatus === 'pending') {
      return 'bg-gradient-to-r from-cyan-400 to-gray-500';
    }
    return 'bg-gray-600';
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Compression Pipeline
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our 9-phase intelligent compression process ensures optimal model 
            performance while maintaining accuracy standards.
          </p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8 mb-8">
            {phases.slice(0, 3).map((phase, index) => (
              <div key={index} className="relative">
                <div className={`w-16 h-16 mx-auto rounded-full border-2 ${getStatusColor(phase.status)} flex items-center justify-center mb-4 transition-all duration-300`}>
                  <phase.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-white text-center mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  {phase.description}
                </p>
                
                {index < 2 && (
                  <div className={`absolute top-8 left-1/2 w-full h-0.5 ${getConnectorColor(phase.status, phases[index + 1].status)} transform translate-x-4`}></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 mb-8">
            {phases.slice(3, 6).map((phase, index) => (
              <div key={index + 3} className="relative">
                <div className={`w-16 h-16 mx-auto rounded-full border-2 ${getStatusColor(phase.status)} flex items-center justify-center mb-4 transition-all duration-300`}>
                  <phase.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-white text-center mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  {phase.description}
                </p>
                
                {index < 2 && (
                  <div className={`absolute top-8 left-1/2 w-full h-0.5 ${getConnectorColor(phase.status, phases[index + 4].status)} transform translate-x-4`}></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8">
            {phases.slice(6, 9).map((phase, index) => (
              <div key={index + 6} className="relative">
                <div className={`w-16 h-16 mx-auto rounded-full border-2 ${getStatusColor(phase.status)} flex items-center justify-center mb-4 transition-all duration-300`}>
                  <phase.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-white text-center mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  {phase.description}
                </p>
                
                {index < 2 && (
                  <div className={`absolute top-8 left-1/2 w-full h-0.5 ${getConnectorColor(phase.status, phases[index + 7].status)} transform translate-x-4`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-6">
          {phases.map((phase, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full border-2 ${getStatusColor(phase.status)} flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                <phase.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {phase.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;