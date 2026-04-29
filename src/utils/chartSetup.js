import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
);

export const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#140507', // bg-secondary
      titleColor: '#c9a3a3', // text-secondary
      bodyColor: '#f5dcdc', // text-primary
      borderColor: 'rgba(42, 10, 15, 0.5)', // border-dark
      borderWidth: 1,
      padding: 12,
      displayColors: false,
    }
  },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { color: '#8a6a6a', font: { weight: 'bold', size: 10 } } // text-muted
    },
    y: {
      grid: { color: 'rgba(42, 10, 15, 0.2)', drawBorder: false },
      ticks: { color: '#8a6a6a', font: { weight: 'bold', size: 10 } } // text-muted
    }
  }
};
