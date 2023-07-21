import useSWR from "swr";
import { MdLocationOn } from "react-icons/md";
import { PiArrowsInLineVerticalBold } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { FiWind, FiEye, FiSunrise, FiSunset } from "react-icons/fi";
import type { Coordinates } from "@/pages";
import { fetcher } from "@/utils/fetcher";

const getTime = (timeStamp: number) => {
  return `${
    (new Date(timeStamp * 1000).getHours() < 10 ? "0" : "") +
    new Date(timeStamp * 1000).getHours()
  }:${
    (new Date(timeStamp * 1000).getMinutes() < 10 ? "0" : "") +
    new Date(timeStamp * 1000).getMinutes()
  }`;
};

export default function TodayWeather({
  name,
  lat,
  lon,
  state,
  country,
}: Coordinates) {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const apiEndPoint = `${base}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
  const { data, error, isLoading } = useSWR(apiEndPoint, fetcher);

  if (error) return <div className="text-xl">Fail to load</div>;
  if (isLoading) return <div className="text-xl">Loading...</div>;

  return (
    <div className="mx-auto my-8">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <MdLocationOn className="h-6 w-6" />
          {name}
        </h2>
        <p className="mt-2">Thu, July 20 19:11</p>
        <div className="flex justify-between mt-2">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-slate-100"></div>
            <p className="text-6xl font-bold">{Math.floor(data.main.temp)}°</p>
          </div>
          <div className="text-slate-600 tracking-tighter text-sm text-end">
            <p className="">{data.weather[0].description}</p>
            <p>
              {Math.floor(data.main.temp_max)}°/{Math.floor(data.main.temp_min)}
              °
            </p>
            <p>Feels like {Math.floor(data.main.feels_like)}°</p>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-lg p-4">
        <div className="flex items-center justify-between py-2 border-b-2 border-slate-100">
          <div className="flex items-center gap-4">
            <FiSunrise />
            <span className="opacity-70">Sunrise</span>
          </div>
          <p>{getTime(data.sys.sunrise)}</p>
        </div>
        <div className="flex items-center justify-between py-2 border-b-2 border-slate-100">
          <div className="flex items-center gap-4">
            <FiSunset />
            <span className="opacity-70">Sunset</span>
          </div>
          <p>{getTime(data.sys.sunset)}</p>
        </div>
        <div className="flex items-center justify-between py-2 border-b-2 border-slate-100">
          <div className="flex items-center gap-4">
            <FiWind />
            <span className="opacity-70">Wind</span>
          </div>
          <p>{Math.floor(data.wind.speed * 3.6)} km/h</p>
        </div>
        <div className="flex items-center justify-between py-2 border-b-2 border-slate-100">
          <div className="flex items-center gap-4">
            <FiEye />
            <span className="opacity-70">Visibility</span>
          </div>
          <p>
            {data.visibility >= 10000
              ? "Unlimited"
              : `${data.visibility / 1000} km`}
          </p>
        </div>
        <div className="flex items-center justify-between py-2 border-b-2 border-slate-100">
          <div className="flex items-center gap-4">
            <PiArrowsInLineVerticalBold />
            <span className="opacity-70">Pressure</span>
          </div>
          <p>{data.main.pressure} mb</p>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <WiHumidity />
            <span className="opacity-70">Humidity</span>
          </div>
          <p>{data.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
}
