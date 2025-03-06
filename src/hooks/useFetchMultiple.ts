import { useQuery } from "@tanstack/react-query";

const fetchResource = async (urls: string[]) => {
  if (!urls.length) return [];
  const responses = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );
  return responses;
};

export const useFetchMultiple = (urls: string[], queryKey: string) => {
  return useQuery({
    queryKey: [queryKey, urls],
    queryFn: () => fetchResource(urls),
    enabled: !!urls.length, // Only fetch if URLs exist
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes,
  });
};
