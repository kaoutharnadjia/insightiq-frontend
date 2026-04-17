import { useState, useEffect } from 'react';
import api from '../api/config';

export const useAnalytics = (erpType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!erpType) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // Add a 2-second delay to show the beautiful processing animation
        const [res] = await Promise.all([
          api.get(`/api/analytics?erpType=${erpType}`),
          new Promise(resolve => setTimeout(resolve, 2000))
        ]);
        setData(res.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [erpType]);

  return { data, loading, error };
};
