import React, { useState } from 'react';
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  Building,
  Globe,
  Shield
} from 'lucide-react';

interface ContactUsProps {
  onBack: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  file: File | null;
}

const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    file: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [dragActive, setDragActive] = useState(false);

  const subjectOptions = [
    { value: '', label: 'Select a subject...' },
    { value: 'technical-support', label: 'Technical Support' },
    { value: 'sales', label: 'Sales Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'bug-report', label: 'Bug Report' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (file: File) => {
    const allowedTypes = ['.pdf', '.txt', '.png', '.csv'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setErrors(prev => ({ ...prev, file: 'Only PDF, TXT, PNG, and CSV files are allowed' }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setErrors(prev => ({ ...prev, file: 'File size must be less than 10MB' }));
      return;
    }

    setFormData(prev => ({ ...prev, file }));
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
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

        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12">
            <div className="w-20 h-20 bg-gradient-to-r from-lime-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-slate-900" />
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">Message Sent Successfully!</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Thank you for reaching out to KompressAI. We've received your message and will get back to you within 24-48 hours.
            </p>
            
            <div className="bg-slate-700/30 rounded-lg p-6 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">What happens next?</span>
              </div>
              <div className="space-y-2 text-gray-300 text-left">
                <p>• Our team will review your inquiry</p>
                <p>• You'll receive a confirmation email shortly</p>
                <p>• We'll respond with detailed information within 24-48 hours</p>
                <p>• For urgent matters, we'll prioritize your request</p>
              </div>
            </div>

            <button
              onClick={onBack}
              className="bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                Contact Us
              </h1>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-lime-400 bg-clip-text text-transparent">
                Need Help? Let's Talk.
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Have questions about model compression, deployment support, or partnership opportunities? 
              Reach out and we'll get back to you within 24–48 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full bg-slate-700/50 border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-red-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-slate-700/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 placeholder-gray-400`}
                      placeholder="your.email@company.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-red-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Organization / School
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      placeholder="Your company or university"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full bg-slate-700/50 border ${errors.subject ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200`}
                    >
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-slate-800">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-2 text-red-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className={`w-full bg-slate-700/50 border ${errors.message ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-6 py-4 text-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none`}
                      placeholder="Tell us about your project, requirements, or questions..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-red-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Attach File (Optional)
                    </label>
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
                        dragActive 
                          ? 'border-cyan-400 bg-cyan-400/5' 
                          : errors.file 
                            ? 'border-red-500 bg-red-500/5'
                            : 'border-gray-600 hover:border-cyan-400/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept=".pdf,.txt,.png,.csv"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      
                      <div className="text-center">
                        <Upload className={`w-8 h-8 mx-auto mb-3 transition-colors duration-200 ${
                          dragActive ? 'text-cyan-400' : 'text-gray-400'
                        }`} />
                        
                        {formData.file ? (
                          <div className="space-y-2">
                            <p className="text-lime-400 font-semibold">{formData.file.name}</p>
                            <p className="text-sm text-gray-400">
                              {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-gray-300">Drop files here or click to upload</p>
                            <p className="text-sm text-gray-500">PDF, TXT, PNG, CSV (max 10MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.file && (
                      <p className="mt-2 text-red-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.file}
                      </p>
                    )}
                  </div>

                  {/* reCAPTCHA Placeholder */}
                  <div className="bg-slate-700/30 border border-gray-600/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      <span className="text-gray-300">I'm not a robot</span>
                      <Shield className="w-5 h-5 text-gray-400 ml-auto" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">reCAPTCHA verification required</p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-lime-400 to-cyan-400 text-slate-900 px-8 py-4 rounded-lg font-bold text-xl hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Contact Info */}
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-cyan-400" />
                  Get in Touch
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">bhushanrishit@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-semibold">+ 91 701 952 6924</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Address</p>
                      <p className="text-white font-semibold">Bangalore, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-lime-400" />
                  Response Times
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Technical Support</span>
                    <span className="text-cyan-400 font-semibold">24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Sales Inquiries</span>
                    <span className="text-lime-400 font-semibold">12 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Partnerships</span>
                    <span className="text-purple-400 font-semibold">48 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bug Reports</span>
                    <span className="text-orange-400 font-semibold">6 hours</span>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-3 text-purple-400" />
                  Office Hours
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-lime-400/10 border border-lime-400/20 rounded-lg">
                  <p className="text-lime-400 text-sm font-semibold">24/7 Emergency Support</p>
                  <p className="text-gray-400 text-xs">Available for enterprise customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;