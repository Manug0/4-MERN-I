import React from "react";

function Rover(props) {
  return (
    <div className="RoverFigure">
      <div className="Image">
        {" "}
        <h2>{props.title}</h2>
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className="Details">
        {" "}
        <p>
          <span className="label">Fecha:</span> {props.date}
        </p>
      </div>
    </div>
  );
}

export default Rover;
