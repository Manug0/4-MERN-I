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
        <p className="Date">
          <span>Fecha:</span> {props.date}
        </p>
        <p className="Copyright">
          <span>Copyright:</span> {props.copyright}
        </p>
        <p className="Explanation">
          <span>Explicación:</span> {props.explanation}
        </p>
      </div>
    </div>
  );
}

export default Apod;
