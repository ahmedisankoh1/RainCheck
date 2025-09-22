import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin } from 'lucide-react';

/**
 * SearchBox Component
 * Provides city search functionality for weather data with input validation and form handling
 * This component is used to enable users to search for weather information in different cities, providing an intuitive interface for location selection and weather data retrieval
 * 
 * @returns JSX.Element - A React component that renders a search form with input field, search button, and results placeholder
 */
const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  /**
   * Handles the form submission when user searches for a city
   * This function is used to process the search request, preventing default form submission and triggering the weather search functionality
   * 
   * @param e - React form event object from the form submission
   * @returns void
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // TODO: Implement weather search functionality
  };

  /**
   * Handles input field changes to update the search query state
   * This function is used to maintain the current search input value in component state, enabling real-time input validation and form control
   * 
   * @param e - React change event object from the input field
   * @returns void
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

          {/* Placeholder for search results */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Search results will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchBox;
