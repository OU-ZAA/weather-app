import { useForm, SubmitHandler } from "react-hook-form";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import { Coordinates } from "@/pages";
import { Dispatch, SetStateAction } from "react";

interface FormValues {
  cityName: string;
}

async function getLocationByCity(cityName: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";

  const { data } = await axios.get(
    `${baseUrl}?q=${cityName}&limit=1&appid=${apiKey}`
  );
  return data as Coordinates[];
}

export default function SearchForm({
  setCoordinates,
}: {
  setCoordinates: Dispatch<SetStateAction<Coordinates | undefined>>;
}) {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const data = await getLocationByCity(values.cityName);
    setCoordinates(data[0]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white flex items-center gap-4 rounded-lg py-2 px-4 w-96"
    >
      <HiOutlineSearch className="w-6 h-6" />
      <input
        type="text"
        {...register("cityName")}
        className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
        placeholder="Los Angeles, CA"
      />
    </form>
  );
}
