import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp } from 'lucide-react';

/**
 * ForecastChart Component
 * Displays 5-day weather forecast in chart format with temperature trends and weather conditions
 * This component is used to present extended weather predictions to users, helping them plan ahead by showing upcoming weather patterns, temperature ranges, and conditions for the next five days
 * 
 * @returns JSX.Element - A React component that renders a forecast chart with placeholder data and interactive elements
 */
const ForecastChart: React.FC = () => {
  // Placeholder forecast data
  const forecastDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const placeholderTemps = ['22°', '24°', '20°', '18°', '25°'];

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
          {/* Placeholder chart area */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Forecast Chart</p>
                <p className="text-sm text-gray-500">
                  Chart visualization will be implemented here
                </p>
              </div>
            </div>
          </div>

          {/* Placeholder forecast cards */}
          <div className="grid grid-cols-5 gap-2">
            {forecastDays.map((day, index) => (
              <div
                key={day}
                className="bg-white border rounded-lg p-3 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-medium text-gray-600 mb-1">{day}</p>
                <div className="text-2xl mb-2">☀️</div>
                <p className="text-lg font-semibold text-gray-800">
                  {placeholderTemps[index]}
                </p>
                <p className="text-xs text-gray-500">Sunny</p>
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
