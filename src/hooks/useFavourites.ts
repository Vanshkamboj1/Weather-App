import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface favoriteCityItem {
  id: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  addedAt: number;
}
export const useFavourites = () => {
  const [favorite, setFavorite] = useLocalStorage<favoriteCityItem[]>(
    "favorite",
    []
  );

  const queryClient = useQueryClient();

  const favoriteQuery = useQuery({
    queryKey: ["favorite"],
    queryFn: () => favorite,
    initialData: favorite,
    staleTime: Infinity,
  });

  const addToFavorite = useMutation({
    mutationFn: async (city: Omit<favoriteCityItem, "id" | "addedAt">) => {
      const newFavorite: favoriteCityItem = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const exists = favorite.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorite;

      const newFavorites = [...favorite, newFavorite].slice(0, 10);
      setFavorite(newFavorites);

      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorite"],
      });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorite.filter((city) => city.id !== cityId);
      setFavorite(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorite"],
      });
    },
  });
  return {
    favorites: favoriteQuery.data,
    addToFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) => {
      return favorite.some((city) => city.lat === lat && city.lon === lon);
    },
  };
};
