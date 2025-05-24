import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    if (isLogin) {
      console.log('Đăng nhập:', { email: formData.email, password: formData.password });
    } else {
      console.log('Đăng ký:', formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    });
  };

  return (
      <div className="h-screen w-screen fixed inset-0 overflow-hidden">
        {/* Full Screen Background Image */}
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dfvy81evi/image/upload/v1748061418/Lingora_1_c7cbws.png')`
            }}
        />

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/20" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex">

          {/* Left Side - Background Content (Hidden on mobile) */}
          <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12">
            <div className="max-w-lg text-center text-white">
              
             
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-[480px] xl:w-[520px] bg-transparent p-6 lg:p-8"> {/* Increased padding */}
            <div className="h-full flex items-center justify-center p-8 xl:p-12 overflow-y-auto">
              <div className="w-full max-w-md"> {/* Increased max-width */}

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-800 to-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>

                  <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-3">
                    {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
                  </h2>
                  <p className="text-black text-lg">
                    {isLogin ? 'Chào mừng bạn quay trở lại Lingora' : 'Tạo tài khoản mới của bạn'}
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-6">

                  {/* Full Name Field (only for register) */}
                  {!isLogin && (
                      <div className="space-y-2 text-left"> {/* Add text-left here */}
                        <label className="block text-sm font-medium text-gray-700 text-left">Họ và tên</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                              placeholder="Nhập họ và tên của bạn"
                              required={!isLogin}
                          />
                        </div>
                      </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2 text-left"> {/* Add text-left here */}
                    <label className="block text-sm font-medium text-gray-700 text-left">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                          placeholder="example@email.com"
                          required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2 text-left"> {/* Add text-left here */}
                    <label className="block text-sm font-medium text-gray-700 text-left">Mật khẩu</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                          placeholder="Nhập mật khẩu"
                          required
                      />
                      <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field (only for register) */}
                  {!isLogin && (
                      <div className="space-y-2 text-left"> {/* Add text-left here */}
                        <label className="block text-sm font-medium text-gray-700 text-left">Xác nhận mật khẩu</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-12 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                              placeholder="Nhập lại mật khẩu"
                              required={!isLogin}
                          />
                          <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                  )}

                  {/* Remember Me / Forgot Password (only for login) */}
                  {isLogin && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="ml-2 text-sm text-gray-700">Ghi nhớ đăng nhập</span>
                        </label>
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Quên mật khẩu?
                        </button>
                      </div>
                  )}

                  {/* Submit Button */}
                  <button
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-red-800 to-red-400 text-white py-4 px-6 rounded-xl text-base font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span>{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Toggle Mode */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                    <button
                        onClick={toggleMode}
                        className="ml-2 text-red-400 hover:text-read-800 font-medium transition-colors"
                    >
                      {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                    </button>
                  </p>
                </div>

                {/* Social Login */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Hoặc tiếp tục với
                    </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="ml-2">Google</span>
                    </button>

                    <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="ml-2">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
