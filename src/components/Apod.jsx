import React from "react";

function Apod(props) {
  return (
    <div className="ApodFigure">
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
        <p>
          <span className="label">Copyright:</span> {props.copyright}
        </p>
        <p>
          <span className="label">Explicación:</span> {props.explanation}
        </p>
      </div>
    </div>
  );
}

export default Apod;
