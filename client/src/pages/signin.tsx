import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showBuyCryptoDropdown, setShowBuyCryptoDropdown] = useState(false);
  const [showSellCryptoDropdown, setShowSellCryptoDropdown] = useState(false);
  const [showSwapDropdown, setShowSwapDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    if (email && password) {
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  const handleSignUp = () => {
    setLocation("/signup");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBuyCryptoDropdown(false);
        setShowSellCryptoDropdown(false);
        setShowSwapDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50" ref={dropdownRef}>
        <div className="w-full px-2 sm:px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-12">
            <img src={chicksxLogo} alt="ChicksX" className="h-8 sm:h-10" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className={`text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium text-base px-4 py-2 ${showBuyCryptoDropdown ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => {
                    setShowBuyCryptoDropdown(!showBuyCryptoDropdown);
                    setShowSellCryptoDropdown(false);
                    setShowSwapDropdown(false);
                  }}
                >
                  Buy Crypto
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className={`text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium text-base px-4 py-2 ${showSellCryptoDropdown ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => {
                    setShowSellCryptoDropdown(!showSellCryptoDropdown);
                    setShowBuyCryptoDropdown(false);
                    setShowSwapDropdown(false);
                  }}
                >
                  Sell Crypto
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className={`text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium text-base px-4 py-2 ${showSwapDropdown ? 'bg-gray-100 text-gray-900' : ''}`}
                  onClick={() => {
                    setShowSwapDropdown(!showSwapDropdown);
                    setShowBuyCryptoDropdown(false);
                    setShowSellCryptoDropdown(false);
                  }}
                >
                  Swap
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
            </nav>
          </div>
          
          {/* Desktop Sign In Button */}
          <Button 
            onClick={() => setLocation("/signup")}
            className="hidden sm:flex bg-indigo-700 hover:bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden lg:inline">Sign Up</span>
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900"
                onClick={() => {
                  setShowBuyCryptoDropdown(!showBuyCryptoDropdown);
                  setShowSellCryptoDropdown(false);
                  setShowSwapDropdown(false);
                }}
              >
                Buy Crypto
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900"
                onClick={() => {
                  setShowSellCryptoDropdown(!showSellCryptoDropdown);
                  setShowBuyCryptoDropdown(false);
                  setShowSwapDropdown(false);
                }}
              >
                Sell Crypto
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900"
                onClick={() => {
                  setShowSwapDropdown(!showSwapDropdown);
                  setShowBuyCryptoDropdown(false);
                  setShowSellCryptoDropdown(false);
                }}
              >
                Swap
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900"
                onClick={() => setLocation("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </header>
      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Sign In Form */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-0 py-8 sm:px-8 lg:p-12 min-h-screen">
          <div className="w-full px-4 sm:px-0 sm:max-w-md mx-auto space-y-6 sm:space-y-8">
            {/* Sign In Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Sign In</h1>
            </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-purple-500 text-sm sm:text-base"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm space-y-2 sm:space-y-0">
              <button
                type="button"
                className="text-gray-600 hover:text-purple-600"
              >
                Forgot your password?
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className="text-gray-600 hover:text-purple-600 text-center"
              >
                Don't have an account? Sign Up
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 text-base sm:text-lg font-medium rounded-lg"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3">
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <button 
                onClick={() => window.location.href = '/auth/facebook'}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base">f</span>
              </button>
              <button 
                onClick={() => window.location.href = '/auth/twitter'}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base">t</span>
              </button>
              <button 
                onClick={() => window.location.href = '/auth/google'}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base">G</span>
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2 sm:mb-3">ChicksX Group</p>
              <div className="flex justify-center space-x-1 sm:space-x-2">
                <button className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">
                  A
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
                  M
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                  G
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  S
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
                  NG
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 sm:mt-2">Use account to access all of ChicksX services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Animated Background */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-purple-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Stars */}
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-white rounded-full opacity-90"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full opacity-80"></div>

          {/* Large Circles */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-600 rounded-full opacity-30"></div>
          <div className="absolute bottom-32 left-32 w-48 h-48 bg-blue-600 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500 rounded-full opacity-15"></div>

          {/* Platform with Robot */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-800 to-transparent"></div>
          
          {/* Robot Character Area */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            <div className="text-center">
              {/* Robot representation */}
              <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-1"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
              
              {/* Flag */}
              <div className="w-8 h-6 bg-white rounded-sm mx-auto mb-2 flex items-center justify-center">
                <span className="text-xs font-bold text-purple-600">CX</span>
              </div>
            </div>
          </div>

          {/* Dome Structure */}
          <div className="absolute bottom-20 right-1/4 w-32 h-16 border-4 border-white rounded-t-full opacity-60"></div>
          
          {/* Cryptocurrency Icons */}
          <div className="absolute bottom-40 right-20 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            ₿
          </div>
          <div className="absolute bottom-48 right-32 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
            L
          </div>
          <div className="absolute bottom-36 right-40 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            M
          </div>
          <div className="absolute bottom-52 left-20 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}