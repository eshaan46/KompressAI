import React from 'react';
import { ArrowRight, Cpu, Zap, Shield } from 'lucide-react';

interface HeroProps {
  onNavigateToCompress: () => void;
  onNavigateToDocumentation: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToCompress, onNavigateToDocumentation }) => {
  return (
    <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-lime-400 bg-clip-text text-transparent">
              KompressAI
            </span>
            <br />
            <span className="text-white">Advanced AI Model Compression</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your AI models with cutting-edge compression technology. 
            Achieve production-ready deployment with optimized performance, 
            reduced latency, and enterprise-grade security.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={onNavigateToCompress}
              className="bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              Compress Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={onNavigateToDocumentation}
              className="border border-purple-500 text-purple-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-200 flex items-center justify-center"
            >
              View Documentation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300">
              <Cpu className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">65%</h3>
              <p className="text-gray-400">Model Size Reduction</p>
            </div>
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300">
              <Zap className="w-12 h-12 text-lime-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">10x</h3>
              <p className="text-gray-400">Faster Inference</p>
            </div>
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
              <p className="text-gray-400">Enterprise Security</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
