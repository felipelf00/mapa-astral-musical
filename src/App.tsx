import { useEffect, useState } from "react";
import "./App.css";
import { KeyboardSynth } from "./components/Tone.tsx";
import { ChartForm } from "./components/ChartForm.tsx";
import { ChartFormData } from "./types.ts";
import { Header } from "./components/Header.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [formData, setFormData] = useState<ChartFormData>({});
  const [notes, setNotes] = useState<Array<number>>([]);

  useEffect(() => {
    const fetchData = async () => {

      console.log("Form data: ", formData);

      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY ?? '',
          },
          body: JSON.stringify({
            year: formData.year,
            month: formData.month,
            date: formData.date,
            hours: formData.hours,
            minutes: formData.minutes,
            seconds: 0,
            latitude: formData.latitude,
            longitude: formData.longitude,
            timezone: formData.timezone,
            settings: {
              observation_point: "topocentric",
              ayanamsha: "lahiri",
            },
          }),
        };

        console.log("Request options: ", options);

        const response = await fetch(
          "https://json.freeastrologyapi.com/planets",
          options
        );
        const data = await response.json();

        console.log("Data fetched: ", data);

        // setChartData(data);

        const planetData = data.output[0];
        const planets: { [key: string]: string } = {};
        const newNotes: number[] = [];

        for (const planet in planetData) {
          if (Object.prototype.hasOwnProperty.call(planetData, planet)) {
            const currentSign = planetData[planet].current_sign;
            const planetName = planetData[planet].name;
            planets[planetName] = currentSign;

            if (
              currentSign !== undefined &&
              !notes.includes(currentSign) &&
              !newNotes.includes(currentSign)
            ) {
              newNotes.push(currentSign);
            }
          }
        }

        //sort notes
        newNotes.sort((a, b) => a - b);

        setNotes(newNotes);

        console.log("new notes: " + newNotes);
        console.log("notes: " + notes);

        // console.log("Planets: " + planets);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (Object.keys(formData).length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleFormSubmit = (data: ChartFormData) => {
    setFormData(data);
    console.log("Form submitted with data: ", data);
  };

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ChartForm onSubmit={handleFormSubmit} initialValues={formData} />
            }
          />
          <Route path="/play" element={<KeyboardSynth notes={notes} />} />
        </Routes>
      </Router>
      {/* <ChartForm onSubmit={handleFormSubmit} initialValues={formData} /> */}
      {/* <KeyboardSynth notes={notes} /> */}
    </>
  );
}

export default App;
