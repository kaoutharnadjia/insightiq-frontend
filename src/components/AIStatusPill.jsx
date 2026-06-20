import React from 'react';
import { Activity } from 'lucide-react';

const AIStatusPill = ({ active = true }) => {
  return (
    <div className="flex items-center space-x-2 bg-accent-red/10 border border-accent-red/20 px-4 py-1.5 rounded-full w-fit backdrop-blur-md">
      <Activity size={14} className={`${active ? 'text-accent-red animate-pulse' : 'text-text-muted'}`} />
      <span className="text-[10px] font-black uppercase tracking-widest text-text-primary/90">
        AI Engine: <span className={active ? 'text-accent-red' : 'text-text-muted'}>{active ? 'Active' : 'Inactive'}</span>
      </span>
    </div>
  );
};

export default AIStatusPill;
