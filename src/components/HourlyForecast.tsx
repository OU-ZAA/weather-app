import { Coordinates } from "@/pages";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function HourlyForest({ name, lat, lon, state }: Coordinates) {
  const base = "https://pro.openweathermap.org/data/2.5/forecast/hourly";
  const apiEndPoint = `${base}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
  const { data, error, isLoading } = useSWR(apiEndPoint, fetcher);

  if (error) return <div>Fail to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="m-">{JSON.stringify(data)}</div>
    </>
  );
}
