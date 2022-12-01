import { useQuery } from "react-query";
// services
import axios from "services/axios";

const fetchAdverts = async () => {
  try {
    /* Get adverts */
    const { data } = await axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/videos`
    );
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useAdverts() {
  return useQuery(`adverts`, () => fetchAdverts(), {
    staleTime: 60 * 1000 * 5, // 5min cache
    refetchOnWindowFocus: undefined,
    select: (data) => {
      return [...data];
    },
  });
}
