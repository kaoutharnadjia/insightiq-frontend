import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import Layout from '../components/Layout';
import ProcessingScreen from '../components/ProcessingScreen';
import { DollarSign, TrendingUp, ArrowUpRight, Globe } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import '../utils/chartSetup';
import { commonOptions } from '../utils/chartSetup';

const RevenuePage = ({ erpType }) => {
  const { data, loading } = useAnalytics(erpType);

  if (loading) return <ProcessingScreen message="Calculating Financial KPIs" />;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Revenue',
      data: [35000, 42000, 38000, 55000, 48000, 62000, 75000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  };

  return (
    <Layout erpType={erpType} title="Revenue & Sales">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#1E293B] p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl -mr-32 -mt-32"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Total Gross Revenue</p>
                <h2 className="text-6xl font-black text-white">${data.kpis.totalSales.toLocaleString()}</h2>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400">
                <DollarSign size={32} />
              </div>
            </div>
            <div className="mt-8 flex items-center space-x-3 text-emerald-400 font-bold">
              <ArrowUpRight size={20} />
              <span>+12.4% from last period</span>
            </div>
          </div>

          <div className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-white/5">
             <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
               <TrendingUp className="text-indigo-400" />
               <span>Revenue Growth Curve</span>
             </h3>
             <div className="h-64">
                <Line data={chartData} options={commonOptions} />
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h3 className="text-white font-bold flex items-center space-x-2">
                <Globe size={18} className="text-indigo-400" />
                <span>Regional Distribution</span>
              </h3>
              <div className="space-y-6">
                 <RegionalRow label="North America" value="$420k" percentage={65} color="bg-indigo-500" />
                 <RegionalRow label="Europe / EMEA" value="$285k" percentage={45} color="bg-purple-500" />
                 <RegionalRow label="APAC Region" value="$145k" percentage={25} color="bg-emerald-500" />
              </div>
           </div>

           <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-8 rounded-[2.5rem]">
              <p className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-2">AI Forecast</p>
              <h4 className="text-white font-bold text-lg mb-4">Projected 15% growth in Q3</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Based on current trajectory and historical seasonality, we anticipate a sharp increase in enterprise-tier subscriptions.</p>
           </div>
        </div>
      </div>
    </Layout>
  );
};

const RegionalRow = ({ label, value, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-bold">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default RevenuePage;
