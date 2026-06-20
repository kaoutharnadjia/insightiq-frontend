import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import Layout from '../components/Layout';
import ProcessingScreen from '../components/ProcessingScreen';
import { CreditCard, TrendingUp, PieChart as PieChartIcon, ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import '../utils/chartSetup';
import { commonOptions } from '../utils/chartSetup';

const FinancePage = ({ erpType }) => {
  const { data, loading } = useAnalytics(erpType);

  if (loading) return <ProcessingScreen message="Analyzing Financial Health..." />;

  // 1. Process Monthly Cash Flow (Revenue vs Simulated Expenses)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueByMonth = {};
  
  data.data.sales.forEach(sale => {
    const date = new Date(sale.date);
    const month = monthNames[date.getMonth()];
    revenueByMonth[month] = (revenueByMonth[month] || 0) + sale.totalPrice;
  });

  const chartLabels = monthNames.filter(m => revenueByMonth[m] !== undefined);
  const revenueValues = chartLabels.map(m => revenueByMonth[m]);
  
  // Simulate expenses (approx 70% of revenue for demo)
  const expenseValues = revenueValues.map(v => v * 0.7);

  const cashFlowData = {
    labels: chartLabels.length > 0 ? chartLabels : ['No Data'],
    datasets: [
      {
        label: 'Inflow (Revenue)',
        data: revenueValues,
        borderColor: '#10b981', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Outflow (Simulated)',
        data: expenseValues,
        borderColor: '#ef4444', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // 2. Process Expense Categories (Simulated)
  const expenseCategories = {
    labels: ['Operations', 'Marketing', 'Salaries', 'Tax', 'Others'],
    datasets: [{
      data: [35, 20, 25, 15, 5],
      backgroundColor: ['#d6334a', '#8b0000', '#4a0404', '#7f1d1d', '#991b1b'],
      borderWidth: 0,
    }]
  };

  // 3. Financial KPIs
  const totalRevenue = data.kpis.totalSales || 0;
  const netProfit = totalRevenue * 0.3; // 30% Margin
  const profitMargin = 30;

  return (
    <Layout erpType={erpType} title="Financial Intelligence">
      <div className="space-y-8">
        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-bg-secondary p-8 rounded-[2.5rem] border border-border-dark flex items-center justify-between glow-red">
            <div>
              <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-1">Estimated Net Profit</p>
              <h3 className="text-4xl font-black text-text-primary">{netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })} DA</h3>
            </div>
            <div className="p-4 bg-green-500/10 rounded-2xl text-green-500">
              <TrendingUp size={32} />
            </div>
          </div>
          <div className="bg-bg-secondary p-8 rounded-[2.5rem] border border-border-dark flex items-center justify-between glow-red">
            <div>
              <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-1">Profit Margin</p>
              <h3 className="text-4xl font-black text-text-primary">{profitMargin}%</h3>
            </div>
            <div className="p-4 bg-accent-red/10 rounded-2xl text-accent-red">
              <PieChartIcon size={32} />
            </div>
          </div>
        </div>

        {/* Cash Flow Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-bg-secondary p-8 rounded-[2.5rem] border border-border-dark glow-red">
            <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-3">
              <Wallet className="text-accent-red" />
              <span>Cash Flow Trend (Inflow vs Outflow)</span>
            </h3>
            <div className="h-72">
              <Line data={cashFlowData} options={commonOptions} />
            </div>
          </div>

          <div className="bg-bg-secondary p-8 rounded-[2.5rem] border border-border-dark glow-red flex flex-col items-center">
            <h3 className="text-xl font-bold text-text-primary mb-6 self-start flex items-center space-x-3">
              <CreditCard className="text-accent-red" />
              <span>Expense Allocation</span>
            </h3>
            <div className="h-56 w-56">
              <Doughnut 
                data={expenseCategories} 
                options={{
                  ...commonOptions,
                  plugins: { legend: { display: true, position: 'bottom', labels: { color: '#94a3b8', boxWidth: 10 } } }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Finance Forecast Card */}
        <div className="bg-gradient-to-br from-accent-red to-deep-red p-8 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">AI Financial Forecast</span>
              <h4 className="text-2xl font-black text-white mt-4">Positive Cash Position Expected</h4>
            </div>
            <ArrowUpCircle className="text-green-400" size={40} />
          </div>
          <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
            Based on {erpType} data patterns, we expect a 12% increase in available liquidity over the next quarter. 
            Recommendation: Consider allocating 5% of reserves to inventory expansion to mitigate potential supply chain disruptions.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default FinancePage;
