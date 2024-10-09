import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Registrazione dei componenti di Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ showAtleta }) => {
  const data = {
    labels: ["Difesa", "Velocità", "Resistenza", "Tiro", "Tecnica"],
    datasets: [
      {
        label: `Statistiche`,
        data: [
          showAtleta?.valutazione.difesa,
          showAtleta?.valutazione.velocità,
          showAtleta?.valutazione.resistenza,
          showAtleta?.valutazione.tiro,
          showAtleta?.valutazione.tecnica,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Colore di sfondo dell'area del grafico
        borderColor: "white", // Colore del bordo del grafico
        borderWidth: 2, // Spessore del bordo del grafico
        pointBackgroundColor: "white", // Colore di sfondo dei punti sul grafico
        pointBorderColor: "white", // Colore del bordo dei punti
        pointBorderWidth: 2, // Spessore del bordo dei punti
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)", // Colore di sfondo dei punti al passaggio del mouse
        pointHoverBorderColor: "rgba(255, 99, 132, 1)", // Colore del bordo dei punti al passaggio del mouse
        pointHoverRadius: 5, // Raggio dei punti al passaggio del mouse
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          display: false, // Nascondi i valori dei tick
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)", // Colore della griglia del grafico
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(
              2
            )}`;
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
