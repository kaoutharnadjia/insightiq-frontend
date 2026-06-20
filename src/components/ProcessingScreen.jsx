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
    <div className="fixed inset-0 z-[100] bg-bg-main flex flex-col items-center justify-center p-10 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-red/5 blur-[120px] rounded-full"></div>
      
      <div className="relative space-y-12 flex flex-col items-center">
        {/* Animated Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-accent-red blur-2xl opacity-20 animate-pulse"></div>
          <div className="w-24 h-24 bg-deep-red border border-accent-red/20 rounded-3xl flex items-center justify-center animate-[bounce_2s_infinite] glow-red">
            <Activity className="text-accent-red" size={48} />
          </div>
          
          {/* Orbiting Elements */}
          <div className="absolute -top-4 -right-4 w-10 h-10 bg-accent-red/10 border border-accent-red/20 rounded-xl flex items-center justify-center animate-[spin_4s_linear_infinite] glow-red">
            <ShieldCheck className="text-accent-red" size={18} />
          </div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-accent-soft/10 border border-accent-soft/20 rounded-xl flex items-center justify-center animate-[spin_6s_linear_infinite_reverse] glow-soft">
            <Zap className="text-accent-soft" size={18} />
          </div>
        </div>

        {/* Text Area */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-text-primary tracking-tight uppercase text-glow-primary">
            {message}{dots}
          </h2>
          <p className="text-text-secondary font-medium text-sm tracking-widest uppercase flex items-center justify-center space-x-2">
            <Database size={14} className="animate-pulse" />
            <span>{subMessage}</span>
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-accent-red/20 rounded-full overflow-hidden border border-accent-red/20">
           <div className="h-full bg-gradient-to-r from-accent-red to-accent-soft animate-[loading_2s_ease-in-out_infinite] glow-red"></div>
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
