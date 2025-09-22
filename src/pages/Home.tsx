import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WeatherCard from '@/components/WeatherCard';
import SearchBox from '@/components/SearchBox';
import ForecastChart from '@/components/ForecastChart';
import Navbar from '@/components/Navbar';

/**
 * Home page - Main dashboard for RainCheck weather application
 * Displays current weather, search functionality, and forecast
 */
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            RainCheck Weather Dashboard
          </h1>
          <p className="text-gray-600">
            Stay informed about current conditions and upcoming weather
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Search Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Search Location</CardTitle>
            </CardHeader>
            <CardContent>
              <SearchBox />
            </CardContent>
          </Card>

          {/* Current Weather Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Current Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherCard />
            </CardContent>
          </Card>
        </div>

        {/* Forecast Section */}
        <Card>
          <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ForecastChart />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;
