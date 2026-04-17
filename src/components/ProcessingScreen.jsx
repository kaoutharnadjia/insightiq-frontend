import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Zap, Database } from 'lucide-react';

const ProcessingScreen = ({ message = "Analyzing ERP Data..." }) => {
  const [dots, setDots] = useState('');
  const [subMessage, setSubMessage] = useState('Initializing AI Core');

  const subMessages = [
    'Initializing AI Core',
    'Normalizing Endpoint Data',
    'Synthesizing Market Trends',
    'Evaluating Business Risks',
    'Finalizing Recommendations'
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    const msgInterval = setInterval(() => {
      setSubMessage(prev => {
        const idx = subMessages.indexOf(prev);
        return subMessages[(idx + 1) % subMessages.length];
      });
    }, 1500);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(msgInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0F172A] flex flex-col items-center justify-center p-10 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
      
      <div className="relative space-y-12 flex flex-col items-center">
        {/* Animated Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center animate-[bounce_2s_infinite]">
            <Activity className="text-indigo-400" size={48} />
          </div>
          
          {/* Orbiting Elements */}
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center animate-[spin_4s_linear_infinite]">
            <ShieldCheck className="text-emerald-400" size={18} />
          </div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center animate-[spin_6s_linear_infinite_reverse]">
            <Zap className="text-amber-400" size={18} />
          </div>
        </div>

        {/* Text Area */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            {message}{dots}
          </h2>
          <p className="text-indigo-400/60 font-medium text-sm tracking-widest uppercase flex items-center justify-center space-x-2">
            <Database size={14} className="animate-pulse" />
            <span>{subMessage}</span>
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
           <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProcessingScreen;
