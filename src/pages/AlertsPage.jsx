import React from 'react';
import Layout from '../components/Layout';
import { useAnalytics } from '../hooks/useAnalytics';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const AlertsPage = ({ erpType }) => {
  const { data, loading } = useAnalytics(erpType);

  const getIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="text-accent-red" size={24} />;
      case 'medium': return <Info className="text-accent-soft" size={24} />;
      default: return <CheckCircle className="text-green-500" size={24} />;
    }
  };

  return (
    <Layout erpType={erpType} title="Alerts Hub">
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white px-2">System Notifications</h2>
        
        {loading ? (
          <div className="text-center py-20 text-text-muted">Analyzing system pulse...</div>
        ) : (
          <div className="space-y-4">
            {data.insights.filter(i => i.severity !== 'low').map((alert, idx) => (
              <div key={idx} className="bg-bg-secondary border border-white/5 p-6 rounded-[2rem] flex items-start space-x-5 glow-red">
                <div className="p-3 bg-white/5 rounded-2xl">
                  {getIcon(alert.severity)}
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-black text-white mb-1">{alert.type.toUpperCase()} ALERT</h4>
                  <p className="text-text-secondary text-sm font-medium mb-3">{alert.prediction}</p>
                  <div className="bg-accent-red/10 border border-accent-red/20 p-3 rounded-xl">
                    <p className="text-accent-red text-xs font-bold uppercase tracking-widest mb-1">Recommendation</p>
                    <p className="text-white text-sm font-medium">{alert.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {data.insights.filter(i => i.severity !== 'low').length === 0 && (
              <div className="text-center py-20 bg-bg-secondary rounded-[2rem] border border-white/5">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4 opacity-20" />
                <p className="text-text-muted font-bold">All systems operating normally.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AlertsPage;
