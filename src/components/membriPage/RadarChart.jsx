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
        label: "Valutazione Admin",
        data: [
          showAtleta.valutazioneAdmin?.difesa,
          showAtleta.valutazioneAdmin?.velocità,
          showAtleta.valutazioneAdmin?.resistenza,
          showAtleta.valutazioneAdmin?.tiro,
          showAtleta.valutazioneAdmin?.tecnica,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Sfondo per valutazione admin
        borderColor: "rgba(255, 99, 132, 1)", // Bordo per valutazione admin
        borderWidth: 2,
      },
      {
        label: "Valutazione CIV",
        data: [
          showAtleta.valutazioneCIV?.difesa,
          showAtleta.valutazioneCIV?.velocità,
          showAtleta.valutazioneCIV?.resistenza,
          showAtleta.valutazioneCIV?.tiro,
          showAtleta.valutazioneCIV?.tecnica,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Sfondo per valutazione CIV
        borderColor: "rgba(54, 162, 235, 1)", // Bordo per valutazione CIV
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          display: false,
        },
        grid: {
          color: "#004aad", // Colore del reticolo
        },
        angleLines: {
          color: "#004aad", // Colore delle linee degli angoli
        },
        pointLabels: {
          color: "#004aad", // Colore delle etichette dei punti
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#004aad", // Colore delle etichette nella legenda
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "black",
        bodyColor: "black",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${
              typeof value === "number" && !isNaN(value)
                ? value.toFixed(2)
                : value
            }`;
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} className="mx-auto" />;
};

export default RadarChart;
