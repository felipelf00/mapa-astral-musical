import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useState } from "react";
import { ChartFormData } from "./types";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
//   year: z.number().int().min(0),
//   month: z.number().int().min(1).max(12),
//   date: z.number().int().min(1).max(31), // adicionar validação para diferentes meses
//   hours: z.number().int(). min(0).max(23),
//   minutes: z.number().int().min(0).max(59),
//   latitude: z.number().min(-90).max(90),
//   longitude: z.number().min(-180).max(180),
//   timezone: z.number().min(-12).max(14), // verificar máximo da API
// })

export function ChartForm({
  onSubmit,
  initialValues = {},
}: {
  onSubmit: (data: ChartFormData) => void;
  initialValues?: ChartFormData;
}) {
  const [year, setYear] = useState<number | undefined>(initialValues.year);
  const [month, setMonth] = useState<number | undefined>(initialValues.month);
  const [date, setDate] = useState<number | undefined>(initialValues.date);
  const [hours, setHours] = useState<number | undefined>(initialValues.hours);
  const [minutes, setMinutes] = useState<number | undefined>(
    initialValues.minutes
  );
  const [latitude, setLatitude] = useState<number | undefined>(
    initialValues.latitude
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    initialValues.longitude
  );
  const [timezone, setTimezone] = useState<number | undefined>(
    initialValues.timezone
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      year,
      month,
      date,
      hours,
      minutes,
      latitude,
      longitude,
      timezone,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-lg mx-auto">
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="year">Ano</Label>
        <Input
          name="year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className=""
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="month">Mês</Label>
        <Input
          name="month"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className=""
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="date">Dia</Label>
        <Input
          name="date"
          value={date}
          onChange={(e) => setDate(parseInt(e.target.value))}
          className=""
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="hours">Hora</Label>
        <Input
          name="hours"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className=""
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="minutes">Minuto</Label>
        <Input
          name="minutes"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          className=""
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          name="latitude"
          value={latitude}
          onChange={(e) => setLatitude(parseInt(e.target.value))}
          className=""
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          name="longitude"
          value={longitude}
          onChange={(e) => setLongitude(parseInt(e.target.value))}
          className=""
        />
      </div>
      <div className="grid grid-cols-2 items-center text-right gap-3">
        <Label htmlFor="timezone">Fuso horário</Label>
        <Input
          name="timezone"
          value={timezone}
          onChange={(e) => setTimezone(parseInt(e.target.value))}
          className=""
        />
      </div>
      <Button type="submit">Enviar</Button>
    </form>
  );
}
