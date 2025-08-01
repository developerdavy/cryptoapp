import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, Headphones, Menu, X, TrendingUp, TrendingDown, CheckCircle, XCircle, ArrowRight } from "lucide-react";
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
  
  // Payment status modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | null>(null);

  // Check for payment status in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlPaymentStatus = urlParams.get('payment');
    
    if (urlPaymentStatus === 'success') {
      setPaymentStatus('success');
      setShowPaymentModal(true);
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlPaymentStatus === 'failed') {
      setPaymentStatus('failed');
      setShowPaymentModal(true);
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Fetch live market data with historical chart data from external API
  const { data: marketData = [] } = useQuery({
    queryKey: ['live-market-data'],
    queryFn: async () => {
      try {
        // Fetch current prices and 24h changes
        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano&vs_currencies=usd&include_24hr_change=true');
        if (!priceResponse.ok) throw new Error('Failed to fetch price data');
        const priceData = await priceResponse.json();
        
        // Fetch 7-day historical data for chart generation
        const cryptos = [
          { id: 'bitcoin', symbol: 'BTC' },
          { id: 'ethereum', symbol: 'ETH' },
          { id: 'solana', symbol: 'SOL' },
          { id: 'cardano', symbol: 'ADA' }
        ];
        
        const chartDataPromises = cryptos.map(async (crypto) => {
          try {
            const chartResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=usd&days=7&interval=daily`);
            if (chartResponse.ok) {
              const chartData = await chartResponse.json();
              return {
                symbol: crypto.symbol,
                prices: chartData.prices || []
              };
            }
          } catch (error) {
            console.log(`Chart data unavailable for ${crypto.symbol}`);
          }
          return { symbol: crypto.symbol, prices: [] };
        });
        
        const chartResults = await Promise.all(chartDataPromises);
        
        return [
          {
            symbol: 'BTC',
            price: priceData.bitcoin?.usd || 43521,
            priceChange24h: priceData.bitcoin?.usd_24h_change || 0,
            chartData: chartResults.find(c => c.symbol === 'BTC')?.prices || []
          },
          {
            symbol: 'ETH',
            price: priceData.ethereum?.usd || 2341,
            priceChange24h: priceData.ethereum?.usd_24h_change || 0,
            chartData: chartResults.find(c => c.symbol === 'ETH')?.prices || []
          },
          {
            symbol: 'SOL',
            price: priceData.solana?.usd || 98.45,
            priceChange24h: priceData.solana?.usd_24h_change || 0,
            chartData: chartResults.find(c => c.symbol === 'SOL')?.prices || []
          },
          {
            symbol: 'ADA',
            price: priceData.cardano?.usd || 0.50,
            priceChange24h: priceData.cardano?.usd_24h_change || 0,
            chartData: chartResults.find(c => c.symbol === 'ADA')?.prices || []
          }
        ];
      } catch (error) {
        // Fallback to local market data if external API fails
        const fallbackResponse = await fetch('/api/market-data');
        if (fallbackResponse.ok) {
          return await fallbackResponse.json();
        }
        return [];
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds for live data
  }) as { data: any[] };

  // All available cryptocurrencies with authentic icons
  const allCryptos = [
    { symbol: "BTC", name: "Bitcoin", color: "bg-orange-500", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", color: "bg-blue-500", icon: "Ξ" },
    { symbol: "USDT", name: "Tether", color: "bg-green-500", icon: "₮" },
    { symbol: "BNB", name: "Binance Coin", color: "bg-yellow-600", icon: "⬡" },
    { symbol: "ADA", name: "Cardano", color: "bg-red-500", icon: "₳" },
    { symbol: "SOL", name: "Solana", color: "bg-purple-600", icon: "◎" },
    { symbol: "XRP", name: "Ripple", color: "bg-blue-700", icon: "✕" },
    { symbol: "DOGE", name: "Dogecoin", color: "bg-yellow-700", icon: "Ð" },
    { symbol: "AVAX", name: "Avalanche", color: "bg-teal-600", icon: "△" },
    { symbol: "MATIC", name: "Polygon", color: "bg-indigo-600", icon: "⬟" },
    { symbol: "DOT", name: "Polkadot", color: "bg-pink-600", icon: "●" },
    { symbol: "LTC", name: "Litecoin", color: "bg-gray-500", icon: "Ł" },
    { symbol: "UNI", name: "Uniswap", color: "bg-purple-700", icon: "🦄" },
    { symbol: "LINK", name: "Chainlink", color: "bg-blue-800", icon: "⬢" },
    { symbol: "ATOM", name: "Cosmos", color: "bg-orange-600", icon: "⚛" },
    { symbol: "ALGO", name: "Algorand", color: "bg-cyan-600", icon: "△" },
    { symbol: "ICP", name: "Internet Computer", color: "bg-red-600", icon: "∞" },
    { symbol: "FTT", name: "FTX Token", color: "bg-emerald-600", icon: "⟨⟩" },
    { symbol: "APE", name: "ApeCoin", color: "bg-violet-600", icon: "🐒" },
    { symbol: "NEAR", name: "NEAR Protocol", color: "bg-slate-600", icon: "◐" },
    { symbol: "MANA", name: "Decentraland", color: "bg-blue-900", icon: "M" },
    { symbol: "SAND", name: "The Sandbox", color: "bg-green-600", icon: "◇" },
    { symbol: "CRO", name: "Cronos", color: "bg-indigo-800", icon: "⧫" },
    { symbol: "HBAR", name: "Hedera", color: "bg-orange-700", icon: "ℏ" },
    { symbol: "THETA", name: "Theta", color: "bg-purple-800", icon: "Θ" },
    { symbol: "FLOW", name: "Flow", color: "bg-red-700", icon: "◊" },
    { symbol: "EGLD", name: "MultiversX", color: "bg-teal-700", icon: "⚡" },
    { symbol: "XTZ", name: "Tezos", color: "bg-indigo-700", icon: "ꜩ" },
    { symbol: "GRT", name: "The Graph", color: "bg-cyan-700", icon: "⌐" },
    { symbol: "1INCH", name: "1inch", color: "bg-emerald-700", icon: "1" }
  ];

  // Payment methods
  const allPaymentMethods = [
    { name: "Credit Card", icon: "💳", color: "bg-blue-600" },
    { name: "Debit Card", icon: "💳", color: "bg-green-600" },
    { name: "Bank Transfer", icon: "🏦", color: "bg-gray-600" },
    { name: "Interac", icon: "I", color: "bg-red-600" },
    { name: "SEPA", icon: "S", color: "bg-blue-800" },
    { name: "PayPal", icon: "P", color: "bg-purple-600" },
    { name: "Wire Transfer", icon: "W", color: "bg-green-600" },
    { name: "Apple Pay", icon: "🍎", color: "bg-gray-800" },
    { name: "Google Pay", icon: "G", color: "bg-blue-500" }
  ];

  // Filter functions
  const filteredBuyCryptos = allCryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(buyCryptoSearch.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(buyCryptoSearch.toLowerCase())
  );

  const filteredSellCryptos = allCryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(sellCryptoSearch.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(sellCryptoSearch.toLowerCase())
  );

  const filteredSwapCryptos = allCryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(swapCryptoSearch.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(swapCryptoSearch.toLowerCase())
  );

  const filteredPaymentMethods = allPaymentMethods.filter(method => 
    method.name.toLowerCase().includes(paymentMethodSearch.toLowerCase())
  );

  // Handle logout with redirect
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
  // Generate chart data points from live historical data
  const generateChartPointsFromLiveData = (historicalPrices: any[]) => {
    if (!historicalPrices || historicalPrices.length === 0) {
      // Return empty string if no data available
      return '';
    }

    // Get the last 7 days of price data
    const prices = historicalPrices.slice(-7).map(([timestamp, price]) => price);
    
    if (prices.length === 0) return '';
    
    // Normalize prices to fit in 0-100 range for SVG
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    const chartPoints = prices.map((price, index) => {
      const normalizedPrice = priceRange > 0 ? ((price - minPrice) / priceRange) * 80 + 10 : 50;
      const x = (index / (prices.length - 1)) * 100;
      const y = 100 - normalizedPrice; // Invert Y axis for SVG
      return `${x},${y}`;
    });
    
    return chartPoints.join(' ');
  };

  // Animated live chart component using real market data with smooth curves
  const LiveChart = ({ change, color, symbol }: { change: number, color: string, symbol: string }) => {
    const [chartData, setChartData] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    // Generate smooth curve path from points
    const generateSmoothPath = (points: string) => {
      if (!points) return '';
      
      const coords = points.split(' ').map(point => {
        const [x, y] = point.split(',').map(Number);
        return { x, y };
      });

      if (coords.length < 2) return '';

      let path = `M ${coords[0].x},${coords[0].y}`;
      
      for (let i = 1; i < coords.length; i++) {
        const prevPoint = coords[i - 1];
        const currentPoint = coords[i];
        const nextPoint = coords[i + 1];
        
        if (i === 1) {
          // First curve
          const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.3;
          const cp1y = prevPoint.y;
          const cp2x = currentPoint.x - (currentPoint.x - prevPoint.x) * 0.3;
          const cp2y = currentPoint.y;
          path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${currentPoint.x},${currentPoint.y}`;
        } else if (nextPoint) {
          // Middle curves
          const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.7;
          const cp1y = prevPoint.y + (currentPoint.y - prevPoint.y) * 0.3;
          const cp2x = currentPoint.x - (nextPoint.x - currentPoint.x) * 0.3;
          const cp2y = currentPoint.y - (nextPoint.y - currentPoint.y) * 0.3;
          path += ` S ${cp2x},${cp2y} ${currentPoint.x},${currentPoint.y}`;
        } else {
          // Last point
          path += ` L ${currentPoint.x},${currentPoint.y}`;
        }
      }
      
      return path;
    };

    // Update chart data when market data changes
    useEffect(() => {
      const cryptoData = marketData.find((crypto: any) => crypto.symbol === symbol);
      if (cryptoData && cryptoData.chartData) {
        const newChartData = generateChartPointsFromLiveData(cryptoData.chartData);
        if (newChartData !== chartData) {
          setIsAnimating(true);
          setTimeout(() => {
            setChartData(newChartData);
            setIsAnimating(false);
          }, 200);
        }
      } else {
        // Generate fallback chart pattern for better visual consistency
        const fallbackPoints = Array.from({ length: 8 }, (_, i) => {
          const x = (i / 7) * 100;
          const baseY = 50;
          const variation = Math.sin(i * 0.8) * 15 * (change >= 0 ? 1 : -1);
          const y = Math.max(10, Math.min(90, baseY + variation));
          return `${x},${y}`;
        }).join(' ');
        setChartData(fallbackPoints);
      }
    }, [marketData, symbol, chartData, change]);

    const smoothPath = generateSmoothPath(chartData);

    return (
      <div className={`h-full w-full transition-opacity duration-200 ${isAnimating ? 'opacity-70' : 'opacity-100'}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
              <stop offset="100%" stopColor={color} stopOpacity="0.0"/>
            </linearGradient>
          </defs>
          {chartData && (
            <>
              <path
                d={`${smoothPath} L 100,100 L 0,100 Z`}
                fill={`url(#gradient-${symbol})`}
                className="transition-all duration-500"
              />
              <path
                d={smoothPath}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500"
              />
            </>
          )}
        </svg>
      </div>
    );
  };

  // Animated digit component with fade motion
  const AnimatedDigit = ({ digit, index, change }: { digit: string, index: number, change: number }) => {
    const [currentDigit, setCurrentDigit] = useState(digit);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if (digit !== currentDigit) {
        setIsAnimating(true);
        const timeout = setTimeout(() => {
          setCurrentDigit(digit);
          setTimeout(() => setIsAnimating(false), 150);
        }, index * 50); // Stagger animation by index

        return () => clearTimeout(timeout);
      }
    }, [digit, currentDigit, index]);

    return (
      <span 
        className={`inline-block transition-all duration-300 ${
          isAnimating ? 'transform translate-y-2 opacity-0' : 'transform translate-y-0 opacity-100'
        }`}
        style={{ transitionDelay: `${index * 30}ms` }}
      >
        {currentDigit}
      </span>
    );
  };

  // Enhanced price animation component with digit-by-digit motion
  const AnimatedPrice = ({ price, change }: { price: string, change: number }) => {
    const [displayPrice, setDisplayPrice] = useState(price);
    const [isFlashing, setIsFlashing] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
      if (price !== displayPrice) {
        setIsFlashing(true);
        setAnimationKey(prev => prev + 1);
        
        // Animate price change
        const timeout = setTimeout(() => {
          setDisplayPrice(price);
          setTimeout(() => setIsFlashing(false), 500);
        }, 200);

        return () => clearTimeout(timeout);
      }
    }, [price, displayPrice]);

    // Trigger animation every 30 seconds regardless of data changes
    useEffect(() => {
      const interval = setInterval(() => {
        setIsFlashing(true);
        setAnimationKey(prev => prev + 1);
        
        setTimeout(() => {
          setIsFlashing(false);
        }, 800);
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }, []);

    // Split price into individual characters for animation
    const priceChars = displayPrice.split('');

    return (
      <div className={`font-bold text-lg transition-colors duration-500 ${
        isFlashing ? (change >= 0 ? 'text-green-500' : 'text-red-500') : 'text-gray-900'
      }`}>
        {priceChars.map((char, index) => (
          <AnimatedDigit 
            key={`${animationKey}-${index}`}
            digit={char} 
            index={index} 
            change={change}
          />
        ))}
      </div>
    );
  };

  // Animated percentage component
  const AnimatedPercentage = ({ percentage, change }: { percentage: string, change: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animationTrigger, setAnimationTrigger] = useState(0);

    useEffect(() => {
      setIsVisible(false);
      const timeout = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timeout);
    }, [percentage, animationTrigger]);

    // Trigger animation every 30 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setAnimationTrigger(prev => prev + 1);
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }, []);

    return (
      <div className={`flex items-center text-sm font-medium transition-all duration-500 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-1'
      } ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 mr-1" />
        )}
        <span className="animate-pulse">{percentage}</span>
      </div>
    );
  };

  // Generate dynamic crypto cards from live market data
  const cryptoCards = Array.isArray(marketData) && marketData.length > 0 ? [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: `$${(marketData as any[]).find((m: any) => m.symbol === 'BTC')?.price?.toLocaleString() || '43,521'}`,
      change: `${(marketData as any[]).find((m: any) => m.symbol === 'BTC')?.priceChange24h >= 0 ? '+' : ''}${(marketData as any[]).find((m: any) => m.symbol === 'BTC')?.priceChange24h?.toFixed(2) || '0.00'}%`,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      chartColor: "stroke-yellow-500"
    },
    {
      name: "Ethereum", 
      symbol: "ETH",
      price: `$${(marketData as any[]).find((m: any) => m.symbol === 'ETH')?.price?.toLocaleString() || '2,341'}`,
      change: `${(marketData as any[]).find((m: any) => m.symbol === 'ETH')?.priceChange24h >= 0 ? '+' : ''}${(marketData as any[]).find((m: any) => m.symbol === 'ETH')?.priceChange24h?.toFixed(2) || '0.00'}%`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      chartColor: "stroke-blue-500"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: `$${(marketData as any[]).find((m: any) => m.symbol === 'SOL')?.price?.toLocaleString() || '98.45'}`,
      change: `${(marketData as any[]).find((m: any) => m.symbol === 'SOL')?.priceChange24h >= 0 ? '+' : ''}${(marketData as any[]).find((m: any) => m.symbol === 'SOL')?.priceChange24h?.toFixed(2) || '0.00'}%`,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10", 
      chartColor: "stroke-purple-500"
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
                <div className="w-5 h-0.5 bg-gray-700"></div>
                <div className="w-5 h-0.5 bg-gray-700"></div>
                <div className="w-5 h-0.5 bg-gray-700"></div>
              </div>
            </Button>
            
            <div className="flex items-center">
              <img src={chicksxLogo} alt="ChicksX" className="h-6" />
            </div>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Hi, {(user as any)?.email ? (user as any).email.split('@')[0] : 'User'}</span>
              <Button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium text-sm"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setLocation("/signup")}
              className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm mr-4"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Sign In
            </Button>
          )}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block w-full py-4" style={{marginLeft: '20px', marginRight: '20px'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 sm:space-x-12">
              <img src={chicksxLogo} alt="ChicksX" className="h-8 sm:h-10" />
              
              {/* Desktop Navigation */}
              <nav className="flex items-center space-x-8">
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
            
            {/* Desktop Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4" style={{ marginRight: '20px', marginInlineEnd: '20px' }}>
                <div className="flex items-center space-x-2 text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden lg:inline">Welcome, {(user as any)?.email ? (user as any).email.split('@')[0] : 'User'}</span>
                </div>
                <Button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setLocation("/signup")}
                className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
                style={{ marginRight: '20px', marginInlineEnd: '20px' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden lg:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200 w-full">
            <div className="px-0 py-2 space-y-1 w-full">
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
        
        {/* Buy Crypto Dropdown */}
        {showBuyCryptoDropdown && (
          <div className="bg-white border-t border-gray-200 shadow-lg w-full">
            <div className="w-full px-4 md:px-4 lg:px-6 py-6 sm:py-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Buy Crypto</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Cryptocurrency Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Select a cryptocurrency to buy"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                      value={buyCryptoSearch}
                      onChange={(e) => setBuyCryptoSearch(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a cryptocurrency to purchase</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full" style={{width: '100%'}}>
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content', flexWrap: 'nowrap'}}>
                      {filteredBuyCryptos.map((crypto) => (
                        <CryptoBadge 
                          key={crypto.symbol}
                          symbol={crypto.symbol} 
                          name={crypto.name} 
                          color={crypto.color} 
                          icon={crypto.icon} 
                          action="buy" 
                        />
                      ))}
                      {filteredBuyCryptos.length === 0 && buyCryptoSearch && (
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
                      placeholder="Search a payment method to proceed"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                      value={paymentMethodSearch}
                      onChange={(e) => setPaymentMethodSearch(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Select a payment method to proceed</p>
                  
                  <div className="overflow-x-auto scrollbar-hide w-full">
                    <div className="flex gap-3 pb-2 pr-6" style={{minWidth: 'max-content'}}>
                      {filteredPaymentMethods.map((method) => (
                        <div key={method.name} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap">
                          <div className={`w-6 h-6 ${method.color} rounded-full flex items-center justify-center`}>
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
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Sell Crypto</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Cryptocurrency Selection */}
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Select a cryptocurrency to sell"
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
                      placeholder="Search a payment method to proceed"
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
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
            <div className="w-full px-4 md:px-4 lg:px-6 py-6 sm:py-8">
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
                      className="w-full px-4 py-3 rounded-lg crypto-search-input"
                      value={swapCryptoSearch}
                      onChange={(e) => setSwapCryptoSearch(e.target.value)}
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
                        <CryptoBadge symbol="ICP" name="Internet Computer" color="bg-red-600" icon="I" action="swap" />
                        <CryptoBadge symbol="FTT" name="FTX Token" color="bg-emerald-600" icon="F" action="swap" />
                        <CryptoBadge symbol="APE" name="ApeCoin" color="bg-violet-600" icon="A" action="swap" />
                        <CryptoBadge symbol="NEAR" name="NEAR Protocol" color="bg-slate-600" icon="N" action="swap" />
                        <CryptoBadge symbol="MANA" name="Decentraland" color="bg-blue-900" icon="M" action="swap" />
                        <CryptoBadge symbol="SAND" name="The Sandbox" color="bg-green-600" icon="S" action="swap" />
                        <CryptoBadge symbol="CRO" name="Cronos" color="bg-indigo-800" icon="C" action="swap" />
                        <CryptoBadge symbol="HBAR" name="Hedera" color="bg-orange-700" icon="H" action="swap" />
                        <CryptoBadge symbol="THETA" name="Theta" color="bg-purple-800" icon="T" action="swap" />
                        <CryptoBadge symbol="FLOW" name="Flow" color="bg-red-700" icon="F" action="swap" />
                        <CryptoBadge symbol="EGLD" name="MultiversX" color="bg-teal-700" icon="E" action="swap" />
                        <CryptoBadge symbol="XTZ" name="Tezos" color="bg-indigo-700" icon="X" action="swap" />
                        <CryptoBadge symbol="GRT" name="The Graph" color="bg-cyan-700" icon="G" action="swap" />
                        <CryptoBadge symbol="1INCH" name="1inch" color="bg-emerald-700" icon="1" action="swap" />
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
      <section className="px-0 md:px-4 lg:px-24 xl:px-32 py-8 md:py-16 relative">
        {/* Mobile Layout */}
        <div className="md:hidden pb-20 px-4">
          <div className="text-white space-y-6 text-left mb-8">
            <h1 className="text-4xl font-bold leading-tight">
              The Lowest Fee<br />
              Crypto Exchange
            </h1>
            <p className="text-lg text-purple-200">
              Buy, sell, exchange bitcoin, crypto or fiat instantly in any major city around the globe.
            </p>
            <Button 
              onClick={() => setLocation("/trade")}
              className="bg-white text-purple-900 hover:bg-purple-100 px-8 py-3 text-lg font-semibold mb-8"
            >
              Exchange Now
            </Button>
            
            {/* Features for Mobile */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-white">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-purple-900" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Fintrac & Fincen registered</div>
                  <div className="text-sm text-purple-200">Learn more →</div>
                </div>
              </div>
              
              <div className="flex items-center text-white">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">★★★★★ 4.4/5</div>
                  <div className="text-sm text-purple-200">Customers review on trustpilot.com →</div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Crypto Cards positioned at bottom overlapping onto next section */}
          <div className="absolute bottom-0 left-0 right-0 px-0 md:px-4 transform translate-y-1/2 z-10">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 pb-4" style={{minWidth: 'max-content'}}>
                {Array.isArray(marketData) && marketData.length > 0 ? marketData.slice(0, 5).map((crypto: any) => {
                  const change = parseFloat(crypto.priceChange24h) || 0;
                  const isPositive = change >= 0;
                  const cryptoConfigMap: { [key: string]: { name: string, icon: string, color: string, bgColor: string } } = {
                    BTC: { name: "Bitcoin", icon: "₿", color: "#f97316", bgColor: "bg-orange-500" },
                    ETH: { name: "Ethereum", icon: "Ξ", color: "#3b82f6", bgColor: "bg-blue-500" },
                    SOL: { name: "Solana", icon: "◎", color: "#9945ff", bgColor: "bg-purple-500" },
                    ADA: { name: "Cardano", icon: "₳", color: "#0033ad", bgColor: "bg-blue-600" },
                    BNB: { name: "BNB", icon: "B", color: "#f0b90b", bgColor: "bg-yellow-500" }
                  };
                  const cryptoConfig = cryptoConfigMap[crypto.symbol] || { name: crypto.symbol, icon: crypto.symbol[0], color: "#6b7280", bgColor: "bg-gray-500" };

                  return (
                    <div key={crypto.symbol} className="bg-white rounded-2xl p-4 shadow-lg w-44 flex-shrink-0 hover:shadow-xl transition-shadow cursor-pointer"
                         onClick={() => setLocation(`/trade/${crypto.symbol.toLowerCase()}`)}>
                      <div className="flex items-center mb-3">
                        <div className={`w-8 h-8 ${cryptoConfig.bgColor} rounded-full flex items-center justify-center mr-3`}>
                          <span className="text-white font-bold text-sm">{cryptoConfig.icon}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{cryptoConfig.name}</div>
                        </div>
                      </div>
                      <AnimatedPrice 
                        price={`$${parseFloat(crypto.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        change={change}
                      />
                      <div className={`text-sm mb-3 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {isPositive ? '+' : ''}{change.toFixed(2)}%
                      </div>
                      <LiveChart change={change} color={cryptoConfig.color} symbol={crypto.symbol} />
                      <Button
                        variant="ghost"
                        className="text-purple-600 font-medium text-sm p-0 h-auto"
                        onClick={() => setLocation(`/trade/${crypto.symbol.toLowerCase()}`)}
                      >
                        Trade now →
                      </Button>
                    </div>
                  );
                }) : (
                  // Fallback cards when no market data available
                  <div className="bg-white rounded-2xl p-4 shadow-lg w-44 flex-shrink-0">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">₿</span>
                      </div>
                      <div className="font-semibold text-sm">Bitcoin</div>
                    </div>
                    <div className="text-xl font-bold mb-1">Loading...</div>
                    <div className="text-gray-400 text-sm mb-3">---%</div>
                    <div className="h-16 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="w-full mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-white space-y-6 lg:space-y-8 text-left ml-4">
                <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  The Lowest Fee<br />
                  Crypto Exchange
                </h1>
                <p className="text-lg lg:text-xl text-purple-200">
                  Buy, sell, exchange bitcoin, crypto or fiat instantly in any major city around the globe.
                </p>
                <Button 
                  onClick={() => setLocation("/trade")}
                  className="bg-white text-purple-900 hover:bg-purple-100 px-8 py-3 text-lg font-semibold"
                >
                  Exchange Now
                </Button>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Fintrac & Fincen registered</div>
                      <Link href="#" className="text-purple-200 text-sm hover:underline">
                        Learn more →
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
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
              <div className="relative flex justify-center lg:justify-end">
                <img 
                  src={mobileAppImage} 
                  alt="ChicksX Mobile App" 
                  className="w-full max-w-sm lg:max-w-md xl:max-w-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Cards Section */}
      <section className="w-full py-6 sm:py-8 relative">
        {/* Desktop Layout */}
        <div className="hidden md:block w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" style={{marginLeft: '120px', marginRight: '120px'}}>
            {/* Bitcoin Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-500 text-xs sm:text-lg font-bold">₿</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-800">Bitcoin</div>
                </div>
                <div className="mb-1">
                  <div className="text-xs sm:text-lg">
                    <AnimatedPrice 
                      price={Array.isArray(marketData) && (marketData as any[]).find((m: any) => m.symbol === 'BTC')?.price ? 
                        `$${(marketData as any[]).find((m: any) => m.symbol === 'BTC').price.toLocaleString()}` : 
                        '$43,521'}
                      change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'BTC')?.priceChange24h || 0 : 0}
                    />
                  </div>
                  <AnimatedPercentage 
                    percentage={`${Array.isArray(marketData) ? Math.abs((marketData as any[]).find((m: any) => m.symbol === 'BTC')?.priceChange24h || 0).toFixed(2) : '0.00'}%`}
                    change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'BTC')?.priceChange24h || 0 : 0}
                  />
                </div>
                <div className="h-4 sm:h-8 mb-1 sm:mb-2">
                  <LiveChart 
                    change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'BTC')?.priceChange24h || 0 : 0}
                    color="#f59e0b" 
                    symbol="BTC"
                  />
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline hidden sm:flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* Ethereum Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 text-xs sm:text-lg font-bold">Ξ</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-800">Ethereum</div>
                </div>
                <div className="mb-1">
                  <div className="text-xs sm:text-lg">
                    <AnimatedPrice 
                      price={Array.isArray(marketData) && (marketData as any[]).find((m: any) => m.symbol === 'ETH')?.price ? 
                        `$${(marketData as any[]).find((m: any) => m.symbol === 'ETH').price.toLocaleString()}` : 
                        '$2,488.31'}
                      change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'ETH')?.priceChange24h || 0 : -1.08}
                    />
                  </div>
                  <AnimatedPercentage 
                    percentage={`${Array.isArray(marketData) ? Math.abs((marketData as any[]).find((m: any) => m.symbol === 'ETH')?.priceChange24h || 0).toFixed(2) : '1.08'}%`}
                    change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'ETH')?.priceChange24h || 0 : -1.08}
                  />
                </div>
                <div className="h-4 sm:h-8 mb-1 sm:mb-2">
                  <LiveChart 
                    change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'ETH')?.priceChange24h || 0 : -1.08}
                    color="#3b82f6" 
                    symbol="ETH"
                  />
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline hidden sm:flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* Solana Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-500 text-xs sm:text-lg font-bold">◎</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-800">Solana</div>
                </div>
                <div className="mb-1">
                  <div className="text-xs sm:text-lg">
                    <AnimatedPrice 
                      price={Array.isArray(marketData) && (marketData as any[]).find((m: any) => m.symbol === 'SOL')?.price ? 
                        `$${(marketData as any[]).find((m: any) => m.symbol === 'SOL').price.toLocaleString()}` : 
                        '$150.39'}
                      change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'SOL')?.priceChange24h || 0 : 0.66}
                    />
                  </div>
                  <AnimatedPercentage 
                    percentage={`${Array.isArray(marketData) ? Math.abs((marketData as any[]).find((m: any) => m.symbol === 'SOL')?.priceChange24h || 0).toFixed(2) : '0.66'}%`}
                    change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'SOL')?.priceChange24h || 0 : 0.66}
                  />
                </div>
                <div className="h-4 sm:h-8 mb-1 sm:mb-2">
                  <LiveChart 
                    change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'SOL')?.priceChange24h || 0 : 0.66}
                    color="#8b5cf6" 
                    symbol="SOL"
                  />
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline hidden sm:flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* Cardano Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-2 sm:p-3 md:p-4">
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs sm:text-lg font-bold">₳</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-800">Cardano</div>
                </div>
                <div className="mb-1">
                  <div className="text-xs sm:text-lg">
                    <AnimatedPrice 
                      price={Array.isArray(marketData) && (marketData as any[]).find((m: any) => m.symbol === 'ADA')?.price ? 
                        `$${(marketData as any[]).find((m: any) => m.symbol === 'ADA').price.toFixed(2)}` : 
                        '$0.66'}
                      change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'ADA')?.priceChange24h || 0 : 1.2}
                    />
                  </div>
                  <AnimatedPercentage 
                    percentage={`${Array.isArray(marketData) ? Math.abs((marketData as any[]).find((m: any) => m.symbol === 'ADA')?.priceChange24h || 0).toFixed(2) : '0.00'}%`}
                    change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'ADA')?.priceChange24h || 0 : 1.2}
                  />
                </div>
                <div className="h-4 sm:h-8 mb-1 sm:mb-2">
                  <LiveChart 
                    change={Array.isArray(marketData) ? (marketData as any[]).find((m: any) => m.symbol === 'ADA')?.priceChange24h || 0 : 1.2}
                    color="#2563eb" 
                    symbol="ADA"
                  />
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline hidden sm:flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* View More Card */}
            <Card className="bg-purple-100 shadow-lg">
              <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col justify-center items-center text-center h-full">
                <div className="w-5 h-5 sm:w-8 sm:h-8 bg-purple-200 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <span className="text-purple-600 text-xs sm:text-lg font-bold">✕</span>
                </div>
                <div className="text-purple-700 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                  View more than<br />300<br />cryptocurrencies<br />here
                </div>
                <Link href="#" className="text-purple-600 text-xs hover:underline hidden sm:flex items-center">
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Desktop Why ChicksX Section */}
      <section className="hidden md:block w-full py-16 bg-gray-50">
        <div className="w-full px-32">
          <div className="flex items-start gap-8">
            {/* Title */}
            <div className="flex-shrink-0">
              <h2 className="text-4xl font-bold text-gray-900">Why ChicksX?</h2>
            </div>
            
            {/* Description */}
            <div className="flex-1">
              <p className="text-gray-600 leading-relaxed">
                We are committed to upholding the integrity, trust, and privacy of our brand in order to best serve the needs of our clients. Our top priority is to provide our customers with a secure exchange platform where all your personal data is secure and protected. By continuously updating and perfecting our security measures and protocols, we ensure to provide the safest platform possible.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
            {/* Global Crypto Trading */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center h-full flex flex-col max-w-sm mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Crypto Trading Made Simple</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-left flex-grow">
                Trade crypto and fiat currencies from anywhere, anytime. We support all digital currencies with the lowest fees.
              </p>
              <Button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded font-medium">
                Learn more
              </Button>
            </div>
            
            {/* Trade 200+ Currencies */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center h-full flex flex-col max-w-sm mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trade 200+ Currencies at Lowest Rates</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-left flex-grow">
                From BTC to ETH, USDT, SOL, plus fiat currencies like USD and CAD - we offer competitive rates on every trade.
              </p>
              <Button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded font-medium">
                Learn more
              </Button>
            </div>
            
            {/* Pay and Withdraw */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center h-full flex flex-col max-w-sm mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pay and Withdraw Your Way</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-left flex-grow">
                We give you the option of selecting the digital currency to sell, and your preferred cashout or payout method.
              </p>
              <Button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded font-medium">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Why ChicksX Section */}
      <section className="md:hidden bg-gray-50 px-0 pt-24 pb-8">
        <div className="flex items-start gap-4 px-4">
          {/* Title */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-900">Why ChicksX?</h2>
          </div>
          
          {/* Description */}
          <div className="flex-1">
            <p className="text-gray-600 text-sm leading-relaxed">
              We are committed to upholding the integrity, trust, and privacy of our brand in order to best serve the needs of our clients. Our focus is to provide our customers with a secure exchange platform where all your personal data is secure and protected. By continuously updating and perfecting our security protocols, we ensure to provide the safest platform possible.
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="w-full py-16 bg-gradient-to-r from-purple-900 to-blue-800">
        <div className="w-full px-4 md:px-8 lg:px-24 xl:px-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
        </div>
      </section>

      {/* Mobile 24/7 Support Section */}
      <section className="md:hidden w-full py-16 bg-gray-50">
        <div className="flex items-start gap-4 px-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">24/7 Live Support</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              To provide our customers with the best services possible, we provide 24/7 customer support. Our live chat will connect you to one of our specialists who will happily assist you with any inquiries or questions you may have.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Feel free to connect with us at any time.
            </p>
            <Button className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded font-medium text-sm">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Desktop 24/7 Support Section */}
      <section className="hidden md:block w-full py-16 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-24 xl:px-32">
          <div className="flex items-start gap-8 lg:gap-16">
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
      <footer className="bg-white py-16 border-t border-gray-200 w-full">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-24 xl:px-32">
          <div className="grid grid-cols-5 gap-16">
            {/* Logo and Email */}
            <div className="col-span-1">
              <img src={chicksxLogo} alt="ChicksX" className="h-8 mb-6" />
              <p className="text-gray-600 text-sm">support@chicksx.com</p>
              <div className="flex items-center mt-4">
                <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded mr-2">ENG</span>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">USD</span>
              </div>
            </div>

            {/* ChicksX Column */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">ChicksX</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="/locations">Locations</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/security">Security</Link></li>
                <li>
                  <div className="flex items-center">
                    <span>More</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/sitemap">Sitemap</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/cookies">Cookies Policy</Link></li>
                <li>
                  <div className="flex items-center">
                    <span>More</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Social</h4>
              <div className="flex space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <FaDiscord className="text-white text-sm" />
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaTwitter className="text-white text-sm" />
                </div>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <RiTwitterXFill className="text-white text-sm" />
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaFacebookF className="text-white text-sm" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Trustpilot Reviews</p>
                <div className="flex items-center">
                  <div className="flex text-green-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold ml-2">4.4/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Copyright © 2021, ChicksX.com. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Payment Status Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in duration-300">
            <div className={`rounded-t-2xl p-6 ${paymentStatus === 'success' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-red-500 to-pink-500'
            }`}>
              <div className="text-center text-white">
                <div className="mx-auto w-16 h-16 mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  {paymentStatus === 'success' ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <XCircle className="w-8 h-8" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed'}
                </h3>
                <p className="text-sm opacity-90">
                  {paymentStatus === 'success' 
                    ? 'Your transaction has been completed successfully' 
                    : 'There was an issue processing your payment'
                  }
                </p>
              </div>
            </div>
            
            <div className="p-6">
              <div className={`rounded-lg p-4 mb-6 ${paymentStatus === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${paymentStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {paymentStatus === 'success' 
                    ? '✅ Your cryptocurrency purchase is being processed and will be transferred to your wallet shortly.' 
                    : '❌ Please try again or contact support if the issue persists.'
                  }
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowPaymentModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                {paymentStatus === 'success' ? (
                  <Button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setLocation('/dashboard');
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <span>View Dashboard</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setLocation('/checkout');
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <span>Try Again</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}