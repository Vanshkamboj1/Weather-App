import { CurrentWeather } from "@/components/CurrentWeather";
import { FavoriteBtn } from "@/components/FavoriteBtn";                    
import { HourlyTemp } from "@/components/HourlyTemp";
import { LoadingSkeleton } from "@/components/Loading-Skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WeatherDetails } from "@/components/WeatherDetails";
import { WeatherForecast } from "@/components/WeatherForecast";
import { useForcastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

export const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForcastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data please try again</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="space-y-4">
     
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          <FavoriteBtn data={{...weatherQuery.data,name:params.cityName}} />

        </div>
      </div>
      <div className="grid gap-6 ">
        <div className="flex flex-col  gap-4">
          <CurrentWeather data={weatherQuery.data} />

          <HourlyTemp data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};
