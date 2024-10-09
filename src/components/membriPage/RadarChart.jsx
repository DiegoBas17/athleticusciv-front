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
        label: `Statistiche`,
        data: [
          showAtleta.valutazione?.difesa,
          showAtleta.valutazione?.velocità,
          showAtleta.valutazione?.resistenza,
          showAtleta.valutazione?.tiro,
          showAtleta.valutazione?.tecnica,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Colore di sfondo dell'area del grafico
        borderColor: "white", // Colore del bordo del grafico
        borderWidth: 2, // Spessore del bordo del grafico
        pointBackgroundColor: "white", // Colore di sfondo dei punti sul grafico
        pointBorderColor: "white", // Colore del bordo dei punti
        pointBorderWidth: 2, // Spessore del bordo dei punti
        pointHoverBackgroundColor: "white", // Colore di sfondo dei punti al passaggio del mouse
        pointHoverBorderColor: "white", // Colore del bordo dei punti al passaggio del mouse
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
          color: "white", // Colore della griglia del grafico
        },
        angleLines: {
          color: "white", // Colore delle linee radiali
        },
        pointLabels: {
          color: "white", // Colore delle etichette delle categorie
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Colore del testo della legenda
          font: {
            size: 14, // Modifica la dimensione del testo della legenda
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Colore di sfondo del tooltip
        titleColor: "black", // Colore del titolo del tooltip
        bodyColor: "black", // Colore del testo all'interno del tooltip
        borderColor: "rgba(0, 0, 0, 0.1)", // Colore del bordo del tooltip
        borderWidth: 1, // Spessore del bordo del tooltip
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

  return <Radar data={data} options={options} className="mx-auto" />;
};

export default RadarChart;
