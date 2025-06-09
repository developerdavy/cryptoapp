import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, Headphones } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";
import mobileAppImage from "@assets/fd7028f1b02c88789f6f (1)_1749112747335.png";

export default function Landing() {
  const [showBuyCryptoDropdown, setShowBuyCryptoDropdown] = useState(false);
  const [showSellCryptoDropdown, setShowSellCryptoDropdown] = useState(false);
  const [showSwapDropdown, setShowSwapDropdown] = useState(false);
  const [swapActiveTab, setSwapActiveTab] = useState('Fiat');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

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
  const cryptoCards = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$134,849.23",
      change: "+5.31%",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      chartColor: "stroke-yellow-500"
    },
    {
      name: "Ethereum", 
      symbol: "ETH",
      price: "$2,604.19",
      change: "-1.48%",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      chartColor: "stroke-blue-500"
    },
    {
      name: "Bitcoin",
      symbol: "BTC", 
      price: "$132.09",
      change: "+2.00%",
      color: "text-gray-600",
      bgColor: "bg-gray-500/10",
      chartColor: "stroke-gray-500"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$0.58",
      change: "+3.21%",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10", 
      chartColor: "stroke-purple-500"
    }
  ];

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
      <header className="bg-white border-b border-gray-200" ref={dropdownRef}>
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <img src={chicksxLogo} alt="ChicksX" className="h-10" />
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
          <Button className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Sign In</span>
          </Button>
        </div>
        
        {/* Buy Crypto Dropdown */}
        {showBuyCryptoDropdown && (
          <div className="bg-white border-t border-gray-200 shadow-lg">
            <div className="w-full px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Buy Crypto</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {/* Cryptocurrency Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Select a cryptocurrency to buy"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a cryptocurrency to purchase</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full" style={{width: '100%'}}>
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                      <CryptoBadge symbol="BTC" name="Bitcoin" color="bg-orange-500" icon="₿" action="trade" />
                      <CryptoBadge symbol="ETH" name="Ethereum" color="bg-blue-500" icon="Ξ" action="trade" />
                      <CryptoBadge symbol="USDT" name="Tether" color="bg-green-500" icon="T" action="trade" />
                      <CryptoBadge symbol="BNB" name="Binance Coin" color="bg-yellow-600" icon="B" action="trade" />
                      <CryptoBadge symbol="ADA" name="Cardano" color="bg-red-500" icon="A" action="trade" />
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-black">SOL</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">X</span>
                        </div>
                        <span className="text-sm font-medium text-black">XRP</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">D</span>
                        </div>
                        <span className="text-sm font-medium text-black">DOGE</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">AVAX</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <span className="text-sm font-medium text-black">MATIC</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">D</span>
                        </div>
                        <span className="text-sm font-medium text-black">DOT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <span className="text-sm font-medium text-black">LTC</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">U</span>
                        </div>
                        <span className="text-sm font-medium text-black">UNI</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <span className="text-sm font-medium text-black">LINK</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">ATOM</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">ALGO</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">I</span>
                        </div>
                        <span className="text-sm font-medium text-black">ICP</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">F</span>
                        </div>
                        <span className="text-sm font-medium text-black">FTT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">APE</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">N</span>
                        </div>
                        <span className="text-sm font-medium text-black">NEAR</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="text-sm font-medium text-black">MANA</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-black">SAND</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-indigo-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <span className="text-sm font-medium text-black">CRO</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-orange-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">H</span>
                        </div>
                        <span className="text-sm font-medium text-black">HBAR</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-purple-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">T</span>
                        </div>
                        <span className="text-sm font-medium text-black">THETA</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">F</span>
                        </div>
                        <span className="text-sm font-medium text-black">FLOW</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Ξ</span>
                        </div>
                        <span className="text-sm font-medium text-black">EGLD</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-indigo-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">X</span>
                        </div>
                        <span className="text-sm font-medium text-black">XTZ</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-cyan-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span className="text-sm font-medium text-black">GRT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-emerald-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <span className="text-sm font-medium text-black">1INCH</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search a payment method to proceed"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a payment method to proceed</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full">
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content'}}>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">💳</span>
                        </div>
                        <span className="text-sm font-medium text-black">Debit/Credit</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span className="text-sm font-medium text-black">Google Pay</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">Apple Pay</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">I</span>
                        </div>
                        <span className="text-sm font-medium text-black">Interac</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-black">SEPA</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <span className="text-sm font-medium text-black">PayPal</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">W</span>
                        </div>
                        <span className="text-sm font-medium text-black">Wire Transfer</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <span className="text-sm font-medium text-black">Bank Transfer</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">V</span>
                        </div>
                        <span className="text-sm font-medium text-black">Visa</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="text-sm font-medium text-black">Mastercard</span>
                      </div>
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
            <div className="w-full px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Sell Crypto</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {/* Cryptocurrency Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Select a cryptocurrency to sell"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a cryptocurrency to sell</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full" style={{width: '100%'}}>
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">₿</span>
                        </div>
                        <span className="text-sm font-medium text-black">BTC</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Ξ</span>
                        </div>
                        <span className="text-sm font-medium text-black">ETH</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">T</span>
                        </div>
                        <span className="text-sm font-medium text-black">USDT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">₿</span>
                        </div>
                        <span className="text-sm font-medium text-black">BNB</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">ADA</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-black">SOL</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">X</span>
                        </div>
                        <span className="text-sm font-medium text-black">XRP</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">D</span>
                        </div>
                        <span className="text-sm font-medium text-black">DOGE</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">AVAX</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <span className="text-sm font-medium text-black">MATIC</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">D</span>
                        </div>
                        <span className="text-sm font-medium text-black">DOT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <span className="text-sm font-medium text-black">LTC</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">U</span>
                        </div>
                        <span className="text-sm font-medium text-black">UNI</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <span className="text-sm font-medium text-black">LINK</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">ATOM</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">ALGO</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">I</span>
                        </div>
                        <span className="text-sm font-medium text-black">ICP</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">F</span>
                        </div>
                        <span className="text-sm font-medium text-black">FTT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">APE</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">N</span>
                        </div>
                        <span className="text-sm font-medium text-black">NEAR</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="text-sm font-medium text-black">MANA</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-black">SAND</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-indigo-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <span className="text-sm font-medium text-black">CRO</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-orange-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">H</span>
                        </div>
                        <span className="text-sm font-medium text-black">HBAR</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-purple-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">T</span>
                        </div>
                        <span className="text-sm font-medium text-black">THETA</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">F</span>
                        </div>
                        <span className="text-sm font-medium text-black">FLOW</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Ξ</span>
                        </div>
                        <span className="text-sm font-medium text-black">EGLD</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-indigo-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">X</span>
                        </div>
                        <span className="text-sm font-medium text-black">XTZ</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-cyan-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span className="text-sm font-medium text-black">GRT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-emerald-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <span className="text-sm font-medium text-black">1INCH</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <span className="text-sm font-medium text-black">CAKE</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-lime-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">E</span>
                        </div>
                        <span className="text-sm font-medium text-black">ENJ</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-black">AAVE</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-violet-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <span className="text-sm font-medium text-black">COMP</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="text-sm font-medium text-black">MKR</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-fuchsia-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-black">SNX</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-stone-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Y</span>
                        </div>
                        <span className="text-sm font-medium text-black">YFI</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <span className="text-sm font-medium text-black">BAT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-neutral-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Z</span>
                        </div>
                        <span className="text-sm font-medium text-black">ZRX</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-pink-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">K</span>
                        </div>
                        <span className="text-sm font-medium text-black">KNC</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                        <span className="text-sm font-medium text-black">REN</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <span className="text-sm font-medium text-black">LRC</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-green-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <span className="text-sm font-medium text-black">BAND</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-yellow-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                        <span className="text-sm font-medium text-black">SUSHI</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-orange-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <span className="text-sm font-medium text-black">CEL</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-teal-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">O</span>
                        </div>
                        <span className="text-sm font-medium text-black">OMG</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Q</span>
                        </div>
                        <span className="text-sm font-medium text-black">QNT</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-emerald-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">F</span>
                        </div>
                        <span className="text-sm font-medium text-black">FTM</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                        <div className="w-6 h-6 bg-rose-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <span className="text-sm font-medium text-black">CHZ</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search a payment method to proceed"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a payment method to proceed</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">I</span>
                      </div>
                      <span className="text-sm font-medium text-black">Interac E-Transfer</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <div className="w-6 h-6 bg-blue-800 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">S</span>
                      </div>
                      <span className="text-sm font-medium text-black">SEPA</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">S</span>
                      </div>
                      <span className="text-sm font-medium text-black">SWIFT Bank Transfer</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Ξ</span>
                      </div>
                      <span className="text-sm font-medium text-black">EFT</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
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
        )}
        
        {/* Swap Dropdown */}
        {showSwapDropdown && (
          <div className="bg-white border-t border-gray-200 shadow-lg">
            <div className="w-full px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Swap</h3>
              
              {/* Tabs */}
              <div className="flex space-x-4 mb-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a fiat currency to swap</p>
                  
                  {swapActiveTab === 'Fiat' ? (
                    <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                      <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">IN</span>
                          </div>
                          <span className="text-sm font-medium text-black">INR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">US</span>
                          </div>
                          <span className="text-sm font-medium text-black">USD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">CA</span>
                          </div>
                          <span className="text-sm font-medium text-black">CAD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">EU</span>
                          </div>
                          <span className="text-sm font-medium text-black">EUR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">AU</span>
                          </div>
                          <span className="text-sm font-medium text-black">AUD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">GB</span>
                          </div>
                          <span className="text-sm font-medium text-black">GBP</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">JP</span>
                          </div>
                          <span className="text-sm font-medium text-black">JPY</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">CH</span>
                          </div>
                          <span className="text-sm font-medium text-black">CHF</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">NO</span>
                          </div>
                          <span className="text-sm font-medium text-black">NOK</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">SE</span>
                          </div>
                          <span className="text-sm font-medium text-black">SEK</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">DK</span>
                          </div>
                          <span className="text-sm font-medium text-black">DKK</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">NZ</span>
                          </div>
                          <span className="text-sm font-medium text-black">NZD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">ZA</span>
                          </div>
                          <span className="text-sm font-medium text-black">ZAR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">BR</span>
                          </div>
                          <span className="text-sm font-medium text-black">BRL</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">MX</span>
                          </div>
                          <span className="text-sm font-medium text-black">MXN</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">SG</span>
                          </div>
                          <span className="text-sm font-medium text-black">SGD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">HK</span>
                          </div>
                          <span className="text-sm font-medium text-black">HKD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">KR</span>
                          </div>
                          <span className="text-sm font-medium text-black">KRW</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">CN</span>
                          </div>
                          <span className="text-sm font-medium text-black">CNY</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">RU</span>
                          </div>
                          <span className="text-sm font-medium text-black">RUB</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">AE</span>
                          </div>
                          <span className="text-sm font-medium text-black">AED</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">SA</span>
                          </div>
                          <span className="text-sm font-medium text-black">SAR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">TR</span>
                          </div>
                          <span className="text-sm font-medium text-black">TRY</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PL</span>
                          </div>
                          <span className="text-sm font-medium text-black">PLN</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">TH</span>
                          </div>
                          <span className="text-sm font-medium text-black">THB</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">MY</span>
                          </div>
                          <span className="text-sm font-medium text-black">MYR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">ID</span>
                          </div>
                          <span className="text-sm font-medium text-black">IDR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PH</span>
                          </div>
                          <span className="text-sm font-medium text-black">PHP</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">VN</span>
                          </div>
                          <span className="text-sm font-medium text-black">VND</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">EG</span>
                          </div>
                          <span className="text-sm font-medium text-black">EGP</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                      <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">₿</span>
                          </div>
                          <span className="text-sm font-medium text-black">BTC</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Ξ</span>
                          </div>
                          <span className="text-sm font-medium text-black">ETH</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">T</span>
                          </div>
                          <span className="text-sm font-medium text-black">USDT</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">₿</span>
                          </div>
                          <span className="text-sm font-medium text-black">BNB</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">ADA</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">S</span>
                          </div>
                          <span className="text-sm font-medium text-black">SOL</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">X</span>
                          </div>
                          <span className="text-sm font-medium text-black">XRP</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">D</span>
                          </div>
                          <span className="text-sm font-medium text-black">DOGE</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">AVAX</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">P</span>
                          </div>
                          <span className="text-sm font-medium text-black">MATIC</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">D</span>
                          </div>
                          <span className="text-sm font-medium text-black">DOT</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                          </div>
                          <span className="text-sm font-medium text-black">LTC</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">U</span>
                          </div>
                          <span className="text-sm font-medium text-black">UNI</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                          </div>
                          <span className="text-sm font-medium text-black">LINK</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">ATOM</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">ALGO</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">I</span>
                          </div>
                          <span className="text-sm font-medium text-black">ICP</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">F</span>
                          </div>
                          <span className="text-sm font-medium text-black">FTT</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">APE</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">N</span>
                          </div>
                          <span className="text-sm font-medium text-black">NEAR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">M</span>
                          </div>
                          <span className="text-sm font-medium text-black">MANA</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">S</span>
                          </div>
                          <span className="text-sm font-medium text-black">SAND</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-indigo-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">C</span>
                          </div>
                          <span className="text-sm font-medium text-black">CRO</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">H</span>
                          </div>
                          <span className="text-sm font-medium text-black">HBAR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-purple-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">T</span>
                          </div>
                          <span className="text-sm font-medium text-black">THETA</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">F</span>
                          </div>
                          <span className="text-sm font-medium text-black">FLOW</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Ξ</span>
                          </div>
                          <span className="text-sm font-medium text-black">EGLD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-indigo-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">X</span>
                          </div>
                          <span className="text-sm font-medium text-black">XTZ</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-cyan-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">G</span>
                          </div>
                          <span className="text-sm font-medium text-black">GRT</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-emerald-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <span className="text-sm font-medium text-black">1INCH</span>
                        </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a fiat currency to swap</p>
                  
                  {swapActiveTab === 'Fiat' ? (
                    <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                      <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">IN</span>
                          </div>
                          <span className="text-sm font-medium text-black">INR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">US</span>
                          </div>
                          <span className="text-sm font-medium text-black">USD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">CA</span>
                          </div>
                          <span className="text-sm font-medium text-black">CAD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">EU</span>
                          </div>
                          <span className="text-sm font-medium text-black">EUR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">AU</span>
                          </div>
                          <span className="text-sm font-medium text-black">AUD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">GB</span>
                          </div>
                          <span className="text-sm font-medium text-black">GBP</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">JP</span>
                          </div>
                          <span className="text-sm font-medium text-black">JPY</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">CH</span>
                          </div>
                          <span className="text-sm font-medium text-black">CHF</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">NO</span>
                          </div>
                          <span className="text-sm font-medium text-black">NOK</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">SE</span>
                          </div>
                          <span className="text-sm font-medium text-black">SEK</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">DK</span>
                          </div>
                          <span className="text-sm font-medium text-black">DKK</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">NZ</span>
                          </div>
                          <span className="text-sm font-medium text-black">NZD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">ZA</span>
                          </div>
                          <span className="text-sm font-medium text-black">ZAR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">BR</span>
                          </div>
                          <span className="text-sm font-medium text-black">BRL</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">MX</span>
                          </div>
                          <span className="text-sm font-medium text-black">MXN</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">SG</span>
                          </div>
                          <span className="text-sm font-medium text-black">SGD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">HK</span>
                          </div>
                          <span className="text-sm font-medium text-black">HKD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">KR</span>
                          </div>
                          <span className="text-sm font-medium text-black">KRW</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">CN</span>
                          </div>
                          <span className="text-sm font-medium text-black">CNY</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">RU</span>
                          </div>
                          <span className="text-sm font-medium text-black">RUB</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">AE</span>
                          </div>
                          <span className="text-sm font-medium text-black">AED</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">SA</span>
                          </div>
                          <span className="text-sm font-medium text-black">SAR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">TR</span>
                          </div>
                          <span className="text-sm font-medium text-black">TRY</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PL</span>
                          </div>
                          <span className="text-sm font-medium text-black">PLN</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">TH</span>
                          </div>
                          <span className="text-sm font-medium text-black">THB</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">MY</span>
                          </div>
                          <span className="text-sm font-medium text-black">MYR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">ID</span>
                          </div>
                          <span className="text-sm font-medium text-black">IDR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PH</span>
                          </div>
                          <span className="text-sm font-medium text-black">PHP</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">VN</span>
                          </div>
                          <span className="text-sm font-medium text-black">VND</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">EG</span>
                          </div>
                          <span className="text-sm font-medium text-black">EGP</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto scrollbar-hide w-full" style={{width: "100%"}}>
                      <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">₿</span>
                          </div>
                          <span className="text-sm font-medium text-black">BTC</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Ξ</span>
                          </div>
                          <span className="text-sm font-medium text-black">ETH</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">T</span>
                          </div>
                          <span className="text-sm font-medium text-black">USDT</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">₿</span>
                          </div>
                          <span className="text-sm font-medium text-black">BNB</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">ADA</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">S</span>
                          </div>
                          <span className="text-sm font-medium text-black">SOL</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">X</span>
                          </div>
                          <span className="text-sm font-medium text-black">XRP</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">D</span>
                          </div>
                          <span className="text-sm font-medium text-black">DOGE</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">AVAX</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">P</span>
                          </div>
                          <span className="text-sm font-medium text-black">MATIC</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">D</span>
                          </div>
                          <span className="text-sm font-medium text-black">DOT</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                          </div>
                          <span className="text-sm font-medium text-black">LTC</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">U</span>
                          </div>
                          <span className="text-sm font-medium text-black">UNI</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                          </div>
                          <span className="text-sm font-medium text-black">LINK</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">ATOM</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">ALGO</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">I</span>
                          </div>
                          <span className="text-sm font-medium text-black">ICP</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">F</span>
                          </div>
                          <span className="text-sm font-medium text-black">FTT</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                          </div>
                          <span className="text-sm font-medium text-black">APE</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">N</span>
                          </div>
                          <span className="text-sm font-medium text-black">NEAR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">M</span>
                          </div>
                          <span className="text-sm font-medium text-black">MANA</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">S</span>
                          </div>
                          <span className="text-sm font-medium text-black">SAND</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-indigo-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">C</span>
                          </div>
                          <span className="text-sm font-medium text-black">CRO</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-orange-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">H</span>
                          </div>
                          <span className="text-sm font-medium text-black">HBAR</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-purple-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">T</span>
                          </div>
                          <span className="text-sm font-medium text-black">THETA</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">F</span>
                          </div>
                          <span className="text-sm font-medium text-black">FLOW</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Ξ</span>
                          </div>
                          <span className="text-sm font-medium text-black">EGLD</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-indigo-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">X</span>
                          </div>
                          <span className="text-sm font-medium text-black">XTZ</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-cyan-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">G</span>
                          </div>
                          <span className="text-sm font-medium text-black">GRT</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className="w-6 h-6 bg-emerald-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <span className="text-sm font-medium text-black">1INCH</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              The Lowest Fee<br />
              Crypto Exchange
            </h1>
            <p className="text-xl text-purple-200">
              Buy, sell, exchange bitcoin, crypto or fiat instantly in<br />
              any major city around the globe.
            </p>
            <Button className="bg-white text-purple-900 hover:bg-purple-100 px-8 py-3 text-lg font-semibold">
              Exchange Now
            </Button>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Fintrac & Fincen registered</div>
                  <Link href="#" className="text-purple-200 text-sm hover:underline">
                    Learn more →
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div>
                  <div className="font-semibold">★★★★✩ 4.4/5</div>
                  <Link href="#" className="text-purple-200 text-sm hover:underline">
                    Customers review on trustpilot.com →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={mobileAppImage} 
              alt="ChicksX Mobile App" 
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Crypto Cards Section */}
      <section className="px-6 py-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-5 gap-4">
            {/* Bitcoin Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-500 text-lg font-bold">B</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">Bitcoin</div>
                </div>
                <div className="mb-2">
                  <div className="font-bold text-lg text-gray-800">$105,571.15</div>
                  <div className="text-green-500 text-sm flex items-center">
                    ▲ 0.06%
                  </div>
                </div>
                <div className="h-10 mb-3">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path
                      d="M0,15 L20,12 L40,18 L60,8 L80,14 L100,10"
                      fill="none"
                      strokeWidth="2"
                      className="stroke-orange-500"
                    />
                  </svg>
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* Ethereum Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 text-lg font-bold">E</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">Ethereum</div>
                </div>
                <div className="mb-2">
                  <div className="font-bold text-lg text-gray-800">$2,488.31</div>
                  <div className="text-red-500 text-sm flex items-center">
                    ▼ 1.08%
                  </div>
                </div>
                <div className="h-10 mb-3">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path
                      d="M0,10 L20,15 L40,8 L60,18 L80,12 L100,20"
                      fill="none"
                      strokeWidth="2"
                      className="stroke-blue-500"
                    />
                  </svg>
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* Solana Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-lg font-bold">◎</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">Solana</div>
                </div>
                <div className="mb-2">
                  <div className="font-bold text-lg text-gray-800">$150.39</div>
                  <div className="text-green-500 text-sm flex items-center">
                    ▲ 0.66%
                  </div>
                </div>
                <div className="h-10 mb-3">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path
                      d="M0,20 L20,15 L40,22 L60,10 L80,16 L100,8"
                      fill="none"
                      strokeWidth="2"
                      className="stroke-purple-500"
                    />
                  </svg>
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* Cardano Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg font-bold">₳</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">Cardano</div>
                </div>
                <div className="mb-2">
                  <div className="font-bold text-lg text-gray-800">$0.66</div>
                  <div className="text-green-500 text-sm flex items-center">
                    ▲ 0.00%
                  </div>
                </div>
                <div className="h-10 mb-3">
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <path
                      d="M0,18 L20,12 L40,20 L60,14 L80,18 L100,16"
                      fill="none"
                      strokeWidth="2"
                      className="stroke-blue-600"
                    />
                  </svg>
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* View More Card */}
            <Card className="bg-purple-100 shadow-lg">
              <CardContent className="p-4 flex flex-col justify-center items-center text-center h-full">
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center mb-3">
                  <span className="text-purple-600 text-lg font-bold">✕</span>
                </div>
                <div className="text-purple-700 font-semibold text-sm mb-3">
                  View more than<br />300<br />cryptocurrencies<br />here
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why ChicksX Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start mb-12" style={{gap: '60px'}}>
            <div className="flex-shrink-0">
              <h2 className="text-4xl font-bold text-gray-900 whitespace-nowrap">Why ChicksX?</h2>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-lg leading-relaxed">
                We are committed to upholding the integrity, trust, and privacy of our brand in order to best serve the needs of our clients. Our top priority is to provide our customers with a secure exchange platform where all your personal data is secure and protected. By continuously validating and perfecting our security measures and protocols, we ensure to provide the safest platform possible.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Global Crypto Trading Made Simple</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                  Trade crypto and fiat currencies from anywhere, anytime. We support all digital currencies with the lowest fees.
                </p>
                <Button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded font-medium w-full">
                  Learn more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Trade 200+ Currencies at Lowest Rates</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                  From BTC to ETH, USDT, SOL plus fiat currencies like USD and CAD - we offer competitive rates on every trade.
                </p>
                <Button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded font-medium w-full">
                  Learn more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Pay and Withdraw Your Way</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                  We give you the option of selecting the digital currency to sell, and your preferred cashout or payout method.
                </p>
                <Button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded font-medium w-full">
                  Learn more
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-purple-900 to-blue-800">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold">Security</h2>
            </div>
            <p className="text-white/90 mb-8 text-lg leading-relaxed">
              Our top priority is to provide our customers with a secure exchange platform where all your personal information and data is encrypted, secure, and protected. We are dedicated to user protection with multi-step protocols and industry-leading security measures. Your data is 100% secure via end-to-end encryption, ensuring that only you have access to your personal information.
            </p>
            <Button className="bg-white/20 text-white hover:bg-white/30 px-8 py-3 rounded-lg font-medium border border-white/30">
              Learn more
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              {/* Security illustration placeholder - you can replace with actual image */}
              <div className="w-80 h-60 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-2xl"></div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/90 rounded-xl flex items-center justify-center">
                  <Shield className="w-10 h-10 text-purple-600" />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/95 rounded-full flex items-center justify-center">
                  <span className="text-3xl">😊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Support Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start" style={{gap: '60px'}}>
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">24/7 Live Support</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                To provide our customers with the best services possible, we provide 24/7 customer support. Our live chat will connect you to one of our specialists who will happily assist you with any inquiries or questions you may have.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Feel free to connect with us at any time.
              </p>
              <Button className="bg-purple-700 hover:bg-purple-600 text-white px-8 py-3 rounded font-medium">
                Get In Touch
              </Button>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-400 text-sm">About Crypto Exchanges</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <img src={chicksxLogo} alt="ChicksX" className="h-8 mb-4" />
              <p className="text-gray-600 text-sm">
                @chicksx.com 2024
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">ChicksX</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Help ▼</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help</li>
                <li>Contact us</li>
                <li>Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Use ▼</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-800 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-semibold">Trustpilot Reviews</div>
                <div className="flex text-green-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-gray-600">★★★★✩ 4.4/5</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}