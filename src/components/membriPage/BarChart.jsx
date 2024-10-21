import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

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
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Colore per "Partite Giocate" (blu)
          "rgba(75, 192, 192, 0.6)", // Colore per "Assist" (verde)
          "rgba(255, 99, 132, 0.6)", // Colore per "Gol" (rosso)
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Bordo per "Partite Giocate"
          "rgba(75, 192, 192, 1)", // Bordo per "Assist"
          "rgba(255, 99, 132, 1)", // Bordo per "Gol"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#004aad", // Colore del testo sui ticks dell'asse Y
        },
      },
      x: {
        ticks: {
          color: "#004aad", // Colore delle etichette sull'asse X
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#004aad", // Colore delle etichette della legenda
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "black",
        bodyColor: "black",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} className="mx-auto" />;
};

export default BarChart;
