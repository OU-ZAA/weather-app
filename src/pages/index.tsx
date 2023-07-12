import HourlyForecast from "@/components/HourlyForecast";
import TodayWeather from "@/components/TodayWeather";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiOutlineSearch } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";

interface FormValues {
  cityName: string;
}

export interface Coordinates {
  name?: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
  local_names?: Record<string, string>;
}

async function getLocation(cityName: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";

  const { data } = await axios.get(
    `${baseUrl}?q=%${cityName}&limit=1&appid=${apiKey}`
  );
  return data as Coordinates[];
}

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const data = await getLocation(values.cityName);
    setCoordinates(data[0]);
  };

  return (
    <div className="flex h-screen">
      <aside className="px-12 py-8 w-[467px] bg-blue-800">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full bg-white flex items-center gap-4 rounded-lg py-2 px-4"
            >
              <HiOutlineSearch className="w-6 h-6" />
              <input
                type="text"
                {...register("cityName")}
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                placeholder="Los Angeles, CA"
              />
            </form>
            <div className="h-48 bg-white rounded-lg"></div>
            <div className="text-white">
              <h3 className="text-7xl">23 C</h3>
              <p className="text-3xl">Mostly Cloudy</p>
              <p className="text-2xl">Friday, 11:54</p>
            </div>
          </div>
          <div className="text-white flex items-center gap-4">
            <MdLocationOn className="w-6 h-6" />
            <p className="text-2xl">Los angeles, CA</p>
          </div>
        </div>
      </aside>
      {coordinates ? (
        <>
          <TodayWeather {...coordinates} />
          <HourlyForecast {...coordinates} />
        </>
      ) : (
        <div>Enter a city</div>
      )}
    </div>
  );
}
