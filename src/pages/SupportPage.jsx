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
        'rgba(139, 26, 46, 0.2)', // burgundy
        'rgba(192, 54, 78, 0.2)', // crimson
        'rgba(107, 16, 32, 0.2)', // deep wine
        'rgba(192, 144, 154, 0.2)', // dusty rose
      ],
      borderColor: [
        '#8B1A2E',
        '#C0364E',
        '#6B1020',
        '#C0909A',
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
          color: '#C0909A', // dusty rose
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
            <div className="bg-crimson-night p-10 rounded-[2.5rem] border border-dark-rose relative overflow-hidden group glow-burgundy">
              <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy/5 blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-dusty-rose text-xs font-black uppercase tracking-widest mb-2">Total Open Tickets</p>
                  <h2 className="text-6xl font-black text-pearl text-glow-pearl">{data.kpis.complaintCount}</h2>
                </div>
                <div className="p-4 bg-burgundy/10 rounded-2xl text-crimson glow-crimson">
                  <MessageSquare size={32} />
                </div>
              </div>
              <p className="mt-4 text-sm text-dusty-rose/60 font-medium italic">"High volume in Billing due to regional tax updates."</p>
            </div>

            <div className="bg-crimson-night p-10 rounded-[2.5rem] border border-dark-rose relative overflow-hidden group glow-burgundy">
              <div className="absolute top-0 right-0 w-64 h-64 bg-deep-wine/5 blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-dusty-rose text-xs font-black uppercase tracking-widest mb-2">Resolution Efficiency</p>
                  <h2 className="text-6xl font-black text-pearl text-glow-pearl">{data.kpis.resolutionRate}%</h2>
                </div>
                <div className="p-4 bg-deep-wine/10 rounded-2xl text-crimson glow-crimson">
                  <CheckCircle2 size={32} />
                </div>
              </div>
              <div className="mt-8 h-2 bg-abyss rounded-full overflow-hidden border border-dark-rose">
                 <div className="h-full bg-crimson glow-crimson" style={{ width: `${data.kpis.resolutionRate}%` }}></div>
              </div>
            </div>
        </div>

        <div className="bg-crimson-night p-10 rounded-[2.5rem] border border-dark-rose flex flex-col items-center glow-burgundy">
           <h3 className="text-xl font-bold text-pearl mb-8 flex items-center space-x-3 w-full">
             <PieChart className="text-crimson" />
             <span>Ticket Category Breakdown</span>
           </h3>
           <div className="w-full max-w-[320px] flex-1">
              <Doughnut data={chartData} options={doughnutOptions} />
           </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-bold text-pearl flex items-center space-x-3">
             <ShieldAlert className="text-crimson" />
             <span>Active AI Anomalies</span>
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportInsights.length > 0 ? supportInsights.map((insight, idx) => (
                <div key={idx} className="bg-crimson-night border border-dark-rose p-8 rounded-[2.5rem] flex items-start space-x-6 hover:border-burgundy/50 transition-all glow-burgundy">
                   <div className="p-4 bg-burgundy/10 text-crimson rounded-2xl glow-crimson">
                      <Activity size={24} />
                   </div>
                   <div>
                      <h4 className="text-pearl font-bold text-xl mb-1">{insight.region || 'System Context'}</h4>
                      <p className="text-dusty-rose font-medium text-sm mb-4 leading-relaxed">{insight.prediction}</p>
                      <div className="bg-abyss/50 border border-dark-rose px-6 py-4 rounded-2xl">
                         <p className="text-crimson font-black text-[10px] uppercase tracking-widest mb-1">Recommended Strategy</p>
                         <p className="text-pearl font-bold text-sm">{insight.recommendation}</p>
                      </div>
                   </div>
                </div>
              )) : (
                <div className="p-10 border border-dashed border-dark-rose rounded-[2.5rem] text-center w-full md:col-span-2">
                   <p className="text-dusty-rose font-bold">All support channels operating within normal parameters.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
