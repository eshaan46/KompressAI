import React, { useState, useEffect } from 'react';
import { 
  Activity,
  Zap, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Key, 
  Copy, 
  Eye, 
  EyeOff,
  Download,
  ExternalLink,
  Server,
  Database,
  Cpu,
  HardDrive,
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2//harmless ahh change
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onNavigateToProjects: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToProjects }) => {
  const { projects, loading } = useProjects();
  const { user } = useAuth();
  const [accuracy, setAccuracy] = useState(87.2);
  const [latency, setLatency] = useState(45);
  const [p95Performance, setP95Performance] = useState(123);
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({});

  // Generate mock API keys for completed projects
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
      modelFormat: ['ONNX', 'TensorFlow Lite', 'PyTorch Mobile'][Math.floor(Math.random() * 3)]
    };
  };

  // Project statistics
  const getProjectStats = () => {
    if (!projects.length) return { total: 0, completed: 5, processing: 2, draft: 1, failed: 0 };
    
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const processing = projects.filter(p => p.status === 'processing').length;
    const draft = projects.filter(p => p.status === 'draft').length;
    const failed = projects.filter(p => p.status === 'failed').length;
    
    return { total, completed, processing, draft, failed };
  };

  const stats = getProjectStats();

  // Timeline data for projects over time
  const getProjectTimeline = () => {
    const timeline = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthProjects = projects.filter(p => {
        const projectDate = new Date(p.created_at);
        return projectDate.getMonth() === date.getMonth() && 
               projectDate.getFullYear() === date.getFullYear();
      });
      
      timeline.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        projects: monthProjects.length,
        completed: monthProjects.filter(p => p.status === 'completed').length
      });
    }
    
    return timeline;
  };

  const timelineData = getProjectTimeline();

  // Dummy data for performance timeline
  const [performanceData, setPerformanceData] = useState([
    { time: '00:00', accuracy: 89.2, latency: 52, compression: 15 },
    { time: '00:15', accuracy: 88.8, latency: 48, compression: 25 },
    { time: '00:30', accuracy: 88.5, latency: 45, compression: 35 },
    { time: '00:45', accuracy: 87.9, latency: 43, compression: 45 },
    { time: '01:00', accuracy: 87.6, latency: 41, compression: 55 },
    { time: '01:15', accuracy: 87.2, latency: 39, compression: 65 },
    { time: '01:30', accuracy: 86.8, latency: 37, compression: 72 },
    { time: '01:45', accuracy: 86.5, latency: 35, compression: 78 },
    { time: '02:00', accuracy: 86.1, latency: 34, compression: 82 },
    { time: '02:15', accuracy: 85.9, latency: 33, compression: 85 },
    { time: '02:30', accuracy: 85.6, latency: 32, compression: 87 },
    { time: '02:45', accuracy: 85.4, latency: 31, compression: 89 },
    { time: '03:00', accuracy: 85.2, latency: 30, compression: 91 },
    { time: '03:15', accuracy: 85.0, latency: 29, compression: 92 },
    { time: '03:30', accuracy: 84.8, latency: 28, compression: 93 },
    { time: '03:45', accuracy: 84.6, latency: 27, compression: 94 },
    { time: '04:00', accuracy: 84.5, latency: 26, compression: 95 },
    { time: '04:15', accuracy: 84.4, latency: 25, compression: 95 },
    { time: '04:30', accuracy: 84.3, latency: 25, compression: 95 },
    { time: '04:45', accuracy: 84.2, latency: 24, compression: 95 }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAccuracy(prev => prev + (Math.random() - 0.5) * 0.5);
      setLatency(prev => Math.max(35, Math.min(60, prev + (Math.random() - 0.5) * 5)));
      setP95Performance(prev => Math.max(100, Math.min(150, prev + (Math.random() - 0.5) * 10)));
      
      // Update performance data with new point
      setPerformanceData(prev => {
        const newData = [...prev];
        const lastPoint = newData[newData.length - 1];
        const newTime = new Date(Date.now()).toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        newData.push({
          time: newTime,
          accuracy: Math.max(80, Math.min(90, lastPoint.accuracy + (Math.random() - 0.5) * 0.8)),
          latency: Math.max(20, Math.min(60, lastPoint.latency + (Math.random() - 0.5) * 3)),
          compression: Math.min(95, lastPoint.compression + Math.random() * 0.5)
        });
        
        // Keep only last 20 points
        return newData.slice(-20);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleApiKeyVisibility = (projectId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const MetricCard = ({ title, value, unit, icon: Icon, color, trend }: any) => (
    <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`text-sm px-2 py-1 rounded ${trend > 0 ? 'text-lime-400 bg-lime-400/10' : 'text-red-400 bg-red-400/10'}`}>
          {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-1">
        {value.toFixed(1)}{unit}
      </h3>
      <p className="text-gray-400 text-sm">{title}</p>
      
      {/* Simple chart visualization */}
      <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color} transition-all duration-1000`}
          style={{ width: `${Math.min(100, (value / (title.includes('Accuracy') ? 100 : 200)) * 100)}%` }}
        ></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading dashboard...</p>
        </div>
      </section>
    );
  }

  const maxAccuracy = Math.max(...performanceData.map(d => d.accuracy));
  const maxLatency = Math.max(...performanceData.map(d => d.latency));
  const maxCompression = Math.max(...performanceData.map(d => d.compression));
  const maxTimelineProjects = Math.max(...timelineData.map(d => d.projects), 1);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Live Performance Dashboard
          </h2>
          <p className="text-xl text-gray-300">
            Real-time monitoring of your AI compression projects and deployment metrics
          </p>
        </div>

        {/* Project Overview Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-12">
          <button
            onClick={onNavigateToProjects}
            className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Projects</div>
          </button>
          
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-lime-400 mb-1">{stats.completed}</div>
            <div className="text-gray-400 text-sm">Completed</div>
          </div>
          
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">{stats.processing}</div>
            <div className="text-gray-400 text-sm">Processing</div>
          </div>
          
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-400 mb-1">{stats.draft}</div>
            <div className="text-gray-400 text-sm">Drafts</div>
          </div>
          
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-red-400 mb-1">{stats.failed}</div>
            <div className="text-gray-400 text-sm">Failed</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Live Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <MetricCard
                title="Live Accuracy"
                value={accuracy}
                unit="%"
                icon={Activity}
                color="from-purple-500 to-cyan-500"
                trend={2.3}
              />
              <MetricCard
                title="Latency Monitor"
                value={latency}
                unit="ms"
                icon={Zap}
                color="from-cyan-500 to-lime-500"
                trend={-5.7}
              />
              <MetricCard
                title="p95 Performance"
                value={p95Performance}
                unit="ms"
                icon={Clock}
                color="from-lime-500 to-purple-500"
                trend={-1.2}
              />
            </div>

            {/* Projects Timeline Chart */}
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-cyan-400" />
                  Model Compression
                </h3>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-400">Before</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                    <span className="text-gray-400">After</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 bg-slate-900/50 rounded-lg p-4 relative overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-4 grid grid-cols-12 grid-rows-6 opacity-20">
                  {[...Array(72)].map((_, i) => (
                    <div key={i} className="border-r border-b border-gray-600 border-opacity-30"></div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between text-xs text-gray-500">
                  <span>{maxTimelineProjects}</span>
                  <span>{Math.floor(maxTimelineProjects * 0.75)}</span>
                  <span>{Math.floor(maxTimelineProjects * 0.5)}</span>
                  <span>{Math.floor(maxTimelineProjects * 0.25)}</span>
                  <span>0</span>
                </div>
                
                {/* Chart Bars */}
                <div className="relative h-full flex items-end justify-between space-x-1 ml-8 mr-4">
                  {timelineData.map((point, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end space-y-1 group relative">
                      {/* Total Projects Bar */}
                      <div 
                        className="bg-gradient-to-t from-lime-400 to-cyan-300 rounded-sm opacity-80 hover:opacity-100 transition-opacity duration-200 relative"
                        style={{ height: `${(point.projects / maxTimelineProjects) * 200}px` }}
                      >
                        {/* Completed Projects Overlay */}
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lime-400 to-lime-300 rounded-sm"
                          style={{ height: `${(point.completed / Math.max(point.projects, 1)) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        <div className="bg-slate-800 border border-gray-600 rounded-lg p-3 text-xs whitespace-nowrap shadow-lg">
                          <div className="text-cyan-400">Total: {point.projects}</div>
                          <div className="text-lime-400">Completed: {point.completed}</div>
                          <div className="text-gray-400 mt-1">{point.month}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-8 right-4 flex justify-between text-xs text-gray-500 mt-2">
                  <span>{timelineData[0]?.month}</span>
                  <span>{timelineData[Math.floor(timelineData.length / 2)]?.month}</span>
                  <span>{timelineData[timelineData.length - 1]?.month}</span>
                </div>
              </div>
            </div>

            {/* Performance Timeline */}
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-lime-400" />
                  Real-time Performance
                </h3>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-400">Accuracy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                    <span className="text-gray-400">Latency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-400">Compression</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 bg-slate-900/50 rounded-lg p-4 relative overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-4 grid grid-cols-10 grid-rows-5 opacity-20">
                  {[...Array(50)].map((_, i) => (
                    <div key={i} className="border-r border-b border-gray-600 border-opacity-30"></div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between text-xs text-gray-500">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>
                
                {/* Line Chart */}
                <div className="relative h-full ml-8 mr-4">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                    {/* Accuracy Line */}
                    <polyline
                      fill="none"
                      stroke="url(#accuracyGradient)"
                      strokeWidth="2"
                      points={performanceData.map((point, i) => 
                        `${(i / (performanceData.length - 1)) * 400},${200 - (point.accuracy / 100) * 200}`
                      ).join(' ')}
                    />
                    
                    {/* Latency Line */}
                    <polyline
                      fill="none"
                      stroke="url(#latencyGradient)"
                      strokeWidth="2"
                      points={performanceData.map((point, i) => 
                        `${(i / (performanceData.length - 1)) * 400},${200 - (point.latency / 100) * 200}`
                      ).join(' ')}
                    />
                    
                    {/* Compression Line */}
                    <polyline
                      fill="none"
                      stroke="url(#compressionGradient)"
                      strokeWidth="2"
                      points={performanceData.map((point, i) => 
                        `${(i / (performanceData.length - 1)) * 400},${200 - (point.compression / 100) * 200}`
                      ).join(' ')}
                    />
                    
                    {/* Gradients */}
                    <defs>
                      <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00bcd4" />
                        <stop offset="100%" stopColor="#00e5ff" />
                      </linearGradient>
                      <linearGradient id="latencyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#affc41" />
                        <stop offset="100%" stopColor="#69f0ae" />
                      </linearGradient>
                      <linearGradient id="compressionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#9c27b0" />
                        <stop offset="100%" stopColor="#e91e63" />
                      </linearGradient>
                    </defs>
                    
                    {/* Data Points */}
                    {performanceData.map((point, i) => (
                      <g key={i}>
                        <circle
                          cx={(i / (performanceData.length - 1)) * 400}
                          cy={200 - (point.accuracy / 100) * 200}
                          r="3"
                          fill="#00bcd4"
                          className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                        />
                        <circle
                          cx={(i / (performanceData.length - 1)) * 400}
                          cy={200 - (point.latency / 100) * 200}
                          r="3"
                          fill="#affc41"
                          className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                        />
                        <circle
                          cx={(i / (performanceData.length - 1)) * 400}
                          cy={200 - (point.compression / 100) * 200}
                          r="3"
                          fill="#9c27b0"
                          className="opacity-0 hover:opacity-100 transition-opacity duration-200"
                        />
                      </g>
                    ))}
                  </svg>
                  
                  {/* Hover Areas for Tooltips */}
                  <div className="absolute inset-0 flex">
                    {performanceData.map((point, i) => (
                      <div
                        key={i}
                        className="flex-1 relative group cursor-pointer"
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          <div className="bg-slate-800 border border-gray-600 rounded-lg p-3 text-xs whitespace-nowrap shadow-lg">
                            <div className="text-cyan-400">Accuracy: {point.accuracy.toFixed(1)}%</div>
                            <div className="text-lime-400">Latency: {point.latency.toFixed(0)}ms</div>
                            <div className="text-purple-400">Compression: {point.compression.toFixed(1)}%</div>
                            <div className="text-gray-400 mt-1">{point.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-8 right-4 flex justify-between text-xs text-gray-500 mt-2">
                  <span>{performanceData[0]?.time}</span>
                  <span>{performanceData[Math.floor(performanceData.length / 2)]?.time}</span>
                  <span>{performanceData[performanceData.length - 1]?.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* System Status */}
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Server className="w-5 h-5 mr-2 text-lime-400" />
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">GPU Utilization</span>
                  <span className="text-cyan-400">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Memory Usage</span>
                  <span className="text-lime-400">12.4GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Models</span>
                  <span className="text-purple-400">{stats.processing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Queue Length</span>
                  <span className="text-white">0</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                  <span className="text-gray-400">Model distillation completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-400">Quantization in progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-400">New dataset uploaded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-400">API key generated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployed Models Section */}
        {projects.filter(p => p.status === 'completed').length > 0 && (
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Globe className="w-8 h-8 mr-3 text-cyan-400" />
              Deployed Models & API Access
            </h3>
            
            <div className="grid gap-8">
              {projects.filter(p => p.status === 'completed').map((project) => {
                const modelData = getCompressedModelData(project);
                const apiKey = generateApiKey(project.id);
                const isApiVisible = showApiKeys[project.id];
                
                return (
                  <div key={project.id} className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      
                      {/* Project Info */}
                      <div className="lg:col-span-1">
                        <h4 className="text-xl font-semibold text-white mb-4">{project.title}</h4>
                        <p className="text-gray-400 mb-6">{project.description}</p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Model Format</span>
                            <span className="text-cyan-400 font-semibold">{modelData.modelFormat}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Original Size</span>
                            <span className="text-white">{modelData.originalSize} MB</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Compressed Size</span>
                            <span className="text-lime-400 font-semibold">{modelData.compressedSize} MB</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Compression Ratio</span>
                            <span className="text-purple-400 font-semibold">{modelData.compressionRatio}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="lg:col-span-1">
                        <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Cpu className="w-5 h-5 mr-2 text-lime-400" />
                          Performance
                        </h5>
                        
                        <div className="space-y-4">
                          <div className="bg-slate-700/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400">Latency Improvement</span>
                              <span className="text-lime-400 font-bold">{modelData.latencyImprovement}x</span>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-lime-400 to-cyan-400 h-2 rounded-full"
                                style={{ width: `${Math.min(100, modelData.latencyImprovement * 10)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="bg-slate-700/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400">Accuracy Retention</span>
                              <span className="text-cyan-400 font-bold">{modelData.accuracyRetention}%</span>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                                style={{ width: `${modelData.accuracyRetention}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* API Access */}
                      <div className="lg:col-span-1">
                        <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Key className="w-5 h-5 mr-2 text-purple-400" />
                          API Access
                        </h5>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">API Key</label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-slate-700/50 rounded-lg px-3 py-2 font-mono text-sm">
                                {isApiVisible ? apiKey : '•'.repeat(apiKey.length)}
                              </div>
                              <button
                                onClick={() => toggleApiKeyVisibility(project.id)}
                                className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                              >
                                {isApiVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => copyToClipboard(apiKey)}
                                className="p-2 text-gray-400 hover:text-lime-400 transition-colors duration-200"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">API Endpoint</label>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-slate-700/50 rounded-lg px-3 py-2 font-mono text-sm text-cyan-400 truncate">
                                {modelData.apiEndpoint}
                              </div>
                              <button
                                onClick={() => copyToClipboard(modelData.apiEndpoint)}
                                className="p-2 text-gray-400 hover:text-lime-400 transition-colors duration-200"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => window.open(modelData.deploymentUrl, '_blank')}
                              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>View Demo</span>
                            </button>
                            <button className="flex items-center justify-center space-x-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 px-4 py-2 rounded-lg transition-all duration-200">
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
