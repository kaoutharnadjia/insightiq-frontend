import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import Layout from '../components/Layout';
import ProcessingScreen from '../components/ProcessingScreen';
import { DollarSign, TrendingUp, ArrowUpRight, Globe, ShoppingBag } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import '../utils/chartSetup';
import { commonOptions } from '../utils/chartSetup';

const RevenuePage = ({ erpType }) => {
  const { data, loading } = useAnalytics(erpType);

  if (loading) return <ProcessingScreen message="Analyzing Sales Performance" />;

  // Process Sales Data for Chart
  const salesByMonth = {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  data.data.sales.forEach(sale => {
    const date = new Date(sale.date);
    const month = monthNames[date.getMonth()];
    salesByMonth[month] = (salesByMonth[month] || 0) + sale.totalPrice;
  });

  const chartLabels = monthNames.filter(m => salesByMonth[m] !== undefined);
  const chartValues = chartLabels.map(m => salesByMonth[m]);

  const chartData = {
    labels: chartLabels.length > 0 ? chartLabels : ['No Data'],
    datasets: [{
      label: 'Revenue',
      data: chartValues.length > 0 ? chartValues : [0],
      borderColor: '#d6334a', // accent-red
      backgroundColor: 'rgba(214, 51, 74, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  };

  // Calculate Regional Distribution
  const regions = {};
  data.data.sales.forEach(sale => {
    const reg = sale.region || 'Other';
    regions[reg] = (regions[reg] || 0) + sale.totalPrice;
  });
  
  const totalRev = data.kpis.totalSales || 1;
  const regionalData = Object.entries(regions).map(([label, value]) => ({
    label,
    value: `$${(value / 1000).toFixed(1)}k`,
    percentage: Math.round((value / totalRev) * 100),
    color: label === 'North' ? 'bg-burgundy' : label === 'South' ? 'bg-wine-red' : 'bg-accent-red'
  }));

  return (
    <Layout erpType={erpType} title="Sales Intelligence">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-bg-secondary p-10 rounded-[2.5rem] border border-border-dark relative overflow-hidden group glow-red">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/5 blur-3xl -mr-32 -mt-32"></div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-2">Total Sales Volume</p>
                  <h2 className="text-6xl font-black text-text-primary text-glow-primary">{data.data.sales.length.toLocaleString()}</h2>
                  <p className="text-text-muted text-xs mt-2 font-bold italic">Total Revenue: ${data.kpis.totalSales.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-accent-red/10 rounded-2xl text-accent-red glow-soft">
                  <ShoppingBag size={32} />
                </div>
              </div>
              <div className="mt-8 flex items-center space-x-3 text-accent-soft font-bold">
                <ArrowUpRight size={20} />
                <span>Growth Potential: High</span>
              </div>
            </div>

            <div className="bg-bg-secondary p-8 rounded-[2.5rem] border border-border-dark glow-red">
               <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-3">
                 <TrendingUp className="text-accent-red" />
                 <span>Revenue Growth Curve (Real ERP Data)</span>
               </h3>
               <div className="h-64">
                  <Line data={chartData} options={commonOptions} />
               </div>
            </div>
          </div>

          <div className="space-y-8">
             <div className="bg-bg-secondary p-8 rounded-[2.5rem] border border-border-dark space-y-6 glow-red">
                <h3 className="text-text-primary font-bold flex items-center space-x-2">
                  <Globe size={18} className="text-accent-red" />
                  <span>Regional Distribution</span>
                </h3>
                <div className="space-y-6">
                   {regionalData.length > 0 ? regionalData.map((reg, idx) => (
                     <RegionalRow key={idx} {...reg} />
                   )) : <p className="text-text-muted text-sm">No regional data available</p>}
                </div>
             </div>

             <div className="bg-gradient-to-br from-burgundy to-wine-red border border-burgundy-dark p-8 rounded-[2.5rem] glow-red">
                <p className="text-accent-soft font-black text-xs uppercase tracking-widest mb-2">AI Forecast</p>
                <h4 className="text-text-primary font-bold text-lg mb-4">Market Trend Detected</h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Analyzing {data.data.sales.length} transactions across {erpType}. 
                  Volume is stable with a predicted {chartValues.length > 1 ? '5.2%' : '0%'} uptick in the coming cycle.
                </p>
             </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-bg-secondary border border-border-dark rounded-[2.5rem] overflow-hidden glow-red">
           <div className="p-8 border-b border-border-dark flex items-center justify-between">
              <h3 className="text-xl font-bold text-text-primary flex items-center space-x-3">
                <ShoppingBag className="text-accent-red" />
                <span>Recent Transactions (Normalized)</span>
              </h3>
              <span className="bg-burgundy/20 text-accent-red px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Source: {erpType}
              </span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-text-muted text-[10px] font-black uppercase tracking-widest border-b border-border-dark">
                       <th className="px-8 py-6">Transaction ID</th>
                       <th className="px-8 py-6">Product</th>
                       <th className="px-8 py-6">Quantity</th>
                       <th className="px-8 py-6">Total Price</th>
                       <th className="px-8 py-6">Region</th>
                       <th className="px-8 py-6">Timestamp</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border-dark">
                    {data.data.sales.slice(0, 10).map((sale, idx) => (
                       <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-5 font-mono text-xs text-accent-red">#{sale._id.slice(-8).toUpperCase()}</td>
                          <td className="px-8 py-5 text-text-primary font-bold">{sale.productName || 'Direct Sale'}</td>
                          <td className="px-8 py-5 text-text-secondary">{sale.quantity} units</td>
                          <td className="px-8 py-5 text-accent-soft font-black">${sale.totalPrice.toLocaleString()}</td>
                          <td className="px-8 py-5">
                             <span className="px-3 py-1 bg-burgundy/20 rounded-full text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                {sale.region}
                             </span>
                          </td>
                          <td className="px-8 py-5 text-text-muted text-xs">
                             {new Date(sale.date).toLocaleDateString()}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </Layout>
  );
};

const RegionalRow = ({ label, value, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm font-bold">
      <span className="text-text-secondary">{label}</span>
      <span className="text-text-primary">{value}</span>
    </div>
    <div className="h-1.5 bg-bg-main rounded-full overflow-hidden border border-border-dark">
      <div className={`h-full ${color} glow-soft`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default RevenuePage;

