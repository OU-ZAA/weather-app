import SearchForm from "@/components/SearchForm";
import TodayWeather from "@/components/TodayWeather";
import { useState } from "react";

export type Coordinates = {
  name?: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
  local_names?: Record<string, string>;
};

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates>();

  return (
    <>
      <main className="h-screen bg-[url(/images/clouds.jpg)] bg-cover px-12 py-8">
        <nav className="flex justify-center items-center">
          <SearchForm setCoordinates={setCoordinates} />
        </nav>
        {coordinates && <TodayWeather {...coordinates} />}
      </main>
    </>
  );
}
