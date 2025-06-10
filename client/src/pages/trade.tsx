import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";

// Cryptocurrency data
const cryptoData = {
  BTC: { name: "Bitcoin", symbol: "₿", price: 43567.89, change: 2.45, color: "bg-orange-500" },
  ETH: { name: "Ethereum", symbol: "Ξ", price: 2654.23, change: -1.23, color: "bg-blue-500" },
  USDT: { name: "Tether", symbol: "T", price: 1.00, change: 0.01, color: "bg-green-500" },
  BNB: { name: "BNB", symbol: "B", price: 315.67, change: 1.89, color: "bg-yellow-600" },
  ADA: { name: "Cardano", symbol: "A", price: 0.456, change: -2.34, color: "bg-red-500" },
  SOL: { name: "Solana", symbol: "S", price: 89.12, change: 3.45, color: "bg-purple-600" },
  XRP: { name: "Ripple", symbol: "X", price: 0.587, change: 1.23, color: "bg-blue-700" },
  DOGE: { name: "Dogecoin", symbol: "D", price: 0.087, change: -0.56, color: "bg-yellow-700" },
  AVAX: { name: "Avalanche", symbol: "A", price: 35.67, change: 4.12, color: "bg-teal-600" },
  MATIC: { name: "Polygon", symbol: "P", price: 0.789, change: -1.45, color: "bg-indigo-600" },
  DOT: { name: "Polkadot", symbol: "D", price: 5.43, change: 2.67, color: "bg-pink-600" },
  LTC: { name: "Litecoin", symbol: "L", price: 72.34, change: 1.23, color: "bg-gray-500" },
  UNI: { name: "Uniswap", symbol: "U", price: 6.78, change: -0.89, color: "bg-purple-700" },
  LINK: { name: "Chainlink", symbol: "L", price: 14.56, change: 3.21, color: "bg-blue-800" },
  ATOM: { name: "Cosmos", symbol: "A", price: 9.87, change: 1.56, color: "bg-orange-600" },
  ALGO: { name: "Algorand", symbol: "A", price: 0.234, change: -2.13, color: "bg-cyan-600" },
  VET: { name: "VeChain", symbol: "V", price: 0.023, change: 4.56, color: "bg-green-700" },
  ICP: { name: "Internet Computer", symbol: "I", price: 4.67, change: -1.78, color: "bg-purple-800" },
  FIL: { name: "Filecoin", symbol: "F", price: 5.89, change: 2.34, color: "bg-blue-600" },
  HBAR: { name: "Hedera", symbol: "H", price: 0.067, change: 1.89, color: "bg-gray-700" },
  ETC: { name: "Ethereum Classic", symbol: "E", price: 20.45, change: -0.67, color: "bg-green-800" },
  XLM: { name: "Stellar", symbol: "S", price: 0.112, change: 3.45, color: "bg-blue-400" },
  TRX: { name: "TRON", symbol: "T", price: 0.089, change: 1.23, color: "bg-red-600" },
  EOS: { name: "EOS", symbol: "E", price: 0.678, change: -2.45, color: "bg-black" },
  XTZ: { name: "Tezos", symbol: "X", price: 0.891, change: 1.67, color: "bg-blue-900" },
  AAVE: { name: "Aave", symbol: "A", price: 78.9, change: 2.34, color: "bg-pink-500" },
  MKR: { name: "Maker", symbol: "M", price: 567.8, change: -1.23, color: "bg-teal-700" },
  COMP: { name: "Compound", symbol: "C", price: 45.67, change: 3.45, color: "bg-green-600" },
  SNX: { name: "Synthetix", symbol: "S", price: 2.34, change: -0.89, color: "bg-indigo-700" },
  YFI: { name: "yearn.finance", symbol: "Y", price: 6789.0, change: 4.56, color: "bg-yellow-800" },
  CRV: { name: "Curve", symbol: "C", price: 0.456, change: 1.23, color: "bg-red-700" },
  SUSHI: { name: "SushiSwap", symbol: "S", price: 1.23, change: -2.34, color: "bg-pink-700" },
  ONEINCH: { name: "1inch", symbol: "1", price: 0.345, change: 2.67, color: "bg-red-800" },
  BAL: { name: "Balancer", symbol: "B", price: 3.45, change: -1.45, color: "bg-gray-600" },
  REN: { name: "Ren", symbol: "R", price: 0.067, change: 3.21, color: "bg-gray-800" },
  KNC: { name: "Kyber Network", symbol: "K", price: 0.789, change: 1.56, color: "bg-green-900" },
  ZRX: { name: "0x", symbol: "Z", price: 0.234, change: -0.78, color: "bg-black" },
  BAT: { name: "Basic Attention Token", symbol: "B", price: 0.189, change: 2.45, color: "bg-orange-700" },
  ENJ: { name: "Enjin Coin", symbol: "E", price: 0.123, change: 1.78, color: "bg-purple-900" },
  MANA: { name: "Decentraland", symbol: "M", price: 0.345, change: -1.23, color: "bg-pink-800" },
  SAND: { name: "The Sandbox", symbol: "S", price: 0.456, change: 3.45, color: "bg-yellow-700" },
  AXS: { name: "Axie Infinity", symbol: "A", price: 5.67, change: -2.34, color: "bg-blue-800" },
  CHZ: { name: "Chiliz", symbol: "C", price: 0.089, change: 1.78, color: "bg-rose-800" }
};

