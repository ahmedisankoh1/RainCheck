import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin } from 'lucide-react';
import { fetchCurrentWeather, searchLocations, type LocationData } from '@/services/weatherApi';

/**
 * SearchBox Component
 * Provides city search functionality for weather data with input validation and form handling
 * This component is used to enable users to search for weather information in different cities, providing an intuitive interface for location selection and weather data retrieval
 * 
 * @returns JSX.Element - A React component that renders a search form with input field, search button, and results placeholder
 */
const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [localError, setLocalError] = useState<string>('');
  const [suggestLoading, setSuggestLoading] = useState<boolean>(false);

  /**
   * Handles the form submission when user searches for a city
   * This function is used to process the search request, preventing default form submission and triggering the weather search functionality
   * 
   * @param e - React form event object from the form submission
   * @returns void
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      // loading event start
      window.dispatchEvent(new CustomEvent('weather:loading', { detail: { type: 'current', loading: true } }));
      const data = await fetchCurrentWeather(searchQuery.trim());
      // notify components about current weather update
      window.dispatchEvent(new CustomEvent('weather:current-updated', { detail: { data } }));
      // notify selected location for other consumers (e.g., forecast)
      window.dispatchEvent(new CustomEvent('weather:location-selected', { detail: { location: searchQuery.trim() } }));
    } catch (error: any) {
      window.dispatchEvent(new CustomEvent('weather:error', { detail: { type: 'current', message: error?.message || 'Failed to fetch weather' } }));
    } finally {
      window.dispatchEvent(new CustomEvent('weather:loading', { detail: { type: 'current', loading: false } }));
    }
  };

  /**
   * Loads location suggestions based on the current query
   * This function is used to provide live autocomplete suggestions under the input
   * 
   * @param query - Current input value
   * @returns Promise<void>
   */
  const loadSuggestions = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      setSuggestLoading(true);
      setLocalError('');
      const results = await searchLocations(query.trim());
      setSuggestions(results);
    } catch (err: any) {
      setLocalError(err?.message || 'Failed to load suggestions');
    } finally {
      setSuggestLoading(false);
    }
  };

  /**
   * Handles input field changes to update the search query state
   * This function is used to maintain the current search input value in component state, enabling real-time input validation and form control
   * 
   * @param e - React change event object from the input field
   * @returns void
   */
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // debounce-like basic approach: trigger fetch immediately for simplicity
    loadSuggestions(value);
  };

  /**
   * Handles selection of a suggestion to fetch weather by coordinates
   * This function is used to fetch current weather using precise lat/lon for better accuracy
   * 
   * @param suggestion - Selected location suggestion with name, country, lat, lon
   * @returns Promise<void>
   */
  const handleSelectSuggestion = async (suggestion: LocationData): Promise<void> => {
    const cityLabel = `${suggestion.name}, ${suggestion.country}`;
    setSearchQuery(cityLabel);
    setSuggestions([]);
    try {
      window.dispatchEvent(new CustomEvent('weather:loading', { detail: { type: 'current', loading: true } }));
      // fetch by coordinates
      const { VITE_WEATHER_API_KEY, VITE_WEATHER_API_URL } = import.meta.env as any;
      const apiKey = VITE_WEATHER_API_KEY as string;
      const apiBase = (VITE_WEATHER_API_URL as string) || 'https://api.openweathermap.org/data/2.5';
      const url = `${apiBase}/weather?lat=${suggestion.lat}&lon=${suggestion.lon}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
      const json = await response.json();
      const data = {
        temperature: Math.round(json.main.temp),
        condition: json.weather?.[0]?.main ?? 'Unknown',
        humidity: json.main.humidity,
        windSpeed: json.wind.speed,
        visibility: Math.round((json.visibility ?? 0) / 1000),
        icon: json.weather?.[0]?.icon ?? '01d',
        location: cityLabel,
      };
      window.dispatchEvent(new CustomEvent('weather:current-updated', { detail: { data } }));
      window.dispatchEvent(new CustomEvent('weather:location-selected', { detail: { location: cityLabel } }));
    } catch (error: any) {
      setLocalError(error?.message || 'Failed to fetch weather for selection');
      window.dispatchEvent(new CustomEvent('weather:error', { detail: { type: 'current', message: error?.message || 'Failed to fetch weather' } }));
    } finally {
      window.dispatchEvent(new CustomEvent('weather:loading', { detail: { type: 'current', loading: false } }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          SearchBox Component
        </h2>
        <p className="text-gray-600 mb-4">
          Search for weather in any city worldwide
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Enter city name..."
                value={searchQuery}
                onChange={handleInputChange}
                className="pl-10"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={!searchQuery.trim()}>
              <MapPin className="h-4 w-4 mr-2" />
              Search Weather
            </Button>
          </form>

          {/* Suggestions */}
          <div className="mt-2">
            {localError && (
              <p className="text-sm text-red-600 mb-2">{localError}</p>
            )}
            {suggestLoading && (
              <p className="text-sm text-gray-500">Loading suggestions...</p>
            )}
            {!suggestLoading && suggestions.length > 0 && (
              <ul className="bg-white border rounded-md divide-y">
                {suggestions.map((s, idx) => (
                  <li key={`${s.name}-${s.lat}-${s.lon}-${idx}`}>
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between"
                      onClick={() => handleSelectSuggestion(s)}
                    >
                      <span>
                        {s.name}, {s.country}
                      </span>
                      <span className="text-xs text-gray-500">{s.lat.toFixed(2)}, {s.lon.toFixed(2)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchBox;
