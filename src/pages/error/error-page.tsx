import { Home, ArrowLeft, Search, AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error404Page() {
  const handleGoHome = () => {
    // Simulate navigation to home
    console.log('Navigating to home...');
  };

  const handleGoBack = () => {
    // Simulate going back
    console.log('Going back...');
  };

  const handleRefresh = () => {
    // Simulate page refresh
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-600 leading-none">
            404
          </div>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-100 leading-none -z-10 translate-x-2 translate-y-2">
            404
          </div>
        </div>

        {/* Warning Icon with Animation */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 w-16 h-16 bg-red-800 rounded-full animate-ping opacity-25"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Trang không tồn tại
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Rất tiếc, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
          </p>
          <p className="text-base text-gray-500">
            Trang có thể đã được di chuyển, xóa hoặc bạn đã nhập sai địa chỉ URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleGoHome}
            className="group flex items-center space-x-2 bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Về trang chủ</span>
          </button>

          <button
            onClick={handleGoBack}
            className="group flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Quay lại</span>
          </button>

          <button
            onClick={handleRefresh}
            className="group flex items-center space-x-2 border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Tải lại</span>
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-red-800 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Thử tìm kiếm thứ khác
            </h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent transition-all duration-300"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-800 hover:text-red-600 transition-colors duration-300">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Các liên kết hữu ích:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-red-800 hover:text-red-600 transition-colors duration-300 hover:underline">
              Trang chủ
            </a>
            <a href="#" className="text-red-800 hover:text-red-600 transition-colors duration-300 hover:underline">
              Về chúng tôi
            </a>
            <a href="#" className="text-red-800 hover:text-red-600 transition-colors duration-300 hover:underline">
              Liên hệ
            </a>
            <a href="#" className="text-red-800 hover:text-red-600 transition-colors duration-300 hover:underline">
              Hỗ trợ
            </a>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-red-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-red-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
}