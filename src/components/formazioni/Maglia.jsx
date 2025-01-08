const Maglia = ({ numero, nome, colore }) => (
  <svg
    height="5rem"
    width="5rem"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 496.2 496.2"
    xmlSpace="preserve"
  >
    {/* Corpo maglia */}
    <path
      style={{ fill: colore }}
      d="M386.3,149.1c-5.7-35.1-24.9-39.6-24.9-39.6l-72.1-29.4l-9.8-4.8l-31.1-2.5l-31.7,2.6l-9.8,4.8
          l-72.1,29.4c0,0-19.1,4.5-24.9,39.6l-11.4,44.2l50.3,16.2l5.8-19c0,0,21.1,59.4,1.3,214.5c0,0,31.6,13.1,91.9,13.1
          s92.6-13.1,92.6-13.1c-19.8-155.1,1.3-214.5,1.3-214.5l5.8,19l50.3-16.2L386.3,149.1z"
    />
    {/* Numero */}
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="100"
      fill="#FFFFFF"
    >
      {numero}
    </text>
    {/* Nome */}
    <text
      x="50%"
      y="30%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="70"
      fill="#FFFFFF"
    >
      {nome}
    </text>
  </svg>
);

export default Maglia;
