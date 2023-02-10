import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Figure from "./components/Figure";
import FigureMarsRover from "./components/FigureMarsRover";

const KEY = "owUDLfU0MjakllIXUKYKqV0NFhf9t2rHrkDifW4t";
const URL_NASA = "https://api.nasa.gov/";
const today = new Date(Date.now()).toISOString().slice(0, 10);

type ImageApod = {
  copyright: string;
  date: string;
  explanation: string;
  title: string;
  url: string;
};

function App() {
  const [date, setDate] = useState(today);
  const [figure, setFigure] = useState<ImageApod | null>(null);
  const [marsPhoto, setMarsPhoto] = useState(null);
  const [selected, setSelected] = useState('apod');

  useEffect(() => {
    const imagen = async () => {
      try {
        const apod = await axios.get<ImageApod>(
          `${URL_NASA}planetary/apod?date=${date}&api_key=${KEY}`
        );
        setFigure(apod.data);
        const marsRover = await axios.get(
          `${URL_NASA}mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${KEY}`
        );
        setMarsPhoto(marsRover.data);
      } catch (error) {
        console.error(error);
      }
    };
    imagen();
  }, [date]);

  console.log(marsPhoto)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value.toLocaleString());
  };
  const dateFormat = date.split("-").reverse().join("-");

  const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value)}

      console.log(selected)
  return (
    <div className="App">
      <h1>Imagen astronómica del día</h1>
      <h3>Esta imagen corresponde con la fecha {dateFormat}</h3>
      <div className="date-wrapper">
        <label htmlFor="date">Introduce una fecha que quieras:</label>
        <input type="date" id="date" onChange={onChangeInput} />
      </div>
      <div className="select-wrapper">
        <label htmlFor="choice-figure">
          Elige qué tipo de foto quieres ver:
        </label>
        <select name="choice-figure" id="choice-figure" onChange={handleSelected}>
          <option value="apod">APOD</option>
          <option value="mars-rover">Mars Rover</option>
        </select>
      </div>
      { selected === 'apod' ?
        <Figure
          img={figure?.url}
          title={figure?.title}
          dateImage={dateFormat}
          copyright={figure?.copyright}
        />:
        <FigureMarsRover />
      }
    </div>
  );
}

export default App;
