import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { useState } from "react";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/useWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { format } from "date-fns";
import { useFavourites } from "@/hooks/useFavourites";

export const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const nvaigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: location, isLoading } = useLocationSearch(query);
  const { addToHistory, clearHistory, history } = useSearchHistory();
  const {favorites}=useFavourites();
  const handleSelect = (cityData: string) => {
  const [lat, lon, name, country] = cityData.split("|");
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });
    setOpen(false);
    nvaigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };
  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {favorites.length > 0 && (
           
             
              <CommandGroup heading="Favorite">
                {favorites.map((loc) => {
                  return (
                    <CommandItem
                      key={loc.id}
                      value={`${loc.lat}| ${loc.lon} | ${loc.name} | ${loc.country}`}
                      onSelect={handleSelect}
                    >
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />

                      <span>{loc.name} ,</span>
                      {loc.state && (
                        <span className="text-sm text-muted-foreground">
                          {loc.state} ,
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {loc.country} ,
                      </span>
                      <span>{format(loc.addedAt, "MMM d, h:mm a")}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
           
          )}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((loc) => {
                  return (
                    <CommandItem
                      key={`${loc.lat}-${loc.lon}`}
                      value={`${loc.lat}| ${loc.lon} | ${loc.name} | ${loc.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />

                      <span>{loc.name} ,</span>
                      {loc.state && (
                        <span className="text-sm text-muted-foreground">
                          {loc.state} ,
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {loc.country} ,
                      </span>
                      <span>{format(loc.searchedAt, "MMM d, h:mm a")}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {location && location.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {location.map((loc) => {
                return (
                  <CommandItem
                    key={`${loc.lat}-${loc.lon}`}
                    value={`${loc.lat}| ${loc.lon} | ${loc.name} | ${loc.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="h-4 w-4 mr-2" />

                    <span>{loc.name} ,</span>
                    {loc.state && (
                      <span className="text-sm text-muted-foreground">
                        {loc.state} ,
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {loc.country} 
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