const currencies = [
  { id: "CAD", name: "CA Dollar", icon: "🍁", color: "bg-red-500" },
  { id: "USD", name: "US Dollar", icon: "$", color: "bg-green-600" },
  { id: "EUR", name: "Euro", icon: "€", color: "bg-blue-600" },
  { id: "GBP", name: "British Pound", icon: "£", color: "bg-purple-600" },
  { id: "JPY", name: "Japanese Yen", icon: "¥", color: "bg-orange-600" },
  { id: "AUD", name: "Australian Dollar", icon: "A$", color: "bg-yellow-600" },
  { id: "CHF", name: "Swiss Franc", icon: "Fr", color: "bg-red-600" },
  { id: "CNY", name: "Chinese Yuan", icon: "¥", color: "bg-red-700" },
  { id: "SEK", name: "Swedish Krona", icon: "kr", color: "bg-blue-700" },
  { id: "NOK", name: "Norwegian Krone", icon: "kr", color: "bg-indigo-600" },
  { id: "DKK", name: "Danish Krone", icon: "kr", color: "bg-red-800" },
  { id: "NZD", name: "New Zealand Dollar", icon: "NZ$", color: "bg-green-700" },
  { id: "SGD", name: "Singapore Dollar", icon: "S$", color: "bg-teal-600" },
  { id: "HKD", name: "Hong Kong Dollar", icon: "HK$", color: "bg-pink-600" },
  { id: "KRW", name: "South Korean Won", icon: "₩", color: "bg-gray-600" },
  { id: "INR", name: "Indian Rupee", icon: "₹", color: "bg-orange-700" },
  { id: "MXN", name: "Mexican Peso", icon: "$", color: "bg-green-800" },
  { id: "BRL", name: "Brazilian Real", icon: "R$", color: "bg-yellow-700" },
  { id: "RUB", name: "Russian Ruble", icon: "₽", color: "bg-blue-800" },
  { id: "ZAR", name: "South African Rand", icon: "R", color: "bg-green-900" },
];

const paymentMethods = [
  { id: "card", name: "Debit/Credit", icon: "💳", color: "bg-blue-600" },
  { id: "google", name: "Google Pay", icon: "G", color: "bg-red-500" },
  { id: "apple", name: "Apple Pay", icon: "A", color: "bg-black" },
  { id: "paypal", name: "PayPal", icon: "P", color: "bg-purple-600" },
];

