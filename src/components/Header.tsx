import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  cityName: string;
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";

const getLocation = async (cityName: string) => {
  const res = await fetch(`${baseUrl}?q=%${cityName}&appid=${apiKey}`);
  const data = await res.json();
};

export default function Header() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    getLocation(values.cityName);
  };

  return (
    <header className="p-4 w-full flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            type="text"
            {...register("cityName")}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Los Angeles"
          />
          <input
            type="submit"
            value="search"
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          />
        </div>
      </form>
    </header>
  );
}
