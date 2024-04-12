import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [chartData, setChartData] = useState({});
  const [notes, setNotes] = useState<Array<number>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "WiTh2w5Nze2izZcgrvgqR41vGmjlypjP7PsDHnUk", // esconder
          },
          body: JSON.stringify({
            year: 2022,
            month: 8,
            date: 11,
            hours: 6,
            minutes: 0,
            seconds: 0,
            latitude: 17.38333,
            longitude: 78.4666,
            timezone: 5.5,
            settings: {
              observation_point: "topocentric",
              ayanamsha: "lahiri",
            },
          }),
        };
        const response = await fetch(
          "https://json.freeastrologyapi.com/planets",
          options
        );
        const data = await response.json();

        setChartData(data);

        const planetData = data.output[0];
        const planets: { [key: string]: string } = {};
        // const noteArray: Array<number> = [];

        for (const planet in planetData) {
          if (Object.prototype.hasOwnProperty.call(planetData, planet)) {
            const currentSign = planetData[planet].current_sign;
            const planetName = planetData[planet].name;
            planets[planetName] = currentSign;

            if (!notes.includes(currentSign)) {
              setNotes((prevNotes) => [...prevNotes, currentSign]);
            }
          }
        }

        //sort notes
        setNotes((prevNotes) => [...prevNotes].sort((a, b) => a - b));

        console.log("Planets: " + planets);
        console.log("notes: " + notes);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Hello world</h1>
      <p>{JSON.stringify(chartData)}</p>
    </>
  );
}

export default App;
