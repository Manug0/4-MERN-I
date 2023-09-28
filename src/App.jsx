import { useState, useEffect } from "react";
import Apod from "./components/Apod";
import Rover from "./components/Rover";
import "./App.css";

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);

  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString());
  };

  const handleApi = (ev) => {
    setApi(ev.target.value);
  };

  const dateLimit = new Date();

  const handleAdvanceButton = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate <= dateLimit) {
      setDate(newDate.toISOString().slice(0, 10));
    }
  };

  const handleBackButton = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate.toISOString().slice(0, 10));
  };

  const NASA_URL = "https://api.nasa.gov/";

  const NASA_API_KEY = "zpeg756e32o3G5Tej1q2k27dkYkN1ehIybyh3GlI";

  const [date, setDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [roverData, setRoverData] = useState(null);
  const [api, setApi] = useState("apiSelector");

  `${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`;
  `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`;

  useEffect(() => {
    fetch(`${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setApodData(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  }, [date]);

  useEffect(() => {
    fetch(
      `${NASA_URL}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRoverData(data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  }, [date]);

  return (
    <div className="App">
      <h1>Imagen astronómica del día</h1>
      <p>Esta imagen corresponde con la fecha {date}</p>
      <select id="apiSelector" onChange={handleApi}>
        <option id="apiMessage" value="" disabled selected>
          Selecciona una API
        </option>
        <option value="option1">Astronomy Picture of the Day</option>
        <option value="option2">Mars Rover Photos</option>
      </select>

      <input
        type="date"
        id="date"
        max={today}
        value={date}
        onChange={handleInput}
      />

      <button className="backButton" onClick={handleBackButton}>
        Retrocede un día
      </button>
      <button className="advanceButton" onClick={handleAdvanceButton}>
        Avanza un día
      </button>

      <>
        {api === "option1" && apodData ? (
          <Apod
            title={apodData.title}
            imageUrl={apodData.url}
            date={apodData.date}
            copyright={apodData.copyright}
            explanation={apodData.explanation}
          />
        ) : api === "option2" && roverData && roverData.photos.length === 0 ? (
          <p>No se encontraron los datos de la API</p>
        ) : (
          api === "option2" &&
          roverData && (
            <Rover
              title={roverData.photos[0].camera.full_name}
              imageUrl={roverData.photos[0].img_src}
              date={roverData.photos[0].earth_date}
              name={roverData.photos[0].rover.name}
              landing={roverData.photos[0].rover.landing_date}
              status={roverData.photos[0].rover.status}
            />
          )
        )}
      </>
    </div>
  );
}

export default App;
