import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cloud, Settings, Bell, User } from 'lucide-react';

/**
 * Navbar Component
 * Main navigation bar for RainCheck weather application with branding and user controls
 * This component is used to provide consistent navigation and branding across the application, including access to alerts, settings, and user profile features
 * 
 * @returns JSX.Element - A React component that renders the main navigation bar with logo, branding, and navigation buttons
 */
const Navbar: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RainCheck</h1>
              <p className="text-sm text-gray-600">Weather Dashboard</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>

        {/* Placeholder for future features */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Navbar Component
            </h2>
            <p className="text-sm text-gray-600">
              Navigation and app controls will be implemented here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Navbar;
