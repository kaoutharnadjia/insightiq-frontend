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
        'rgba(90, 15, 28, 0.2)', // burgundy
        'rgba(214, 51, 74, 0.2)', // accent-red
        'rgba(122, 22, 38, 0.2)', // wine-red
        'rgba(201, 163, 163, 0.2)', // text-secondary
      ],
      borderColor: [
        '#5a0f1c',
        '#d6334a',
        '#7a1626',
        '#c9a3a3',
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
          color: '#c9a3a3', // text-secondary
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
            <div className="bg-bg-secondary p-10 rounded-[2.5rem] border border-border-dark relative overflow-hidden group glow-red">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/5 blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-2">Total Open Tickets</p>
                  <h2 className="text-6xl font-black text-text-primary text-glow-primary">{data.kpis.complaintCount}</h2>
                </div>
                <div className="p-4 bg-accent-red/5 rounded-2xl text-accent-red glow-soft">
                  <MessageSquare size={32} />
                </div>
              </div>
              <p className="mt-4 text-sm text-text-muted/60 font-medium italic">"High volume in Billing due to regional tax updates."</p>
            </div>

            <div className="bg-bg-secondary p-10 rounded-[2.5rem] border border-border-dark relative overflow-hidden group glow-red">
              <div className="absolute top-0 right-0 w-64 h-64 bg-wine-red/5 blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-2">Resolution Efficiency</p>
                  <h2 className="text-6xl font-black text-text-primary text-glow-primary">{data.kpis.resolutionRate}%</h2>
                </div>
                <div className="p-4 bg-wine-red/10 rounded-2xl text-accent-red glow-soft">
                  <CheckCircle2 size={32} />
                </div>
              </div>
              <div className="mt-8 h-2 bg-bg-main rounded-full overflow-hidden border border-border-dark">
                 <div className="h-full bg-accent-red glow-soft" style={{ width: `${data.kpis.resolutionRate}%` }}></div>
              </div>
            </div>
        </div>

        <div className="bg-bg-secondary p-10 rounded-[2.5rem] border border-border-dark flex flex-col items-center glow-red">
           <h3 className="text-xl font-bold text-text-primary mb-8 flex items-center space-x-3 w-full">
             <PieChart className="text-accent-red" />
             <span>Ticket Category Breakdown</span>
           </h3>
           <div className="w-full max-w-[320px] flex-1">
              <Doughnut data={chartData} options={doughnutOptions} />
           </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-bold text-text-primary flex items-center space-x-3">
             <ShieldAlert className="text-accent-red" />
             <span>Active AI Anomalies</span>
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportInsights.length > 0 ? supportInsights.map((insight, idx) => (
                 <div key={idx} className="bg-bg-secondary border border-border-dark p-8 rounded-[2.5rem] flex items-start space-x-6 hover:border-accent-red/50 transition-all glow-red">
                    <div className="p-4 bg-accent-red/5 text-accent-red rounded-2xl glow-soft">
                      <Activity size={24} />
                   </div>
                   <div>
                      <h4 className="text-text-primary font-bold text-xl mb-1">{insight.region || 'System Context'}</h4>
                      <p className="text-text-secondary font-medium text-sm mb-4 leading-relaxed">{insight.prediction}</p>
                      <div className="bg-bg-main/50 border border-border-dark px-6 py-4 rounded-2xl">
                         <p className="text-accent-red font-black text-[10px] uppercase tracking-widest mb-1">Recommended Strategy</p>
                         <p className="text-text-primary font-bold text-sm">{insight.recommendation}</p>
                      </div>
                   </div>
                </div>
              )) : (
                <div className="p-10 border border-dashed border-border-dark rounded-[2.5rem] text-center w-full md:col-span-2">
                   <p className="text-text-muted font-bold">All support channels operating within normal parameters.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
