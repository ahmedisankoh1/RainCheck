import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp } from 'lucide-react';
import { fetchForecast, type ForecastData } from '@/services/weatherApi';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * ForecastChart Component
 * Displays 5-day weather forecast in chart format with temperature trends and weather conditions
 * This component is used to present extended weather predictions to users, helping them plan ahead by showing upcoming weather patterns, temperature ranges, and conditions for the next five days
 * 
 * @returns JSX.Element - A React component that renders a forecast chart with placeholder data and interactive elements
 */
const ForecastChart: React.FC = () => {
  const [data, setData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /**
   * Fetches forecast for a given location and updates state
   * This function is used to keep the 5-day forecast in sync with the selected city
   * 
   * @param location - City name to fetch forecast for
   * @returns Promise<void>
   */
  const loadForecast = async (location: string): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      const result = await fetchForecast(location);
      setData(result);
    } catch (err: any) {
      setError(err?.message || 'Failed to load forecast');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onLocationSelected = (e: Event) => {
      const detail = (e as CustomEvent).detail as { location: string };
      loadForecast(detail.location);
    };
    window.addEventListener('weather:location-selected', onLocationSelected as EventListener);
    return () => window.removeEventListener('weather:location-selected', onLocationSelected as EventListener);
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          ForecastChart Component
        </h2>
        <p className="text-gray-600 mb-4">
          5-day weather forecast with temperature trends
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
            <div className="h-64">
              {loading ? (
                <div className="flex items-center justify-center h-full text-gray-600">Loading forecast...</div>
              ) : error ? (
                <div className="flex items-center justify-center h-full text-red-600">{error}</div>
              ) : data.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis unit="°C" />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature.max" name="Max" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="temperature.min" name="Min" stroke="#60a5fa" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Forecast Chart</p>
                    <p className="text-sm text-gray-500">Search a city to load forecast</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {data.map((d) => (
              <div key={d.date} className="bg-white border rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <p className="text-sm font-medium text-gray-600 mb-1">{d.date}</p>
                <div className="text-2xl mb-2">{d.icon === '01d' ? '☀️' : '⛅'}</div>
                <p className="text-lg font-semibold text-gray-800">{d.temperature.max}° / {d.temperature.min}°</p>
                <p className="text-xs text-gray-500">{d.condition}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View Extended Forecast
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastChart;
