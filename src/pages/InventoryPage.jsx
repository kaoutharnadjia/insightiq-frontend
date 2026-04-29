import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import Layout from '../components/Layout';
import ProcessingScreen from '../components/ProcessingScreen';
import { Package, AlertTriangle, CheckCircle2, ArrowRight, BarChart3 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import '../utils/chartSetup';
import { commonOptions } from '../utils/chartSetup';

const InventoryPage = ({ erpType }) => {
  const { data, loading } = useAnalytics(erpType);

  if (loading) return <ProcessingScreen message="Scanning Inventory Nodes" />;

  const inventoryInsights = data.insights.filter(i => i.type === 'inventory' || i.type === 'stockout');

  const chartData = {
    labels: ['Laptops', 'Monitors', 'Peripherals', 'Servers', 'Networking'],
    datasets: [{
      label: 'Stock Levels',
      data: [65, 45, 80, 25, 55],
      backgroundColor: 'rgba(139, 26, 46, 0.2)', // burgundy
      borderColor: '#8B1A2E',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  return (
    <Layout erpType={erpType} title="Inventory Management">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-crimson-night p-10 rounded-[2.5rem] border border-dark-rose relative overflow-hidden group glow-burgundy">
            <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy/5 blur-3xl -mr-32 -mt-32"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-dusty-rose text-xs font-black uppercase tracking-widest mb-2">Inventory Assets Value</p>
                <h2 className="text-6xl font-black text-pearl text-glow-pearl">${data.kpis.inventoryValue.toLocaleString()}</h2>
              </div>
              <div className="p-4 bg-burgundy/10 rounded-2xl text-crimson glow-crimson">
                <Package size={32} />
              </div>
            </div>
          </div>

          <div className="bg-crimson-night p-8 rounded-[2.5rem] border border-dark-rose glow-burgundy">
             <h3 className="text-xl font-bold text-pearl mb-6 flex items-center space-x-3">
               <BarChart3 className="text-crimson" />
               <span>Stock Category Distribution</span>
             </h3>
             <div className="h-64">
                <Bar data={chartData} options={commonOptions} />
             </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-pearl flex items-center space-x-3">
              <AlertTriangle className="text-antique-gold" />
              <span>Critical Overlays</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {inventoryInsights.map((insight, idx) => (
                 <div key={idx} className={`p-6 rounded-3xl border bg-crimson-night border-dark-rose hover:bg-dark-rose/30 transition-all glow-burgundy ${insight.severity === 'high' ? 'border-crimson/50 glow-crimson' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-pearl font-bold">{insight.product}</h4>
                        <p className="text-dusty-rose text-xs mt-1">{insight.prediction}</p>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${insight.severity === 'high' ? 'bg-crimson/20 text-crimson' : 'bg-burgundy/20 text-dusty-rose'}`}>
                        {insight.severity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-pearl text-[11px] font-bold bg-abyss/50 px-4 py-2 rounded-xl border border-dark-rose w-fit">
                        <span>{insight.recommendation}</span>
                        <ArrowRight size={12} className="text-crimson" />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-crimson-night p-8 rounded-[2.5rem] border border-dark-rose space-y-8 glow-burgundy">
              <h3 className="text-pearl font-bold flex items-center space-x-2">
                 <CheckCircle2 size={18} className="text-crimson" />
                 <span>Logistics Compliance</span>
              </h3>
              <RiskItem label="Stockout Probability" percentage={75} color="bg-crimson" />
              <RiskItem label="Warehouse Capacity" percentage={88} color="bg-burgundy" />
              <RiskItem label="Supplier Delay" percentage={12} color="bg-antique-gold" />
           </div>

           <div className="p-8 bg-gradient-to-br from-burgundy to-deep-wine rounded-[2.5rem] text-pearl glow-burgundy">
              <p className="font-black uppercase tracking-widest text-[10px] mb-2 opacity-80">Supply Chain Tip</p>
              <h4 className="font-bold text-lg mb-2 text-glow-pearl">Enable Auto-Replenish</h4>
              <p className="text-sm text-pearl/80">Integrating your supplier portal with InsightIQ can reduce stockout risk by 45%.</p>
           </div>
        </div>
      </div>
    </Layout>
  );
};

const RiskItem = ({ label, percentage, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-sm font-bold">
      <span className="text-dusty-rose">{label}</span>
      <span className="text-pearl">{percentage}%</span>
    </div>
    <div className="h-2 bg-abyss rounded-full overflow-hidden border border-dark-rose">
      <div className={`h-full ${color} glow-crimson`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default InventoryPage;
