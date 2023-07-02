import useSWR from "swr";
import { BiArrowFromBottom, BiArrowFromTop } from "react-icons/bi";
import type { Coordinates } from "@/pages";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e: any) {
    console.error(e.message);
  }
};

export default function TodayWeather({ name, lat, lon, state }: Coordinates) {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const apiEndPoint = `${base}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
  const { data, error, isLoading } = useSWR(apiEndPoint, fetcher);

  if (error) return <div className="text-xl">Fail to load</div>;
  if (isLoading) return <div className="text-xl">Loading...</div>;

  const getTime = (timeStamp: number) => {
    return `${
      (new Date(timeStamp * 1000).getHours() < 10 ? "0" : "") +
      new Date(timeStamp * 1000).getHours()
    }:${
      (new Date(timeStamp * 1000).getMinutes() < 10 ? "0" : "") +
      new Date(timeStamp * 1000).getMinutes()
    }`;
  };

  const tempIcon = (
    <svg className="w-6" name="temp" data-testid="Icon" viewBox="0 0 24 24">
      <title>Temperature</title>
      <path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
    </svg>
  );

  const humidityIcon = (
    <svg className="w-6" name="humidity" data-testid="Icon" viewBox="0 0 24 24">
      <title>Humidity</title>
      <path
        fillRule="evenodd"
        d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4"
      ></path>
    </svg>
  );

  const pressureIcon = (
    <svg className="w-6" name="pressure" data-testid="Icon" viewBox="0 0 24 24">
      <title>Pressure</title>
      <path d="M8.462 18.293l-.29-.002c-.6-.004-1.043-.007-1.259-.007-1.119 0-1.182-1.015-.34-1.734l.196-.164.508-.425 1.543-1.292c1.014-.846 1.74-1.45 2.073-1.723.735-.601 1.305-.596 2.033.022.387.329.959.805 2.207 1.841a377.936 377.936 0 0 1 2.18 1.816c.796.67.742 1.66-.295 1.66h-2.382v1.77c0 .83-.393 1.223-1.258 1.223h-2.994c-.809 0-1.258-.42-1.258-1.207v-1.773l-.664-.005zm0-12.807l-.29.002c-.6.004-1.043.006-1.259.006-1.119 0-1.182 1.016-.34 1.734l.196.164.508.426 1.543 1.29a348.68 348.68 0 0 0 2.073 1.724c.735.601 1.305.596 2.033-.022.387-.328.959-.805 2.207-1.84a377.937 377.937 0 0 0 2.18-1.817c.796-.67.742-1.659-.295-1.659h-2.382v-1.77c0-.832-.393-1.224-1.258-1.224h-2.994c-.809 0-1.258.42-1.258 1.207V5.48l-.664.005z"></path>
    </svg>
  );

  const visibilityIcon = (
    <svg
      className="w-6"
      name="visibility"
      data-testid="Icon"
      viewBox="0 0 1024 1024"
    >
      <title>Visibility</title>
      <path d="M491.856 879.808c-60.48-5.056-110.848-25.184-171.328-55.424-120.96-55.424-216.704-146.112-292.256-256.96-25.248-40.352-30.24-80.64 0-126.016 80.608-115.872 186.464-211.68 317.472-272.096 110.816-50.4 226.752-50.4 337.664 0 136 60.48 241.824 156.224 317.44 282.208 15.104 25.216 25.12 65.504 10.048 85.728-105.792 191.424-256.992 367.84-519.04 342.56zm292.256-377.92c0-151.168-120.96-272.064-272.096-272.064-146.144 0-272.128 126.016-272.128 272.064 0 151.232 120.96 277.216 272.128 277.216 151.104-.032 272.096-125.984 272.096-277.216z"></path>
      <path d="M789.808 500.416c0 156.896-125.472 287.52-282.336 282.336-156.864 0-282.336-130.656-282.336-287.488 0-146.4 130.656-277.12 282.336-277.12 156.896-.032 287.584 125.376 282.336 282.272zM512.752 348.832c-83.68 0-151.584 67.968-151.584 151.584 0 88.864 67.968 156.896 151.584 156.896 83.648 0 156.832-73.216 156.832-156.896-5.184-83.648-73.152-151.584-156.832-151.584z"></path>
    </svg>
  );

  const windIcon = (
    <svg className="w-6" name="wind" data-testid="Icon" viewBox="0 0 24 24">
      <title>Wind</title>
      <path
        d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        fill="none"
      ></path>
    </svg>
  );

  const cloudIcon = (
    <svg
      className="w-6"
      name="cloud"
      data-testid="Icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.2 15.2c.7-1.3 1.1-2.8 1.1-4.4 0-4.4-3.6-8-8-8-2.7 0-5 1.4-6.4 3.5C1.3 7.5 0 10.2 0 13c0 3.9 3.1 7 7 7h9c3.3 0 6-2.7 6-6 0-2.7-2.1-4.9-4.8-5zM15 19h-9c-2.8 0-5-2.2-5-5 0-2.4 1.7-4.4 4-4.9.2-1.5 1.3-2.7 2.8-2.7 1.6 0 2.9 1.3 2.9 2.9 0 .6-.2 1.3-.5 1.8C10.4 10.5 12 12.5 12 15c0 2.8-2.2 5-5 5H2c-1.7 0-3-1.3-3-3s1.3-3 3-3h2" />
    </svg>
  );

  return (
    <div className="bg-slate-400 rounded-xl mx-auto">
      <h2 className="text-xl font-bold p-4">
        Weather Today in {name}, {state}
      </h2>
      <div className="flex justify-between mx-9 mb-4">
        <div className="flex flex-col">
          <span className="text-6xl font-bold">
            {Math.floor(data.main.feels_like)}°C
          </span>
          <span className="font-semibold mt-1 text-gray-700">Feels Like</span>
        </div>
        <div>
          <div className="h-12 w-24 mx-auto border-t-4 border-r-4 border-l-4 border-sun-default rounded-tl-full rounded-tr-full "></div>
          <div className="flex my-4">
            <BiArrowFromBottom className="w-6 h-6 text-sun-icon" />
            <span className="ps-1">{getTime(data.sys.sunrise)}</span>
            <BiArrowFromTop className="w-6 h-6 text-sun-icon ms-2" />
            <span className="ps-1">{getTime(data.sys.sunset)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="flex items-center  flex-grow flex-shrink basis-[49%] px-4 py-2 border-t-[1px] mr-1">
          {tempIcon}
          <div className="flex-grow px-2">high/low</div>
          <div>
            <span>{Math.floor(data.main.temp_max)}°</span>/
            <span>{Math.floor(data.main.temp_min)}°</span>
          </div>
        </div>
        <div className="flex items-center flex-grow flex-shrink basis-[49%] px-4 py-2 border-t-[1px] mr-1">
          {humidityIcon}
          <div className="flex-grow px-2">humidity</div>
          <div>{data.main.humidity}%</div>
        </div>
        <div className="flex items-center flex-grow flex-shrink basis-[49%] px-4 py-2 border-t-[1px] mr-1">
          {pressureIcon}
          <div className="flex-grow px-2">pressure</div>
          <div>{data.main.pressure} mb</div>
        </div>
        <div className="flex items-center flex-grow flex-shrink basis-[49%] px-4 py-2 border-t-[1px] mr-1">
          {visibilityIcon}
          <div className="flex-grow px-2">Visibility</div>
          <div>
            {data.visibility >= 10000
              ? "Unlimited"
              : `${data.visibility / 1000} km`}
          </div>
        </div>
        <div className="flex items-center flex-grow flex-shrink basis-[49%] px-4 py-2 border-t-[1px] mr-1">
          {windIcon}
          <div className="flex-grow px-2">wind</div>
          <div>{data.wind.speed} m/s</div>
        </div>
        <div className="flex items-center flex-grow flex-shrink basis-[49%] px-4 py-2 border-t-[1px] mr-1">
          {cloudIcon}
          <div className="flex-grow px-2">cloudiness</div>
          <div>{data.clouds.all}%</div>
        </div>
      </div>
    </div>
  );
}
