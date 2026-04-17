import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import Layout from '../components/Layout';
import ProcessingScreen from '../components/ProcessingScreen';
import { MessageSquare, CheckCircle2, ShieldAlert, Activity, PieChart } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import '../utils/chartSetup';
import { commonOptions } from '../utils/chartSetup';

const SupportPage = ({ erpType }) => {
  const { data, loading } = useAnalytics(erpType);

  if (loading) return <ProcessingScreen message="Synthesizing Agent Activity" />;

  const supportInsights = data.insights.filter(i => i.type === 'root_cause' || i.category === 'support');

  const chartData = {
    labels: ['Technical', 'Billing', 'Account', 'Other'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.2)',
        'rgba(245, 158, 11, 0.2)',
        'rgba(168, 85, 247, 0.2)',
        'rgba(148, 163, 184, 0.2)',
      ],
      borderColor: [
        '#6366f1',
        '#f59e0b',
        '#a855f7',
        '#94a3b8',
      ],
      borderWidth: 2,
    }]
  };

  const doughnutOptions = {
    ...commonOptions,
    scales: {
      x: { display: false },
      y: { display: false }
    },
    plugins: {
      ...commonOptions.plugins,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#94A3B8',
          font: { weight: 'bold', size: 10 },
          padding: 20,
          usePointStyle: true,
        }
      }
    }
  };

  return (
    <Layout erpType={erpType} title="Customer Experience">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
            <div className="bg-[#1E293B] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Total Open Tickets</p>
                  <h2 className="text-6xl font-black text-white">{data.kpis.complaintCount}</h2>
                </div>
                <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-400">
                  <MessageSquare size={32} />
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-400 font-medium italic">"High volume in Billing due to regional tax updates."</p>
            </div>

            <div className="bg-[#1E293B] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Resolution Efficiency</p>
                  <h2 className="text-6xl font-black text-white">{data.kpis.resolutionRate}%</h2>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400">
                  <CheckCircle2 size={32} />
                </div>
              </div>
              <div className="mt-8 h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-purple-500" style={{ width: `${data.kpis.resolutionRate}%` }}></div>
              </div>
            </div>
        </div>

        <div className="bg-[#1E293B] p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-center">
           <h3 className="text-xl font-bold text-white mb-8 flex items-center space-x-3 w-full">
             <PieChart className="text-indigo-400" />
             <span>Ticket Category Breakdown</span>
           </h3>
           <div className="w-full max-w-[320px] flex-1">
              <Doughnut data={chartData} options={doughnutOptions} />
           </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-bold text-white flex items-center space-x-3">
             <ShieldAlert className="text-indigo-400" />
             <span>Active AI Anomalies</span>
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportInsights.length > 0 ? supportInsights.map((insight, idx) => (
                <div key={idx} className="bg-[#1E293B] border border-white/10 p-8 rounded-[2.5rem] flex items-start space-x-6 hover:border-indigo-500/30 transition-all">
                   <div className="p-4 bg-amber-500/10 text-amber-400 rounded-2xl">
                      <Activity size={24} />
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-xl mb-1">{insight.region || 'System Context'}</h4>
                      <p className="text-gray-400 font-medium text-sm mb-4 leading-relaxed">{insight.prediction}</p>
                      <div className="bg-indigo-500/5 border border-indigo-500/10 px-6 py-4 rounded-2xl">
                         <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-1">Recommended Strategy</p>
                         <p className="text-white font-bold text-sm">{insight.recommendation}</p>
                      </div>
                   </div>
                </div>
              )) : (
                <div className="p-10 border border-dashed border-white/10 rounded-[2.5rem] text-center w-full md:col-span-2">
                   <p className="text-gray-500 font-bold">All support channels operating within normal parameters.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
