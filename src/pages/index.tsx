import TodayWeather from "@/components/TodayWeather";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  cityName: string;
}

export interface Coordinates {
  name?: string;
  lat?: number;
  lon?: number;
  country?: string;
  state?: string;
  local_names?: Record<string, string>;
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";

const getLocation = async (cityName: string) => {
  const data: Coordinates[] = await fetch(
    `${baseUrl}?q=%${cityName}&limit=1&appid=${apiKey}`
  ).then((res) => res.json());
  return data;
};

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const data = await getLocation(values.cityName);
    setCoordinates(data[0]);
    console.log("coords:", coordinates);
  };

  return (
    <div className="w-1/2 mx-auto">
      <header className="p-4 w-full flex items-center justify-center ">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              type="text"
              {...register("cityName")}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Los Angeles, CA"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              Search
            </button>
          </div>
        </form>
      </header>
      {coordinates ? (
        <TodayWeather {...coordinates} />
      ) : (
        <div>Enter a city</div>
      )}
    </div>
  );
}