export default function Trade() {
  const params = useParams();
  const [location] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("Buy");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedCurrency, setSelectedCurrency] = useState("CAD");
  const [amount, setAmount] = useState("134.72");
  const [receiveAmount, setReceiveAmount] = useState("0.003089");

  // Determine trade type and crypto from URL
  useEffect(() => {
    if (location.includes('/buy/')) {
      setActiveTab("Buy");
      const crypto = params.crypto?.toUpperCase();
      if (crypto && cryptoData[crypto as keyof typeof cryptoData]) {
        setSelectedCrypto(crypto);
      }
    } else if (location.includes('/sell/')) {
      setActiveTab("Sell");
      const crypto = params.crypto?.toUpperCase();
      if (crypto && cryptoData[crypto as keyof typeof cryptoData]) {
        setSelectedCrypto(crypto);
      }
    } else if (location.includes('/swap/')) {
      setActiveTab("Swap");
      const crypto = params.crypto?.toUpperCase();
      if (crypto && cryptoData[crypto as keyof typeof cryptoData]) {
        setSelectedCrypto(crypto);
      }
    }
  }, [location, params.crypto]);

  const currentCrypto = cryptoData[selectedCrypto as keyof typeof cryptoData] || cryptoData.BTC;
  const currentPayment = paymentMethods.find(p => p.id === selectedPayment) || paymentMethods[0];
  const currentCurrency = currencies.find(c => c.id === selectedCurrency) || currencies[0];

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with your purchase.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }
    
    // Proceed with checkout for authenticated users
    toast({
      title: "Processing Transaction",
      description: "Redirecting to secure checkout...",
    });
    // Add actual checkout logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-0 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8 pl-4 md:pl-0">
            <img src={chicksxLogo} alt="ChicksX" className="h-8" />
            <nav className="hidden md:flex items-center space-x-6">
              <button className="text-gray-700 hover:text-purple-600 font-medium flex items-center">
                Buy Crypto
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <button className="text-gray-700 hover:text-purple-600 font-medium flex items-center">
                Sell Crypto
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <button className="text-gray-700 hover:text-purple-600 font-medium flex items-center">
                Swap
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </nav>
          </div>
          {!isAuthenticated ? (
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">👤</span>
              Sign In
            </Button>
          ) : (
            <Button 
              onClick={() => window.location.href = "/api/logout"}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">👤</span>
              Sign Out
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-0 md:px-6 py-8">
        {/* Trading Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 max-w-4xl mx-auto">
          {/* Trading Tabs */}
          <div className="flex space-x-2 mb-8">
            <button
              className={`px-8 py-3 rounded-full font-medium transition-colors ${
                activeTab === "Buy"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("Buy")}
            >
              Buy
            </button>
            <button
              className={`px-8 py-3 rounded-full font-medium transition-colors ${
                activeTab === "Sell"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("Sell")}
            >
              Sell
            </button>
            <button
              className={`px-8 py-3 rounded-full font-medium transition-colors ${
                activeTab === "Swap"
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("Swap")}
            >
              Swap
            </button>
          </div>

          {/* Trading Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Spend Section */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Spend</label>
                  <div className="relative">
                    <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                      <SelectTrigger className="w-full h-14 border-2 border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 ${currentCurrency.color} rounded-full flex items-center justify-center`}>
                            <span className="text-white text-sm font-bold">{currentCurrency.icon}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{selectedCurrency} - {currentCurrency.name}</div>
                          </div>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.id} value={currency.id}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 ${currency.color} rounded-full flex items-center justify-center`}>
                                <span className="text-white text-xs font-bold">{currency.icon}</span>
                              </div>
                              <span>{currency.id} - {currency.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-3">
                    <div className="text-right text-xs text-gray-500 mb-1">134.72</div>
                    <Input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-right text-lg font-medium border-0 p-0 bg-transparent"
                    />
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-4">
                  Enter coupon code
                </div>
              </div>
            </div>

            {/* Swap Arrow */}
            <div className="flex justify-center items-center lg:col-span-1">
              <button className="p-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                <ArrowLeftRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Receive Section */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Receive</label>
                  <div className="relative">
                    <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                      <SelectTrigger className="w-full h-14 border-2 border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 ${currentCrypto.color} rounded-full flex items-center justify-center`}>
                            <span className="text-white text-sm font-bold">{currentCrypto.symbol}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{selectedCrypto} - {currentCrypto.name}</div>
                          </div>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(cryptoData).map(([symbol, data]) => (
                          <SelectItem key={symbol} value={symbol}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 ${data.color} rounded-full flex items-center justify-center`}>
                                <span className="text-white text-xs font-bold">{data.symbol}</span>
                              </div>
                              <span>{symbol} - {data.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-3">
                    <div className="text-right text-xs text-gray-500 mb-1">{receiveAmount}</div>
                    <div className="text-right text-lg font-medium">{receiveAmount}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Payment method</label>
                  <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                    <SelectTrigger className="w-full h-14 border-2 border-gray-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">{currentPayment.icon}</span>
                        </div>
                        <span className="font-medium">{currentPayment.name}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 ${method.color} rounded-lg flex items-center justify-center`}>
                              <span className="text-white text-xs">{method.icon}</span>
                            </div>
                            <span>{method.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg font-medium rounded-xl mt-6"
                >
                  Checkout now
                </Button>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Select Your Trade</h3>
              <p className="text-sm text-gray-600">Choose your crypto or fiat exchange type to buy, sell, or swap currencies directly.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">🛒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Set Up Your Trade</h3>
              <p className="text-sm text-gray-600">Specify your exchange amount and payment method. Move to secure checkout.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Finish Your Exchange</h3>
              <p className="text-sm text-gray-600">Follow simple instructions to complete your transaction quickly and securely.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="text-purple-600 hover:text-purple-700 font-medium">View more</button>
          </div>
        </div>
      </main>
    </div>
  );
}