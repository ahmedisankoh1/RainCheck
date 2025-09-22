/**
 * Weather API Service
 * Handles all weather data fetching from external APIs
 * Placeholder functions ready for OpenWeatherMap or similar API integration
 */

// Types for weather data
export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
  location: string;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface LocationData {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

/**
 * Resolves environment variables for the weather API from Vite env
 * This function centralizes env access to ensure consistency in Vite-based projects
 * 
 * @returns { apiKey: string; apiBase: string; geoBase: string }
 */
function getEnv(): { apiKey: string; apiBase: string; geoBase: string } {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;
  const apiBase = (import.meta.env.VITE_WEATHER_API_URL as string | undefined) || 'https://api.openweathermap.org/data/2.5';
  const geoBase = (import.meta.env.VITE_WEATHER_GEO_API_URL as string | undefined) || 'https://api.openweathermap.org/geo/1.0';
  if (!apiKey) throw new Error('Weather API key is not configured');
  return { apiKey, apiBase, geoBase };
}

/**
 * Fetches current weather data for a specific location from external weather API
 * This function is used to retrieve real-time weather information including temperature, conditions, humidity, wind speed, and visibility for display in the weather dashboard
 * 
 * @param location - City name or coordinates (e.g., "New York" or "40.7128,-74.0060")
 * @returns Promise<WeatherData> - Current weather information object containing temperature, condition, humidity, windSpeed, visibility, icon, and location
 */
export const fetchCurrentWeather = async (location: string): Promise<WeatherData> => {
  try {
    const { apiKey, apiBase } = getEnv();
    const url = `${apiBase}/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const json = await response.json();
    const mapped: WeatherData = {
      temperature: Math.round(json.main.temp),
      condition: json.weather?.[0]?.main ?? 'Unknown',
      humidity: json.main.humidity,
      windSpeed: json.wind.speed,
      visibility: Math.round((json.visibility ?? 0) / 1000),
      icon: json.weather?.[0]?.icon ?? '01d',
      location: `${json.name}, ${json.sys?.country ?? ''}`.trim(),
    };
    return mapped;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather data');
  }
};

/**
 * Fetches 5-day weather forecast data for a specific location from external weather API
 * This function is used to retrieve extended weather predictions for the forecast chart component, providing users with upcoming weather trends and conditions
 * 
 * @param location - City name or coordinates (e.g., "New York" or "40.7128,-74.0060")
 * @returns Promise<ForecastData[]> - Array of forecast data objects for 5 consecutive days, each containing date, temperature range, condition, icon, humidity, and wind speed
 */
export const fetchForecast = async (location: string): Promise<ForecastData[]> => {
  try {
    const { apiKey, apiBase } = getEnv();
    const url = `${apiBase}/forecast?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }
    const json = await response.json();
    // Take midday points for next 5 days
    const byNoon = json.list.filter((entry: any) => entry.dt_txt.includes('12:00:00')).slice(0, 5);
    const mapped: ForecastData[] = byNoon.map((entry: any) => ({
      date: entry.dt_txt.split(' ')[0],
      temperature: { min: Math.round(entry.main.temp_min), max: Math.round(entry.main.temp_max) },
      condition: entry.weather?.[0]?.main ?? 'Unknown',
      icon: entry.weather?.[0]?.icon ?? '01d',
      humidity: entry.main.humidity,
      windSpeed: entry.wind.speed,
    }));
    return mapped;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw new Error('Failed to fetch forecast data');
  }
};

/**
 * Searches for locations based on city name using geocoding API
 * This function is used to provide location autocomplete functionality in the search box, helping users find and select the correct city for weather data retrieval
 * 
 * @param query - Search query string containing city name (e.g., "New York", "London")
 * @returns Promise<LocationData[]> - Array of matching location objects containing name, country, latitude, and longitude coordinates
 */
export const searchLocations = async (query: string): Promise<LocationData[]> => {
  try {
    const { apiKey, geoBase } = getEnv();
    const url = `${geoBase}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geo API error: ${response.status}`);
    }
    const json = await response.json();
    const results: LocationData[] = (json as any[]).map((item) => ({
      name: item.name as string,
      country: item.country as string,
      lat: item.lat as number,
      lon: item.lon as number,
    }));
    return results;
  } catch (error) {
    console.error('Error searching locations:', error);
    throw new Error('Failed to search locations');
  }
};

/**
 * Fetches weather alerts and warnings for a specific location from weather API
 * This function is used to retrieve severe weather notifications and alerts to keep users informed about potentially dangerous weather conditions in their area
 * 
 * @param location - City name or coordinates (e.g., "New York" or "40.7128,-74.0060")
 * @returns Promise<string[]> - Array of weather alert strings describing current warnings, watches, or advisories for the specified location
 */
export const fetchWeatherAlerts = async (location: string): Promise<string[]> => {
  try {
    // TODO: Replace with actual API call for weather alerts
    console.log('Fetching weather alerts for:', location);
    
    // Placeholder response
    return [];
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    throw new Error('Failed to fetch weather alerts');
  }
};
