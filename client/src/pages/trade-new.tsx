import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";

const cryptoData = {
  BTC: { name: "Bitcoin", symbol: "₿", color: "bg-orange-500" },
  ETH: { name: "Ethereum", symbol: "Ξ", color: "bg-blue-500" },
  ADA: { name: "Cardano", symbol: "₳", color: "bg-blue-600" },
  DOT: { name: "Polkadot", symbol: "⬢", color: "bg-pink-500" },
  SOL: { name: "Solana", symbol: "◎", color: "bg-purple-500" },
};

const paymentMethods = [
  { id: "card", name: "Debit/Credit", icon: "💳", color: "bg-blue-600" },
  { id: "google", name: "Google Pay", icon: "G", color: "bg-red-500" },
  { id: "apple", name: "Apple Pay", icon: "A", color: "bg-black" },
  { id: "paypal", name: "PayPal", icon: "P", color: "bg-purple-600" },
];

export default function Trade() {
  const params = useParams();
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("Buy");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [selectedPayment, setSelectedPayment] = useState("card");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
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
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center">
            <span className="mr-2">👤</span>
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Trading Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
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
                    <Select value="CAD">
                      <SelectTrigger className="w-full h-14 border-2 border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">🍁</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium">CAD - CA Dollar</div>
                          </div>
                        </div>
                      </SelectTrigger>
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
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-12 border-2 border-gray-200 rounded-xl text-lg font-medium"
                  />
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

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg font-medium rounded-xl mt-6">
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