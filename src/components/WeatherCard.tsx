import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, Droplets, Wind, Eye } from 'lucide-react';
import { fetchCurrentWeather, type WeatherData } from '@/services/weatherApi';

/**
 * WeatherCard Component
 * Displays current weather information including temperature, conditions, and weather details
 * This component is used to present real-time weather data in an attractive card format, providing users with essential weather information at a glance including temperature, humidity, wind speed, and visibility
 * 
 * @returns JSX.Element - A React component that renders weather information in a card layout with placeholder data
 */
const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [lastQuery, setLastQuery] = useState<string>('');

  /**
   * Handles refresh by re-fetching the last searched location's weather
   * This function is used to allow users to manually refresh the displayed weather data for the last queried location
   * 
   * @returns Promise<void> - Resolves after the refresh attempt completes
   */
  const handleRefresh = useCallback(async (): Promise<void> => {
    if (!lastQuery) return;
    try {
      setLoading(true);
      setError('');
      const data = await fetchCurrentWeather(lastQuery);
      setWeather(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to refresh weather');
    } finally {
      setLoading(false);
    }
  }, [lastQuery]);

  useEffect(() => {
    /**
     * Listens for search results and updates card state
     */
    const onCurrentUpdated = (e: Event) => {
      const detail = (e as CustomEvent).detail as { data: WeatherData };
      setWeather(detail.data);
      setError('');
    };
    /**
     * Tracks loading states dispatched from SearchBox
     */
    const onLoading = (e: Event) => {
      const detail = (e as CustomEvent).detail as { type: string; loading: boolean };
      if (detail.type === 'current') setLoading(detail.loading);
    };
    /**
     * Tracks errors dispatched from SearchBox
     */
    const onError = (e: Event) => {
      const detail = (e as CustomEvent).detail as { type: string; message: string };
      if (detail.type === 'current') setError(detail.message);
    };
    /**
     * Save last query when a new location is selected
     */
    const onLocationSelected = (e: Event) => {
      const detail = (e as CustomEvent).detail as { location: string };
      setLastQuery(detail.location);
    };

    window.addEventListener('weather:current-updated', onCurrentUpdated as EventListener);
    window.addEventListener('weather:loading', onLoading as EventListener);
    window.addEventListener('weather:error', onError as EventListener);
    window.addEventListener('weather:location-selected', onLocationSelected as EventListener);
    return () => {
      window.removeEventListener('weather:current-updated', onCurrentUpdated as EventListener);
      window.removeEventListener('weather:loading', onLoading as EventListener);
      window.removeEventListener('weather:error', onError as EventListener);
      window.removeEventListener('weather:location-selected', onLocationSelected as EventListener);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          WeatherCard Component
        </h2>
        <p className="text-gray-600 mb-4">
          This component will display current weather data
        </p>
      </div>

      {/* Placeholder weather display */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-3xl font-bold">{weather ? `${weather.temperature}°C` : '--°C'}</h3>
              <p className="text-blue-100">{weather ? weather.location : 'Current Temperature'}</p>
            </div>
            {weather?.icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather?.condition || 'Weather icon'}
                className="h-16 w-16"
              />
            ) : (
              <Cloud className="h-16 w-16 text-blue-200" />
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Droplets className="h-6 w-6 mb-1" />
              <span className="text-sm">{weather ? `${weather.humidity}%` : '--%'}</span>
              <span className="text-xs text-blue-100">Humidity</span>
            </div>
            <div className="flex flex-col items-center">
              <Wind className="h-6 w-6 mb-1" />
              <span className="text-sm">{weather ? `${Math.round(weather.windSpeed)} km/h` : '-- km/h'}</span>
              <span className="text-xs text-blue-100">Wind</span>
            </div>
            <div className="flex flex-col items-center">
              <Eye className="h-6 w-6 mb-1" />
              <span className="text-sm">{weather ? `${weather.visibility} km` : '-- km'}</span>
              <span className="text-xs text-blue-100">Visibility</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="text-center text-red-100 bg-red-500/70 rounded p-2">{error}</div>
      )}

      <div className="flex justify-center">
        <Button variant="outline" className="w-full" onClick={handleRefresh} disabled={loading || !lastQuery}>
          {loading ? 'Loading...' : 'Refresh Weather Data'}
        </Button>
      </div>
    </div>
  );
};

export default WeatherCard;
