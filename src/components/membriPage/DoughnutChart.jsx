import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importa il plugin

// Registrazione dei componenti di Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // Registra il plugin

const DoughnutChart = ({ showAtleta }) => {
  const data = {
    labels: ["Media Gol", "Media Assist", "Media Voti"],
    datasets: [
      {
        label: "Medie",
        data: [
          showAtleta?.mediaGol,
          showAtleta?.mediaAssist,
          showAtleta?.mediaVoti,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: "white", // Colore del testo
        formatter: (value) => value.toFixed(2), // Formattazione dei numeri
        font: {
          weight: "light",
          size: 16, // Dimensione del testo
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`,
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
