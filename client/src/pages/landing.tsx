import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation } from "wouter";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";

export default function Landing() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [showBuyCryptoDropdown, setShowBuyCryptoDropdown] = useState(false);
  const [showSellCryptoDropdown, setShowSellCryptoDropdown] = useState(false);
  const [showSwapDropdown, setShowSwapDropdown] = useState(false);
  const [buyCryptoSearch, setBuyCryptoSearch] = useState("");
  const [sellCryptoSearch, setSellCryptoSearch] = useState("");
  const [swapCryptoSearch, setSwapCryptoSearch] = useState("");
  const [sellActiveTab, setSellActiveTab] = useState('Crypto');
  const [swapActiveTab, setSwapActiveTab] = useState('Fiat');

  const buyCryptoRef = useRef<HTMLDivElement>(null);
  const sellCryptoRef = useRef<HTMLDivElement>(null);
  const swapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buyCryptoRef.current && !buyCryptoRef.current.contains(event.target as Node)) {
        setShowBuyCryptoDropdown(false);
      }
      if (sellCryptoRef.current && !sellCryptoRef.current.contains(event.target as Node)) {
        setShowSellCryptoDropdown(false);
      }
      if (swapRef.current && !swapRef.current.contains(event.target as Node)) {
        setShowSwapDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Helper function to create clickable currency badge
  const CurrencyBadge = ({ code, name, color, icon }: { code: string, name: string, color: string, icon: string }) => (
    <div 
      className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={() => setLocation('/trade')}
    >
      <div className={`w-6 h-6 ${color} rounded-full flex items-center justify-center`}>
        <span className="text-white text-xs font-bold">{icon}</span>
      </div>
      <span className="text-sm font-medium text-black">{code}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Navigation Bar with Dropdowns */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <div className="relative" ref={buyCryptoRef}>
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
              <div className="relative" ref={sellCryptoRef}>
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
              <div className="relative" ref={swapRef}>
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
            </div>
          </div>
        </div>
      </nav>

      {/* Buy Crypto Dropdown */}
      {showBuyCryptoDropdown && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="w-full px-4 md:px-4 lg:px-6 py-6 sm:py-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Buy Crypto</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Crypto Selection */}
              <div>
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="Search cryptocurrencies"
                    className="w-full px-4 py-3 rounded-lg crypto-search-input"
                    value={buyCryptoSearch}
                    onChange={(e) => setBuyCryptoSearch(e.target.value)}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Choose a cryptocurrency to buy</p>
                
                <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                  <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                    <CryptoBadge symbol="BTC" name="Bitcoin" color="bg-orange-500" icon="₿" />
                    <CryptoBadge symbol="ETH" name="Ethereum" color="bg-blue-500" icon="Ξ" />
                    <CryptoBadge symbol="USDT" name="Tether" color="bg-green-500" icon="T" />
                    <CryptoBadge symbol="BNB" name="BNB" color="bg-yellow-600" icon="₿" />
                    <CryptoBadge symbol="ADA" name="Cardano" color="bg-red-500" icon="A" />
                    <CryptoBadge symbol="SOL" name="Solana" color="bg-purple-600" icon="S" />
                    <CryptoBadge symbol="XRP" name="Ripple" color="bg-blue-700" icon="X" />
                    <CryptoBadge symbol="DOGE" name="Dogecoin" color="bg-yellow-700" icon="D" />
                    <CryptoBadge symbol="AVAX" name="Avalanche" color="bg-teal-600" icon="A" />
                    <CryptoBadge symbol="MATIC" name="Polygon" color="bg-indigo-600" icon="P" />
                    <CryptoBadge symbol="DOT" name="Polkadot" color="bg-pink-600" icon="D" />
                    <CryptoBadge symbol="LTC" name="Litecoin" color="bg-gray-500" icon="L" />
                  </div>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div>
                <p className="text-sm text-gray-600 mb-4">Choose your payment method</p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setLocation('/checkout')}>
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">💳</span>
                    </div>
                    <span className="text-sm font-medium text-black">Credit/Debit Card</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setLocation('/checkout')}>
                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                    <span className="text-sm font-medium text-black">Bank Transfer</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setLocation('/checkout')}>
                    <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-sm font-medium text-black">PayPal</span>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <CurrencyBadge code="INR" name="Indian Rupee" color="bg-orange-500" icon="IN" />
                      <CurrencyBadge code="USD" name="US Dollar" color="bg-blue-600" icon="US" />
                      <CurrencyBadge code="CAD" name="Canadian Dollar" color="bg-red-500" icon="CA" />
                      <CurrencyBadge code="EUR" name="Euro" color="bg-blue-800" icon="EU" />
                      <CurrencyBadge code="AUD" name="Australian Dollar" color="bg-green-600" icon="AU" />
                      <CurrencyBadge code="GBP" name="British Pound" color="bg-purple-600" icon="GB" />
                      <CurrencyBadge code="JPY" name="Japanese Yen" color="bg-red-600" icon="JP" />
                      <CurrencyBadge code="CHF" name="Swiss Franc" color="bg-gray-600" icon="CH" />
                      <CurrencyBadge code="NOK" name="Norwegian Krone" color="bg-blue-700" icon="NO" />
                      <CurrencyBadge code="SEK" name="Swedish Krona" color="bg-yellow-500" icon="SE" />
                      <CurrencyBadge code="DKK" name="Danish Krone" color="bg-red-700" icon="DK" />
                      <CurrencyBadge code="NZD" name="New Zealand Dollar" color="bg-blue-500" icon="NZ" />
                      <CurrencyBadge code="ZAR" name="South African Rand" color="bg-green-700" icon="ZA" />
                      <CurrencyBadge code="BRL" name="Brazilian Real" color="bg-green-800" icon="BR" />
                      <CurrencyBadge code="MXN" name="Mexican Peso" color="bg-green-600" icon="MX" />
                      <CurrencyBadge code="SGD" name="Singapore Dollar" color="bg-red-800" icon="SG" />
                      <CurrencyBadge code="HKD" name="Hong Kong Dollar" color="bg-blue-900" icon="HK" />
                      <CurrencyBadge code="KRW" name="Korean Won" color="bg-slate-600" icon="KR" />
                      <CurrencyBadge code="CNY" name="Chinese Yuan" color="bg-red-600" icon="CN" />
                      <CurrencyBadge code="RUB" name="Russian Ruble" color="bg-blue-700" icon="RU" />
                      <CurrencyBadge code="AED" name="UAE Dirham" color="bg-emerald-600" icon="AE" />
                      <CurrencyBadge code="SAR" name="Saudi Riyal" color="bg-green-500" icon="SA" />
                      <CurrencyBadge code="TRY" name="Turkish Lira" color="bg-red-500" icon="TR" />
                      <CurrencyBadge code="PLN" name="Polish Zloty" color="bg-red-600" icon="PL" />
                      <CurrencyBadge code="THB" name="Thai Baht" color="bg-blue-600" icon="TH" />
                      <CurrencyBadge code="MYR" name="Malaysian Ringgit" color="bg-yellow-600" icon="MY" />
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
                      <CurrencyBadge code="INR" name="Indian Rupee" color="bg-orange-500" icon="IN" />
                      <CurrencyBadge code="USD" name="US Dollar" color="bg-blue-600" icon="US" />
                      <CurrencyBadge code="CAD" name="Canadian Dollar" color="bg-red-500" icon="CA" />
                      <CurrencyBadge code="EUR" name="Euro" color="bg-blue-800" icon="EU" />
                      <CurrencyBadge code="AUD" name="Australian Dollar" color="bg-green-600" icon="AU" />
                      <CurrencyBadge code="GBP" name="British Pound" color="bg-purple-600" icon="GB" />
                      <CurrencyBadge code="JPY" name="Japanese Yen" color="bg-red-600" icon="JP" />
                      <CurrencyBadge code="CHF" name="Swiss Franc" color="bg-gray-600" icon="CH" />
                      <CurrencyBadge code="NOK" name="Norwegian Krone" color="bg-blue-700" icon="NO" />
                      <CurrencyBadge code="SEK" name="Swedish Krona" color="bg-yellow-500" icon="SE" />
                      <CurrencyBadge code="DKK" name="Danish Krone" color="bg-red-700" icon="DK" />
                      <CurrencyBadge code="NZD" name="New Zealand Dollar" color="bg-blue-500" icon="NZ" />
                      <CurrencyBadge code="ZAR" name="South African Rand" color="bg-green-700" icon="ZA" />
                      <CurrencyBadge code="BRL" name="Brazilian Real" color="bg-green-800" icon="BR" />
                      <CurrencyBadge code="MXN" name="Mexican Peso" color="bg-green-600" icon="MX" />
                      <CurrencyBadge code="SGD" name="Singapore Dollar" color="bg-red-800" icon="SG" />
                      <CurrencyBadge code="HKD" name="Hong Kong Dollar" color="bg-blue-900" icon="HK" />
                      <CurrencyBadge code="KRW" name="Korean Won" color="bg-slate-600" icon="KR" />
                      <CurrencyBadge code="CNY" name="Chinese Yuan" color="bg-red-600" icon="CN" />
                      <CurrencyBadge code="RUB" name="Russian Ruble" color="bg-blue-700" icon="RU" />
                      <CurrencyBadge code="AED" name="UAE Dirham" color="bg-emerald-600" icon="AE" />
                      <CurrencyBadge code="SAR" name="Saudi Riyal" color="bg-green-500" icon="SA" />
                      <CurrencyBadge code="TRY" name="Turkish Lira" color="bg-red-500" icon="TR" />
                      <CurrencyBadge code="PLN" name="Polish Zloty" color="bg-red-600" icon="PL" />
                      <CurrencyBadge code="THB" name="Thai Baht" color="bg-blue-600" icon="TH" />
                      <CurrencyBadge code="MYR" name="Malaysian Ringgit" color="bg-yellow-600" icon="MY" />
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 to-blue-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Trade Cryptocurrency with Confidence
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Buy, sell, and swap digital currencies with our secure, user-friendly platform. Join millions of traders worldwide.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                onClick={() => setLocation('/trade')}
                className="rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Start Trading
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation('/markets')}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                View Markets <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-600">Trade Smarter</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to trade crypto
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides all the tools and features you need for successful cryptocurrency trading.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <span className="text-white font-bold">₿</span>
                  </div>
                  Secure Trading
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Bank-level security with multi-layer protection for your assets and personal information.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <span className="text-white font-bold">📊</span>
                  </div>
                  Real-time Data
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Live market data and advanced charts to help you make informed trading decisions.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <span className="text-white font-bold">💳</span>
                  </div>
                  Easy Payments
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Multiple payment options including credit cards, bank transfers, and digital wallets.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <span className="text-white font-bold">🔄</span>
                  </div>
                  Instant Swaps
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Swap between cryptocurrencies and fiat currencies instantly with competitive rates.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}