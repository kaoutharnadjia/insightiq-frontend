import React from 'react';
import Layout from '../components/Layout';
import { useAnalytics } from '../hooks/useAnalytics';
import { Lightbulb, Zap, TrendingUp, Users } from 'lucide-react';

const InsightsPage = ({ erpType }) => {
  const { data, loading } = useAnalytics(erpType);

  return (
    <Layout erpType={erpType} title="Strategic Insights">
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-burgundy to-bg-secondary p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <Zap className="text-accent-red mb-4" size={32} />
            <h2 className="text-3xl font-black text-white mb-2">AI Executive Summary</h2>
            <p className="text-text-secondary font-medium leading-relaxed max-w-md">
              Based on your {erpType} data from the last 30 days, we've identified key growth opportunities and operational risks.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-red/20 blur-3xl rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-text-muted">Decoding business intelligence...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {data.insights.map((insight, idx) => (
              <div key={idx} className="glass-morphism p-8 rounded-[2rem] group hover:border-accent-red/30 transition-all">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-accent-red/10 rounded-2xl flex items-center justify-center text-accent-red">
                    {insight.type === 'financial' ? <TrendingUp size={24} /> : <Lightbulb size={24} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">{insight.type} Strategy</h4>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Optimized for efficiency</p>
                  </div>
                </div>
                <p className="text-text-secondary font-medium text-lg mb-6 italic">"{insight.prediction}"</p>
                <div className="flex items-center space-x-2 text-accent-red font-bold text-sm">
                  <span>View detailed analysis</span>
                  <Zap size={14} className="fill-accent-red" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InsightsPage;
