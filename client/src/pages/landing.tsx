import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, Headphones, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaDiscord, FaTwitter, FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";
import mobileAppImage from "@assets/fd7028f1b02c88789f6f (1)_1749112747335.png";

export default function Landing() {
  const [showBuyCryptoDropdown, setShowBuyCryptoDropdown] = useState(false);
  const [showSellCryptoDropdown, setShowSellCryptoDropdown] = useState(false);
  const [showSwapDropdown, setShowSwapDropdown] = useState(false);
  const [swapActiveTab, setSwapActiveTab] = useState('Fiat');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Search state for different dropdowns
  const [buyCryptoSearch, setBuyCryptoSearch] = useState('');
  const [sellCryptoSearch, setSellCryptoSearch] = useState('');
  const [paymentMethodSearch, setPaymentMethodSearch] = useState('');
  const [swapCryptoSearch, setSwapCryptoSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Fetch market data for prices
  const { data: marketData } = useQuery({
    queryKey: ['/api/market-data'],
    enabled: true
  });

  const cryptos = [
    { symbol: "BTC", name: "Bitcoin", color: "bg-orange-500", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", color: "bg-blue-500", icon: "Ξ" },
    { symbol: "USDT", name: "Tether", color: "bg-green-500", icon: "T" },
    { symbol: "BNB", name: "BNB", color: "bg-yellow-600", icon: "₿" },
    { symbol: "ADA", name: "Cardano", color: "bg-red-500", icon: "A" },
    { symbol: "SOL", name: "Solana", color: "bg-purple-600", icon: "S" },
    { symbol: "XRP", name: "Ripple", color: "bg-blue-700", icon: "X" },
    { symbol: "DOGE", name: "Dogecoin", color: "bg-yellow-700", icon: "D" },
  ];

  const sellCryptos = [
    { symbol: "BTC", name: "Bitcoin", color: "bg-orange-500", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", color: "bg-blue-500", icon: "Ξ" },
    { symbol: "USDT", name: "Tether", color: "bg-green-500", icon: "T" },
    { symbol: "BNB", name: "BNB", color: "bg-yellow-600", icon: "₿" },
    { symbol: "ADA", name: "Cardano", color: "bg-red-500", icon: "A" },
    { symbol: "SOL", name: "Solana", color: "bg-purple-600", icon: "S" },
    { symbol: "XRP", name: "Ripple", color: "bg-blue-700", icon: "X" },
    { symbol: "DOGE", name: "Dogecoin", color: "bg-yellow-700", icon: "D" },
    { symbol: "AVAX", name: "Avalanche", color: "bg-teal-600", icon: "A" },
    { symbol: "MATIC", name: "Polygon", color: "bg-indigo-600", icon: "P" },
    { symbol: "DOT", name: "Polkadot", color: "bg-pink-600", icon: "D" },
    { symbol: "LTC", name: "Litecoin", color: "bg-gray-500", icon: "L" },
  ];

  const paymentMethods = [
    { name: "SWIFT Bank Transfer", color: "bg-blue-600", icon: "S" },
    { name: "EFT", color: "bg-gray-600", icon: "Ξ" },
    { name: "Western Union", color: "bg-yellow-600", icon: "W" },
    { name: "MoneyGram", color: "bg-red-600", icon: "M" },
    { name: "Wire Transfer", color: "bg-green-600", icon: "T" },
    { name: "Bank Draft", color: "bg-purple-600", icon: "B" },
  ];

  // Filter functions
  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(buyCryptoSearch.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(buyCryptoSearch.toLowerCase())
  );

  const filteredSellCryptos = sellCryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(sellCryptoSearch.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(sellCryptoSearch.toLowerCase())
  );

  const filteredPaymentMethods = paymentMethods.filter(method =>
    method.name.toLowerCase().includes(paymentMethodSearch.toLowerCase())
  );

  const handleLogout = async () => {
    await logout();
    setLocation("/signin");
  };

  // Helper function to create clickable crypto badge
  const CryptoBadge = ({ symbol, name, color, icon, action = "trade" }: { symbol: string, name: string, color: string, icon: string, action?: string }) => (
    <div 
      className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={() => setLocation(`/${action}/${symbol.toLowerCase()}`)}
    >
      <div className={`w-6 h-6 ${color} rounded-full flex items-center justify-center`}>
        <span className="text-white text-xs font-bold">{icon}</span>
      </div>
      <span className="text-sm font-medium text-black">{symbol}</span>
    </div>
  );

  // Helper function to create clickable fiat badge
  const FiatBadge = ({ symbol, name, color, icon, action = "trade" }: { symbol: string, name: string, color: string, icon: string, action?: string }) => (
    <div 
      className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={() => setLocation(`/${action}/${symbol.toLowerCase()}`)}
    >
      <div className={`w-6 h-6 ${color} rounded-full flex items-center justify-center`}>
        <span className="text-white text-xs font-bold">{icon}</span>
      </div>
      <span className="text-sm font-medium text-black">{symbol}</span>
    </div>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBuyCryptoDropdown(false);
        setShowSellCryptoDropdown(false);
        setShowSwapDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const trendingCryptos = marketData ? [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: `$${(marketData as any[]).find((m: any) => m.symbol === 'BTC')?.price?.toLocaleString() || '45,000'}`,
      change: `${(marketData as any[]).find((m: any) => m.symbol === 'BTC')?.priceChange24h >= 0 ? '+' : ''}${(marketData as any[]).find((m: any) => m.symbol === 'BTC')?.priceChange24h?.toFixed(2) || '0.00'}%`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      chartColor: "stroke-green-500"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: `$${(marketData as any[]).find((m: any) => m.symbol === 'ETH')?.price?.toLocaleString() || '2,800'}`,
      change: `${(marketData as any[]).find((m: any) => m.symbol === 'ETH')?.priceChange24h >= 0 ? '+' : ''}${(marketData as any[]).find((m: any) => m.symbol === 'ETH')?.priceChange24h?.toFixed(2) || '0.00'}%`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      chartColor: "stroke-green-500"
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: `$${(marketData as any[]).find((m: any) => m.symbol === 'ADA')?.price?.toLocaleString() || '0.50'}`,
      change: `${(marketData as any[]).find((m: any) => m.symbol === 'ADA')?.priceChange24h >= 0 ? '+' : ''}${(marketData as any[]).find((m: any) => m.symbol === 'ADA')?.priceChange24h?.toFixed(2) || '0.00'}%`,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      chartColor: "stroke-red-500"
    }
  ] : [];

  const features = [
    {
      title: "Global Crypto Trading Made Simple",
      description: "Trade crypto and fiat currencies from anywhere, anytime. All its triggers on digital currencies with the lowest fees."
    },
    {
      title: "Buy and Sell 200+ Crypto and Fiat Currencies at...",
      description: "From Bitcoin to ethereum the Phantom, USDT and Solana plus major fiat currencies including USD and CAD."
    },
    {
      title: "Pay and Withdraw Your Way",
      description: "We give you the option of selecting the digital currency to sell and your preferred method of deposit method."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50" ref={dropdownRef}>
        {/* Mobile Header */}
        <div className="md:hidden px-0 py-4 flex items-center justify-between w-full">
          <div className="flex items-center space-x-3 pl-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <div className="flex flex-col space-y-1">
                <div className="w-5 h-0.5 bg-current"></div>
                <div className="w-5 h-0.5 bg-current"></div>
                <div className="w-5 h-0.5 bg-current"></div>
              </div>
            </Button>
            <Link href="/" className="flex items-center">
              <img 
                src={chicksxLogo} 
                alt="ChicksX" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 pr-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/signin">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              <Button 
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 px-4"
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
                className="w-full justify-start text-gray-700 hover:text-gray-900 px-4"
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
                className="w-full justify-start text-gray-700 hover:text-gray-900 px-4"
                onClick={() => {
                  setShowSwapDropdown(!showSwapDropdown);
                  setShowBuyCryptoDropdown(false);
                  setShowSellCryptoDropdown(false);
                }}
              >
                Swap
              </Button>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden md:flex w-full px-6 py-4 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <img 
                src={chicksxLogo} 
                alt="ChicksX" 
                className="h-8 w-auto"
              />
            </Link>
            <nav className="flex items-center space-x-6">
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
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                    Dashboard
                  </Button>
                </Link>
                <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="text-gray-700 hover:text-gray-900 font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Buy Crypto Dropdown */}
        {showBuyCryptoDropdown && (
          <div className="bg-white border-t border-gray-200 shadow-lg">
            <div className="w-full px-4 md:px-4 lg:px-6 py-6 sm:py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Buy Crypto</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {/* Crypto Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search for a crypto to buy"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                      value={buyCryptoSearch}
                      onChange={(e) => setBuyCryptoSearch(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a cryptocurrency to buy</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full" style={{width: '100%'}}>
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                      {filteredCryptos.map((crypto) => (
                        <CryptoBadge 
                          key={crypto.symbol}
                          symbol={crypto.symbol} 
                          name={crypto.name} 
                          color={crypto.color} 
                          icon={crypto.icon} 
                        />
                      ))}
                      {filteredCryptos.length === 0 && buyCryptoSearch && (
                        <div className="text-gray-500 px-4 py-2">No cryptocurrencies found</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Payment Method Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search a payment method"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                      value={paymentMethodSearch}
                      onChange={(e) => setPaymentMethodSearch(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">How do you want to pay?</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                      {filteredPaymentMethods.map((method) => (
                        <div key={method.name} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className={`w-6 h-6 ${method.color} rounded flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{method.icon}</span>
                          </div>
                          <span className="text-sm font-medium text-black">{method.name}</span>
                        </div>
                      ))}
                      {filteredPaymentMethods.length === 0 && paymentMethodSearch && (
                        <div className="text-gray-500 px-4 py-2">No payment methods found</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sell Crypto Dropdown */}
        {showSellCryptoDropdown && (
          <div className="bg-white border-t border-gray-200 shadow-lg">
            <div className="w-full px-4 md:px-4 lg:px-6 py-6 sm:py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Sell Crypto</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {/* Crypto Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search for a crypto to sell"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                      value={sellCryptoSearch}
                      onChange={(e) => setSellCryptoSearch(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a cryptocurrency to sell</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full" style={{width: '100%'}}>
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                      {filteredSellCryptos.map((crypto) => (
                        <CryptoBadge 
                          key={crypto.symbol}
                          symbol={crypto.symbol} 
                          name={crypto.name} 
                          color={crypto.color} 
                          icon={crypto.icon} 
                          action="sell" 
                        />
                      ))}
                      {filteredSellCryptos.length === 0 && sellCryptoSearch && (
                        <div className="text-gray-500 px-4 py-2">No cryptocurrencies found</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Payment Method Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search a payment method"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                      value={paymentMethodSearch}
                      onChange={(e) => setPaymentMethodSearch(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">How do you want to receive payment?</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-black">SWIFT Bank Transfer</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Ξ</span>
                        </div>
                        <span className="text-sm font-medium text-black">EFT</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-yellow-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">W</span>
                        </div>
                        <span className="text-sm font-medium text-black">Western Union</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Swap Dropdown */}
        {showSwapDropdown && (
          <div className="bg-white border-t border-gray-200 shadow-lg">
            <div className="w-full px-4 md:px-4 lg:px-6 py-6 sm:py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Swap</h3>
              
              {/* Tabs */}
              <div className="flex space-x-2 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${
                    swapActiveTab === 'Fiat' 
                      ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => setSwapActiveTab('Fiat')}
                >
                  Fiat
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${
                    swapActiveTab === 'Crypto' 
                      ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => setSwapActiveTab('Crypto')}
                >
                  Crypto
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                {/* From Currency Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Select a fiat currency to exchange"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                      value={swapCryptoSearch}
                      onChange={(e) => setSwapCryptoSearch(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a fiat currency to swap</p>
                  
                  {swapActiveTab === 'Fiat' ? (
                    <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                      <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                        <FiatBadge symbol="INR" name="Indian Rupee" color="bg-orange-500" icon="IN" action="swap" />
                        <FiatBadge symbol="USD" name="US Dollar" color="bg-blue-600" icon="US" action="swap" />
                        <FiatBadge symbol="CAD" name="Canadian Dollar" color="bg-red-500" icon="CA" action="swap" />
                        <FiatBadge symbol="EUR" name="Euro" color="bg-blue-800" icon="EU" action="swap" />
                        <FiatBadge symbol="AUD" name="Australian Dollar" color="bg-green-600" icon="AU" action="swap" />
                        <FiatBadge symbol="GBP" name="British Pound" color="bg-purple-600" icon="GB" action="swap" />
                        <FiatBadge symbol="JPY" name="Japanese Yen" color="bg-red-600" icon="JP" action="swap" />
                        <FiatBadge symbol="CHF" name="Swiss Franc" color="bg-gray-600" icon="CH" action="swap" />
                        <FiatBadge symbol="NOK" name="Norwegian Krone" color="bg-blue-700" icon="NO" action="swap" />
                        <FiatBadge symbol="SEK" name="Swedish Krona" color="bg-yellow-500" icon="SE" action="swap" />
                        <FiatBadge symbol="DKK" name="Danish Krone" color="bg-red-700" icon="DK" action="swap" />
                        <FiatBadge symbol="NZD" name="New Zealand Dollar" color="bg-blue-500" icon="NZ" action="swap" />
                        <FiatBadge symbol="ZAR" name="South African Rand" color="bg-green-700" icon="ZA" action="swap" />
                        <FiatBadge symbol="BRL" name="Brazilian Real" color="bg-green-800" icon="BR" action="swap" />
                        <FiatBadge symbol="MXN" name="Mexican Peso" color="bg-green-600" icon="MX" action="swap" />
                        <FiatBadge symbol="SGD" name="Singapore Dollar" color="bg-red-800" icon="SG" action="swap" />
                        <FiatBadge symbol="HKD" name="Hong Kong Dollar" color="bg-blue-900" icon="HK" action="swap" />
                        <FiatBadge symbol="KRW" name="South Korean Won" color="bg-slate-600" icon="KR" action="swap" />
                        <FiatBadge symbol="CNY" name="Chinese Yuan" color="bg-red-600" icon="CN" action="swap" />
                        <FiatBadge symbol="RUB" name="Russian Ruble" color="bg-blue-700" icon="RU" action="swap" />
                        <FiatBadge symbol="AED" name="UAE Dirham" color="bg-emerald-600" icon="AE" action="swap" />
                        <FiatBadge symbol="SAR" name="Saudi Riyal" color="bg-green-500" icon="SA" action="swap" />
                        <FiatBadge symbol="TRY" name="Turkish Lira" color="bg-red-500" icon="TR" action="swap" />
                        <FiatBadge symbol="PLN" name="Polish Zloty" color="bg-red-600" icon="PL" action="swap" />
                        <FiatBadge symbol="THB" name="Thai Baht" color="bg-blue-600" icon="TH" action="swap" />
                        <FiatBadge symbol="MYR" name="Malaysian Ringgit" color="bg-yellow-600" icon="MY" action="swap" />
                        <FiatBadge symbol="IDR" name="Indonesian Rupiah" color="bg-orange-600" icon="ID" action="swap" />
                        <FiatBadge symbol="PHP" name="Philippine Peso" color="bg-indigo-600" icon="PH" action="swap" />
                        <FiatBadge symbol="VND" name="Vietnamese Dong" color="bg-red-700" icon="VN" action="swap" />
                        <FiatBadge symbol="EGP" name="Egyptian Pound" color="bg-yellow-700" icon="EG" action="swap" />
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                      <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                        <CryptoBadge symbol="BTC" name="Bitcoin" color="bg-orange-500" icon="₿" action="swap" />
                        <CryptoBadge symbol="ETH" name="Ethereum" color="bg-blue-500" icon="Ξ" action="swap" />
                        <CryptoBadge symbol="USDT" name="Tether" color="bg-green-500" icon="T" action="swap" />
                        <CryptoBadge symbol="BNB" name="BNB" color="bg-yellow-600" icon="₿" action="swap" />
                        <CryptoBadge symbol="ADA" name="Cardano" color="bg-red-500" icon="A" action="swap" />
                        <CryptoBadge symbol="SOL" name="Solana" color="bg-purple-600" icon="S" action="swap" />
                        <CryptoBadge symbol="XRP" name="Ripple" color="bg-blue-700" icon="X" action="swap" />
                        <CryptoBadge symbol="DOGE" name="Dogecoin" color="bg-yellow-700" icon="D" action="swap" />
                        <CryptoBadge symbol="AVAX" name="Avalanche" color="bg-teal-600" icon="A" action="swap" />
                        <CryptoBadge symbol="MATIC" name="Polygon" color="bg-indigo-600" icon="P" action="swap" />
                        <CryptoBadge symbol="DOT" name="Polkadot" color="bg-pink-600" icon="D" action="swap" />
                        <CryptoBadge symbol="LTC" name="Litecoin" color="bg-gray-500" icon="L" action="swap" />
                        <CryptoBadge symbol="UNI" name="Uniswap" color="bg-purple-700" icon="U" action="swap" />
                        <CryptoBadge symbol="LINK" name="Chainlink" color="bg-blue-800" icon="L" action="swap" />
                        <CryptoBadge symbol="ATOM" name="Cosmos" color="bg-orange-600" icon="A" action="swap" />
                        <CryptoBadge symbol="ALGO" name="Algorand" color="bg-cyan-600" icon="A" action="swap" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* To Currency Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Select a fiat currency to proceed"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a fiat currency to swap</p>
                  
                  {swapActiveTab === 'Fiat' ? (
                    <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                      <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                        <FiatBadge symbol="INR" name="Indian Rupee" color="bg-orange-500" icon="IN" action="swap" />
                        <FiatBadge symbol="USD" name="US Dollar" color="bg-blue-600" icon="US" action="swap" />
                        <FiatBadge symbol="CAD" name="Canadian Dollar" color="bg-red-500" icon="CA" action="swap" />
                        <FiatBadge symbol="EUR" name="Euro" color="bg-blue-800" icon="EU" action="swap" />
                        <FiatBadge symbol="AUD" name="Australian Dollar" color="bg-green-600" icon="AU" action="swap" />
                        <FiatBadge symbol="GBP" name="British Pound" color="bg-purple-600" icon="GB" action="swap" />
                        <FiatBadge symbol="JPY" name="Japanese Yen" color="bg-red-600" icon="JP" action="swap" />
                        <FiatBadge symbol="CHF" name="Swiss Franc" color="bg-gray-600" icon="CH" action="swap" />
                        <FiatBadge symbol="NOK" name="Norwegian Krone" color="bg-blue-700" icon="NO" action="swap" />
                        <FiatBadge symbol="SEK" name="Swedish Krona" color="bg-yellow-500" icon="SE" action="swap" />
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                      <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                        <CryptoBadge symbol="BTC" name="Bitcoin" color="bg-orange-500" icon="₿" action="swap" />
                        <CryptoBadge symbol="ETH" name="Ethereum" color="bg-blue-500" icon="Ξ" action="swap" />
                        <CryptoBadge symbol="USDT" name="Tether" color="bg-green-500" icon="T" action="swap" />
                        <CryptoBadge symbol="BNB" name="BNB" color="bg-yellow-600" icon="₿" action="swap" />
                        <CryptoBadge symbol="ADA" name="Cardano" color="bg-red-500" icon="A" action="swap" />
                        <CryptoBadge symbol="SOL" name="Solana" color="bg-purple-600" icon="S" action="swap" />
                        <CryptoBadge symbol="XRP" name="Ripple" color="bg-blue-700" icon="X" action="swap" />
                        <CryptoBadge symbol="DOGE" name="Dogecoin" color="bg-yellow-700" icon="D" action="swap" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Rest of the component remains the same */}
      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trade Crypto and Fiat with Confidence
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Buy, sell, and swap 200+ cryptocurrencies and fiat currencies with the lowest fees.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trade">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                Start Trading
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-lg text-lg font-semibold">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Trending Cryptocurrencies */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Cryptocurrencies</h2>
            <p className="text-lg text-gray-600">Track the latest price movements of popular digital assets</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCryptos.map((crypto) => (
              <Card key={crypto.symbol} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{crypto.name}</h3>
                      <p className="text-gray-500">{crypto.symbol}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${crypto.bgColor} ${crypto.color}`}>
                      {crypto.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-4">{crypto.price}</div>
                  <div className="h-20 bg-gray-50 rounded-lg flex items-center justify-center">
                    <svg width="80" height="40" viewBox="0 0 80 40">
                      <path
                        d="M5,35 Q20,5 40,20 T75,10"
                        fill="none"
                        className={crypto.chartColor}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ChicksX?</h2>
            <p className="text-lg text-gray-600">Experience the future of digital finance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {index === 0 && <Star className="w-8 h-8 text-purple-600" />}
                  {index === 1 && <Shield className="w-8 h-8 text-purple-600" />}
                  {index === 2 && <Headphones className="w-8 h-8 text-purple-600" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trade on the Go with Our Mobile App
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Access your portfolio, make trades, and stay updated with market movements from anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black text-white px-6 py-3 rounded-lg">
                  Download for iOS
                </Button>
                <Button variant="outline" className="border-gray-300 px-6 py-3 rounded-lg">
                  Download for Android
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={mobileAppImage} 
                alt="Mobile App" 
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img 
                src={chicksxLogo} 
                alt="ChicksX" 
                className="h-8 w-auto mb-4 filter brightness-0 invert"
              />
              <p className="text-gray-400 mb-4">
                The most trusted cryptocurrency exchange platform.
              </p>
              <div className="flex space-x-4">
                <FaTwitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <FaFacebookF className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <FaDiscord className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Buy Crypto</a></li>
                <li><a href="#" className="hover:text-white">Sell Crypto</a></li>
                <li><a href="#" className="hover:text-white">Swap</a></li>
                <li><a href="#" className="hover:text-white">Portfolio</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ChicksX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}