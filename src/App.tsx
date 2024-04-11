import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [chartData, setChartData] = useState({});

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
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  console.log(chartData);

  return (
    <>
      <h1>Hello world</h1>
      <p>{JSON.stringify(chartData)}</p>
    </>
  );
}

export default App;
