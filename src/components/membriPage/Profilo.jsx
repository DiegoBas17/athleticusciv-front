import RadarChart from "./RadarChart";

const Profilo = ({ showAtleta }) => {
  return (
    <div className="bgCiv p-4 rounded-4">
      <div>Profilo</div>
      <div>ciao {showAtleta?.nome}</div>
      <div style={{ height: "20rem" }}>
        <RadarChart showAtleta={showAtleta} />
      </div>
    </div>
  );
};
export default Profilo;
