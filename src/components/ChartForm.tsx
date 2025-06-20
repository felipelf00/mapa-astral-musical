import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { ChartFormData } from "../types";
import { useNavigate } from "react-router-dom";

export function ChartForm({
  onSubmit,
  initialValues = {},
}: {
  onSubmit: (data: ChartFormData) => void;
  initialValues?: ChartFormData;
}) {
  // Store as strings for controlled inputs
  const [year, setYear] = useState(initialValues.year?.toString() ?? "1989");
  const [month, setMonth] = useState(initialValues.month?.toString() ?? "8");
  const [date, setDate] = useState(initialValues.date?.toString() ?? "25");
  const [hours, setHours] = useState(initialValues.hours?.toString() ?? "17");
  const [minutes, setMinutes] = useState(initialValues.minutes?.toString() ?? "13");
  const [latitude, setLatitude] = useState(initialValues.latitude?.toString() ?? "25.2548");
  const [longitude, setLongitude] = useState(initialValues.longitude?.toString() ?? "49.1615");
  const [timezone, setTimezone] = useState(initialValues.timezone?.toString() ?? "3");

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      year: year ? parseInt(year) : undefined,
      month: month ? parseInt(month) : undefined,
      date: date ? parseInt(date) : undefined,
      hours: hours ? parseInt(hours) : undefined,
      minutes: minutes ? parseInt(minutes) : undefined,
      latitude: latitude ? parseInt(latitude) : undefined,
      longitude: longitude ? parseInt(longitude) : undefined,
      timezone: timezone ? parseInt(timezone) : undefined,
    });
    navigate("/play");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-lg mx-auto">
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="year">Ano</Label>
        <Input
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="month">Mês</Label>
        <Input
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="date">Dia</Label>
        <Input
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="hours">Hora</Label>
        <Input
          name="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="minutes">Minuto</Label>
        <Input
          name="minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          name="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          name="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="timezone">Fuso horário</Label>
        <Input
          name="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        />
      </div>
      <Button type="submit">Enviar</Button>
    </form>
  );
}
