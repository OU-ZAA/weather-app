import Header from "@/components/Header";
import TodayWeather from "@/components/TodayWeather";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-1/3 mx-auto bg-slate-400 rounded-xl">
        <TodayWeather />
      </div>
    </>
  );
}
