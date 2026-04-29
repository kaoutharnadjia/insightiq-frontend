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
      backgroundColor: '#1A0509', // crimson-night
      titleColor: '#C0909A', // dusty-rose
      bodyColor: '#F5D0C0', // pearl
      borderColor: 'rgba(42, 13, 18, 0.5)', // dark-rose
      borderWidth: 1,
      padding: 12,
      displayColors: false,
    }
  },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      ticks: { color: '#C0909A', font: { weight: 'bold', size: 10 } }
    },
    y: {
      grid: { color: 'rgba(42, 13, 18, 0.2)', drawBorder: false },
      ticks: { color: '#C0909A', font: { weight: 'bold', size: 10 } }
    }
  }
};
