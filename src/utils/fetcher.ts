import axios from "axios";

export const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data as unknown;
  } catch (e: any) {
    return e.message;
  }
};
