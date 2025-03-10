import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchHomeworld = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch homeworld");
  return await response.json();
};

export const useHomeworld = (homeworld: string) => {
  const queryClient = useQueryClient();
  const cachedHomeworld = homeworld
    ? queryClient.getQueryData<{ name: string }>(["homeworld", homeworld])
    : null;
  return useQuery({
    queryKey: ["homeworld", homeworld],
    queryFn: () => fetchHomeworld(homeworld),
    enabled: !cachedHomeworld,
    initialData: cachedHomeworld, // Use cached data if available
  });
};
