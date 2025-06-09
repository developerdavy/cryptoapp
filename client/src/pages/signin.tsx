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
    <div className="min-h-screen bg-white lg:bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 lg:border-gray-200 lg:sticky lg:top-0 z-50" ref={dropdownRef}>
        <div className="w-full px-2 sm:px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-12">
            <img 
              src={chicksxLogo} 
              alt="ChicksX" 
              className="h-8 sm:h-10 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => setLocation("/")}
            />
            
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
      
      {/* Mobile Landing Page Layout */}
      <div className="lg:hidden min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-blue-900">
        {/* Main Content */}
        <div className="px-4 py-8">
          {/* Hero Section */}
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold mb-4">The Lowest Fee Crypto Exchange</h1>
            <p className="text-lg opacity-90 mb-6">Buy, sell, exchange bitcoin, crypto or fiat instantly in any major city around the globe.</p>
            <Button 
              onClick={() => setLocation("/trade")}
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium mb-8"
            >
              Exchange Now
            </Button>
          </div>

          {/* Features Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-white">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-purple-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Fintrac & Fincen registered</div>
                <div className="text-sm opacity-80">Learn more →</div>
              </div>
            </div>
            
            <div className="flex items-center text-white">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-purple-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">★★★★★ 4.4/5</div>
                <div className="text-sm opacity-80">Customers review on trustpilot.com →</div>
              </div>
            </div>
          </div>

          {/* Crypto Cards */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">₿</span>
                </div>
                <div>
                  <div className="font-semibold">Bitcoin</div>
                  <div className="text-2xl font-bold">$107,924.55</div>
                  <div className="text-green-500 text-sm">↗ 1.78%</div>
                </div>
              </div>
              <div className="h-12 bg-gradient-to-r from-orange-100 to-orange-200 rounded mb-2"></div>
              <Button
                variant="ghost"
                className="text-purple-600 font-medium text-sm"
                onClick={() => setLocation("/trade/btc")}
              >
                Learn more →
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">Ξ</span>
                </div>
                <div>
                  <div className="font-semibold">Ethereum</div>
                  <div className="text-2xl font-bold">$2,539.49</div>
                  <div className="text-green-500 text-sm">↗ 0.05%</div>
                </div>
              </div>
              <div className="h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded mb-2"></div>
              <Button
                variant="ghost"
                className="text-purple-600 font-medium text-sm"
                onClick={() => setLocation("/trade/eth")}
              >
                Learn more →
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <div className="font-semibold">Solana</div>
                  <div className="text-2xl font-bold">$132.09</div>
                  <div className="text-green-500 text-sm">↗ 2.00%</div>
                </div>
              </div>
              <div className="h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded mb-2"></div>
              <Button
                variant="ghost"
                className="text-purple-600 font-medium text-sm"
                onClick={() => setLocation("/trade/sol")}
              >
                Learn more →
              </Button>
            </div>
          </div>

          {/* Why ChicksX Section */}
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Why ChicksX?</h2>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col lg:flex-row">
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