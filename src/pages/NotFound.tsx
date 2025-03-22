
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 pt-16">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-blue/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-white dark:bg-gray-800 p-4 rounded-full border border-gray-200 dark:border-gray-700">
                <Globe className="h-16 w-16 text-brand-blue" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            404
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Oops! Page not found
          </p>
          
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button asChild className="button-shadow">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
