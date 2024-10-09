import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registrazione dei componenti di Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ showAtleta }) => {
  const data = {
    labels: ["Partite Giocate", "Assist", "Gol"],
    datasets: [
      {
        label: "Totali",
        data: [
          showAtleta?.partiteGiocate,
          showAtleta?.totaleAssist,
          showAtleta?.totaleGol,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} className="mx-auto" />;
};

export default BarChart;
