
import Header from './Header';

const TestLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading test questions...</p>
        </div>
      </div>
    </div>
  );
};

export default TestLoading;
