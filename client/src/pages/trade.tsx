import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useParams, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
  XRP: { name: "XRP", symbol: "X", price: 0.587, change: 1.23, color: "bg-blue-700" },
  DOGE: { name: "Dogecoin", symbol: "D", price: 0.087, change: -0.56, color: "bg-yellow-700" },
  AVAX: { name: "Avalanche", symbol: "A", price: 25.67, change: 2.78, color: "bg-teal-600" },
  MATIC: { name: "Polygon", symbol: "M", price: 0.789, change: 1.45, color: "bg-indigo-600" },
  DOT: { name: "Polkadot", symbol: "D", price: 7.89, change: -1.78, color: "bg-pink-600" },
  LTC: { name: "Litecoin", symbol: "L", price: 78.45, change: 0.89, color: "bg-gray-500" },
  UNI: { name: "Uniswap", symbol: "U", price: 6.78, change: 2.34, color: "bg-purple-700" },
  LINK: { name: "Chainlink", symbol: "L", price: 14.56, change: 1.67, color: "bg-blue-800" },
  ATOM: { name: "Cosmos", symbol: "A", price: 12.34, change: 2.45, color: "bg-orange-600" },
  ALGO: { name: "Algorand", symbol: "A", price: 0.234, change: 1.89, color: "bg-cyan-600" },
  ICP: { name: "Internet Computer", symbol: "I", price: 5.67, change: -2.34, color: "bg-red-600" },
  FTT: { name: "FTX Token", symbol: "F", price: 2.34, change: 3.45, color: "bg-emerald-600" },
  APE: { name: "ApeCoin", symbol: "A", price: 4.56, change: -1.23, color: "bg-violet-600" },
  NEAR: { name: "NEAR Protocol", symbol: "N", price: 3.45, change: 2.67, color: "bg-slate-600" },
  MANA: { name: "Decentraland", symbol: "M", price: 0.567, change: 1.45, color: "bg-blue-900" },
  SAND: { name: "The Sandbox", symbol: "S", price: 0.678, change: 2.34, color: "bg-green-600" },
  CRO: { name: "Cronos", symbol: "C", price: 0.089, change: -0.67, color: "bg-indigo-800" },
  HBAR: { name: "Hedera", symbol: "H", price: 0.067, change: 1.89, color: "bg-orange-700" },
  THETA: { name: "Theta", symbol: "T", price: 1.23, change: 2.45, color: "bg-purple-800" },
  FLOW: { name: "Flow", symbol: "F", price: 0.789, change: -1.34, color: "bg-red-700" },
  EGLD: { name: "MultiversX", symbol: "E", price: 34.56, change: 2.78, color: "bg-teal-700" },
  XTZ: { name: "Tezos", symbol: "X", price: 0.987, change: 1.23, color: "bg-indigo-700" },
  GRT: { name: "The Graph", symbol: "G", price: 0.156, change: 2.34, color: "bg-cyan-700" },
  "1INCH": { name: "1inch", symbol: "1", price: 0.456, change: 1.67, color: "bg-emerald-700" },
  CAKE: { name: "PancakeSwap", symbol: "C", price: 2.34, change: 3.45, color: "bg-rose-600" },
  ENJ: { name: "Enjin Coin", symbol: "E", price: 0.234, change: 1.89, color: "bg-lime-600" },
  AAVE: { name: "Aave", symbol: "A", price: 78.45, change: 2.67, color: "bg-amber-600" },
  COMP: { name: "Compound", symbol: "C", price: 45.67, change: -1.23, color: "bg-violet-700" },
  MKR: { name: "Maker", symbol: "M", price: 1234.56, change: 2.89, color: "bg-sky-600" },
  SNX: { name: "Synthetix", symbol: "S", price: 2.45, change: 1.67, color: "bg-fuchsia-600" },
  YFI: { name: "yearn.finance", symbol: "Y", price: 6789.12, change: 3.45, color: "bg-stone-600" },
  BAT: { name: "Basic Attention Token", symbol: "B", price: 0.234, change: 1.89, color: "bg-zinc-600" },
  ZRX: { name: "0x", symbol: "Z", price: 0.345, change: 2.34, color: "bg-neutral-600" },
  KNC: { name: "Kyber Network", symbol: "K", price: 0.789, change: -1.45, color: "bg-pink-700" },
  REN: { name: "Ren", symbol: "R", price: 0.067, change: 2.78, color: "bg-red-800" },
  LRC: { name: "Loopring", symbol: "L", price: 0.234, change: 1.23, color: "bg-blue-900" },
  BAND: { name: "Band Protocol", symbol: "B", price: 1.45, change: 2.67, color: "bg-green-800" },
  SUSHI: { name: "SushiSwap", symbol: "S", price: 0.789, change: 1.89, color: "bg-yellow-800" },
  CEL: { name: "Celsius", symbol: "C", price: 0.234, change: -2.34, color: "bg-orange-800" },
  OMG: { name: "OMG Network", symbol: "O", price: 0.567, change: 1.45, color: "bg-teal-800" },
  QNT: { name: "Quant", symbol: "Q", price: 89.12, change: 3.67, color: "bg-purple-900" },
  FTM: { name: "Fantom", symbol: "F", price: 0.234, change: 2.45, color: "bg-emerald-800" },
  CHZ: { name: "Chiliz", symbol: "C", price: 0.089, change: 1.78, color: "bg-rose-800" }
};

