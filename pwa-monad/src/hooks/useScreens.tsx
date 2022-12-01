import { useQuery } from "react-query";
// services
import axios from "services/axios";

const fetchScreens = async () => {
  try {
    /* Get screens */
    const { data } = await axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/screens`
    );

    return data.screens;
  } catch (error) {
    return undefined;
  }
};

export function useScreens() {
  return useQuery(`screens`, () => fetchScreens(), {
    staleTime: 60 * 1000 * 5, // 5min cache
    refetchOnWindowFocus: undefined,
    select: (data) => {
      return [...data];
    },
  });
}
