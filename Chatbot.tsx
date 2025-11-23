import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your KompressAI assistant. I can help you with questions about model compression, our platform features, and guide you through the process. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Enhanced responses for comprehensive Q&A
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you with KompressAI model compression. What would you like to know?";
    }
    
    // 1. What does KompressAI do?
    if (message.includes('what does kompressai do') || message.includes('what is kompressai') || message.includes('kompressai do')) {
      return "🟩 KompressAI helps you compress AI models without compromising their accuracy. You upload your model files, and we optimize them for faster and smaller deployment using advanced techniques like pruning, quantization, and knowledge distillation. We can reduce model size by up to 95% while maintaining 97-100% accuracy retention!";
    }
    
    // 2. Is KompressAI free?
    if (message.includes('free') || message.includes('cost') || message.includes('price') || message.includes('pricing')) {
      return "🟩 Right now, we offer a free tier for individual users and students with generous usage limits. For enterprise customers and heavy usage, premium plans with advanced features and priority support are available. Contact our team for custom enterprise pricing that scales with your needs.";
    }
    
    // 3. How to submit project
    if (message.includes('submit') || message.includes('how to') || message.includes('upload project')) {
      return "🟩 Go to the 'Compress Project' page, fill in the form fields with your project details, and upload your model files. Required formats include .onnx, .pt, .zip, .py, .json. The process is simple: upload your model → configure settings → submit for compression!";
    }
    
    // 4. File types supported
    if (message.includes('file type') || message.includes('format') || message.includes('supported')) {
      return "🟩 We support .onnx, .pt, .pth, .zip, .json, .py, .txt, .pdf, .proto, and more! For models: ONNX and PyTorch formats. For datasets: ZIP archives. For scripts: Python files. For documentation: PDF and text files. You can check the specific allowed file types in each upload section.";
    }
    
    // 5. Dataset zip file contents
    if (message.includes('dataset') || message.includes('zip file') || message.includes('schema')) {
      return "🟩 Your dataset ZIP should contain train/, val/, and test/ folders with your data, plus a schema.yaml file describing the data format, input dimensions, and any preprocessing requirements. This helps our compression engine understand your data structure for optimal optimization.";
    }
    
    // 6. Preprocessing file
    if (message.includes('preprocessing') || message.includes('preprocess')) {
      return "🟩 It's a script (usually preprocess.py) that describes how input data is cleaned, resized, normalized, or transformed before feeding into your model. This ensures the compressed model receives data in the exact format it expects for accurate predictions.";
    }
    
    // 7. File storage
    if (message.includes('stored') || message.includes('storage') || message.includes('where are files')) {
      return "🟩 Files are securely stored in Supabase Buckets with enterprise-grade encryption. Only you can access your own files through authenticated sessions. We use bank-level security with SOC2 compliance and end-to-end encryption for all data transfers.";
    }
    
    // 8. View/download files
    if (message.includes('view') || message.includes('download') || message.includes('access files')) {
      return "🟩 Yes! Visit your project dashboard to view file names, check upload status, and download your original or compressed files. You have full control over your data with easy access to all project assets.";
    }
    
    // 9. Upload issues
    if (message.includes('not uploading') || message.includes('upload fail') || message.includes('upload problem')) {
      return "🟩 Check if your file is one of the allowed types and under the size limit (50MB). Try refreshing the page, clearing browser cache, or re-logging in. If issues persist, our support team is here to help - contact us through the platform!";
    }
    
    // 10. Compression expectations
    if (message.includes('compression') || message.includes('how much') || message.includes('reduction')) {
      return "🟩 It depends on your model architecture and complexity. On average, you can expect a 40–95% reduction in size with minimal accuracy loss. Our advanced techniques can achieve up to 10x speed improvements while maintaining 97-100% of original accuracy!";
    }
    
    // 11. Compression techniques
    if (message.includes('techniques') || message.includes('methods') || message.includes('how do you compress')) {
      return "🟩 We use cutting-edge techniques including structured pruning (removing redundant parameters), quantization (reducing numerical precision), knowledge distillation (teacher-student learning), and expert splitting for distributed inference. Each technique is carefully applied based on your specific requirements.";
    }
    
    // 12. Accuracy drop
    if (message.includes('accuracy') || message.includes('performance') || message.includes('quality')) {
      return "🟩 You can specify an 'accuracy floor' (e.g., max 2% loss), and our intelligent compression engine respects that constraint. Most models maintain 97-100% of their original accuracy while achieving dramatic size reductions. We never compromise on quality!";
    }
    
    // 13. Data privacy
    if (message.includes('private') || message.includes('security') || message.includes('data safe')) {
      return "🟩 Absolutely! Your data is completely private and secure. Files and user data are only accessible by you through authenticated sessions. We use enterprise-grade security with NDA/DPA compliance, SOC2 certification, and end-to-end encryption. Your intellectual property is fully protected.";
    }
    
    // 14. Delete account
    if (message.includes('delete') || message.includes('remove account') || message.includes('close account')) {
      return "🟩 You can delete your account and all associated data through your profile settings under 'Data & Privacy'. Alternatively, contact our support team via the contact page for assistance with account deletion. We respect your right to data portability and deletion.";
    }
    
    // 15. Evaluation script
    if (message.includes('evaluate') || message.includes('evaluation') || message.includes('evaluate.py')) {
      return "🟩 The evaluate.py script tells us how to measure your model's performance using metrics like accuracy, F1-score, precision, recall, or custom metrics like MAE/MSE. This ensures we can validate that the compressed model meets your quality standards before delivery.";
    }
    
    // 16. Test compressed model
    if (message.includes('test') || message.includes('try model') || message.includes('demo')) {
      return "🟩 Yes! Once compression is complete, you get access to a live demo URL, downloadable model files, and production-ready API endpoints. You can test your compressed model immediately and integrate it into your applications with our comprehensive SDKs.";
    }
    
    // 17. API access
    if (message.includes('api') || message.includes('integration') || message.includes('programmatic')) {
      return "🟩 Absolutely! Every compressed model comes with production-ready API endpoints, comprehensive documentation, and SDKs for popular programming languages. You get instant API access with authentication keys for seamless integration into your applications.";
    }
    
    // 18. Multiple models
    if (message.includes('multiple') || message.includes('many models') || message.includes('several projects')) {
      return "🟩 Yes! You can create unlimited projects, each with its own model, datasets, and configuration. Our dashboard helps you manage all your compression projects with detailed tracking, performance metrics, and deployment status for each model.";
    }
    
    // 19. Founders
    if (message.includes('founder') || message.includes('creator') || message.includes('who made') || message.includes('team')) {
      return "🟩 I was created by two brilliant visionaries: Rishit Bhushan and Eashan Godbole! These exceptional founders combined their expertise in AI research and software engineering to revolutionize model compression. Rishit brings deep technical leadership and product vision, while Eashan contributes cutting-edge AI research and algorithmic innovation. Together, they're making AI more accessible and efficient for everyone! 🚀";
    }
    
    // 20. Founders' roles
    if (message.includes('role') || message.includes('what did') || message.includes('contribution') || message.includes('who did what')) {
      return "🟩 While Eashan Godbole architected the sophisticated AI compression algorithms and machine learning pipelines that power our platform, Rishit Bhushan engineered the robust API infrastructure, backend systems, and platform architecture that brings everything to life. Their complementary skills created a seamless fusion of cutting-edge AI research and production-grade engineering! 💡";
    }
    
    // Deployment targets
    if (message.includes('deployment') || message.includes('target') || message.includes('device')) {
      return "🟩 We optimize for various deployment targets: High-end servers/workstations (maximum performance), personal computers (balanced optimization), mobile devices (power-efficient), microcontrollers (ultra-lightweight), and cloud APIs (scalable infrastructure). Each target gets custom optimization strategies!";
    }
    
    // Model formats
    if (message.includes('onnx') || message.includes('pytorch') || message.includes('tensorflow')) {
      return "🟩 We support all major model formats! ONNX for cross-platform compatibility, PyTorch (.pt, .pth) for research models, TensorFlow for production systems, and more. Our platform automatically handles format conversions and optimizations for your target deployment environment.";
    }
    
    // Processing time
    if (message.includes('time') || message.includes('how long') || message.includes('duration')) {
      return "🟩 Compression typically takes 2-8 hours depending on model size and complexity. You'll receive real-time progress updates and notifications. Large models (>1GB) may take longer, but we provide detailed progress tracking and estimated completion times throughout the process.";
    }
    
    // Support and help
    if (message.includes('support') || message.includes('help') || message.includes('contact')) {
      return "🟩 I'm here to help 24/7! You can also check our comprehensive documentation, contact our technical team through the contact page, or schedule a consultation. For urgent enterprise matters, we provide priority support with dedicated technical specialists.";
    }
    
    // Thank you responses
    if (message.includes('thank')) {
      return "🟩 You're absolutely welcome! I'm always here to help with your KompressAI journey. Whether you need technical guidance, have questions about compression, or want to explore advanced features, feel free to ask anything! 🚀";
    }
    
    // Default responses for unmatched queries
    const defaultResponses = [
      "That's a fascinating question! For detailed technical information, I recommend checking our comprehensive documentation or contacting our expert team. Is there something specific about KompressAI model compression I can help clarify?",
      "Great question! I'd be happy to help you with that. Could you provide more details about what you're trying to achieve with your AI model compression on KompressAI?",
      "Interesting inquiry! While I can help with general compression topics, our technical team can provide more detailed guidance. Would you like me to connect you with them, or is there a specific aspect of our platform I can explain?",
      "I'm here to assist with all things KompressAI! Could you rephrase your question or ask about our compression techniques, file requirements, platform features, or deployment options? I'm ready to help! 🤖"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group"
        >
          <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">KompressAI Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[480px]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      
                      {/* Avatar */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-lime-400 to-cyan-400' 
                          : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900'
                          : 'bg-slate-700/50 text-white border border-gray-600/50'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-slate-700' : 'text-gray-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-slate-700/50 border border-gray-600/50 rounded-2xl px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about KompressAI...."
                    className="flex-1 bg-slate-700/50 border border-gray-600 text-white rounded-lg px-6 py-4 text-sm focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "What does KompressAI do?",
                    "How to submit project?",
                    "File requirements",
                    "Pricing info",
                    "Who are the founders?",
                    "API access"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(suggestion)}
                      className="text-xs bg-slate-700/30 hover:bg-slate-600/50 text-gray-300 hover:text-white px-3 py-1 rounded-full border border-gray-600/50 hover:border-cyan-400/50 transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