const paymentMethods = [
  { id: "card", name: "Debit/Credit", icon: "💳", color: "bg-blue-600" },
  { id: "google", name: "Google Pay", icon: "G", color: "bg-red-500" },
  { id: "apple", name: "Apple Pay", icon: "A", color: "bg-black" },
  { id: "interac", name: "Interac", icon: "I", color: "bg-orange-500" },
  { id: "sepa", name: "SEPA", icon: "S", color: "bg-blue-800" },
  { id: "paypal", name: "PayPal", icon: "P", color: "bg-purple-600" },
  { id: "wire", name: "Wire Transfer", icon: "W", color: "bg-green-600" },
  { id: "bank", name: "Bank Transfer", icon: "B", color: "bg-yellow-600" },
  { id: "visa", name: "Visa", icon: "V", color: "bg-indigo-600" },
  { id: "mastercard", name: "Mastercard", icon: "M", color: "bg-orange-600" }
];

export default function Trade() {
  const params = useParams();
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("Buy");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [amount, setAmount] = useState("");
  const [couponCode, setCouponCode] = useState("");

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

  const calculateReceiveAmount = () => {
    if (!amount || isNaN(Number(amount))) return "0.00";
    const amountNum = Number(amount);
    const cryptoAmount = amountNum / currentCrypto.price;
    return cryptoAmount.toFixed(6);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <img src={chicksxLogo} alt="ChicksX" className="h-10" />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Trading Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit mb-8">
          <button
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "Buy"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("Buy")}
          >
            Buy
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "Sell"
                ? "bg-gray-800 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("Sell")}
          >
            Sell
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === "Swap"
                ? "bg-gray-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("Swap")}
          >
            Swap
          </button>
        </div>

        {/* Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Currency Selection */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === "Buy" ? "Spend" : activeTab === "Sell" ? "Receive" : "From"}
              </label>
              <div className="relative">
                <Select value={activeTab === "Buy" ? "USD" : selectedCrypto} onValueChange={activeTab === "Buy" ? undefined : setSelectedCrypto}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center space-x-3">
                      {activeTab === "Buy" ? (
                        <>
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">$</span>
                          </div>
                          <span>USD - US Dollar</span>
                        </>
                      ) : (
                        <>
                          <div className={`w-8 h-8 ${currentCrypto.color} rounded-full flex items-center justify-center`}>
                            <span className="text-white text-sm font-bold">{currentCrypto.symbol}</span>
                          </div>
                          <span>{selectedCrypto} - {currentCrypto.name}</span>
                        </>
                      )}
                    </div>
                  </SelectTrigger>
                  {activeTab !== "Buy" && (
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
                  )}
                </Select>
              </div>
              <Input
                type="number"
                placeholder="24.96777"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-3 text-lg font-medium"
              />
            </div>

            {/* Swap Arrow */}
            <div className="flex justify-center">
              <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
                <ArrowLeftRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === "Buy" ? "Receive" : activeTab === "Sell" ? "Spend" : "To"}
              </label>
              <div className="relative">
                <Select value={activeTab === "Buy" ? selectedCrypto : "USD"} onValueChange={activeTab === "Buy" ? setSelectedCrypto : undefined}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center space-x-3">
                      {activeTab === "Buy" ? (
                        <>
                          <div className={`w-8 h-8 ${currentCrypto.color} rounded-full flex items-center justify-center`}>
                            <span className="text-white text-sm font-bold">{currentCrypto.symbol}</span>
                          </div>
                          <span>{selectedCrypto} - {currentCrypto.name}</span>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">$</span>
                          </div>
                          <span>USD - US Dollar</span>
                        </>
                      )}
                    </div>
                  </SelectTrigger>
                  {activeTab === "Buy" && (
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
                  )}
                </Select>
              </div>
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg font-medium text-gray-900">
                  {activeTab === "Buy" ? calculateReceiveAmount() : amount || "0.00"}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment method</label>
              <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${currentPayment.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-sm font-bold">{currentPayment.icon}</span>
                    </div>
                    <span>{currentPayment.name}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 ${method.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{method.icon}</span>
                        </div>
                        <span>{method.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Coupon Code */}
            <div>
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>

            {/* Checkout Button */}
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg font-semibold">
              Checkout now
            </Button>
          </div>

          {/* Right Column - Process Steps */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Select Your Trade</h3>
                      <p className="text-sm text-gray-600">
                        Choose your crypto or fiat exchange type to buy, sell, or swap currencies directly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Set Up Your Trade</h3>
                      <p className="text-sm text-gray-600">
                        Specify your exchange amount and payment method. Move to secure checkout.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Finish Your Exchange</h3>
                      <p className="text-sm text-gray-600">
                        Follow simple instructions to complete your transaction quickly and securely.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Price Info */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Current {currentCrypto.name} Price</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${currentCrypto.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-lg font-bold">{currentCrypto.symbol}</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${currentCrypto.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">{selectedCrypto}/USD</div>
                    </div>
                  </div>
                  <Badge
                    variant={currentCrypto.change >= 0 ? "default" : "destructive"}
                    className={`${
                      currentCrypto.change >= 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentCrypto.change >= 0 ? "+" : ""}{currentCrypto.change}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* View More Link */}
            <div className="text-center">
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View more
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
