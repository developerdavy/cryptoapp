import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";

interface PesapalResponse {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
  error?: any;
  status: string;
}

export default function Checkout() {
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("KE");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Only redirect if explicitly not authenticated, not during loading
    if (isAuthenticated === false) {
      setLocation("/login");
      return;
    }
    
    if (user) {
      setEmail((user as any).email || "");
      setFirstName((user as any).firstName || "");
      setLastName((user as any).lastName || "");
    }
  }, [isAuthenticated, user, setLocation]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      });
      return;
    }

    if (!walletAddress.trim()) {
      toast({
        title: "Wallet Address Required",
        description: "Please enter your wallet address for crypto transfer",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/payment/pesapal/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency,
          email,
          firstName,
          lastName,
          phone,
          walletAddress,
          address,
          city,
          country,
        }),
      });

      const data: PesapalResponse = await response.json();

      if (response.ok && data.redirect_url) {
        // Redirect to Pesapal payment page
        window.location.href = data.redirect_url;
      } else {
        throw new Error(data.error?.message || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isAuthenticated === false) {
    return null; // Will redirect to login
  }

  // Show loading state while authentication is being checked
  if (isAuthenticated === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 sm:p-3 rounded-full transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline font-medium">Back</span>
              </Button>
              <img src={chicksxLogo} alt="ChicksX" className="h-7 sm:h-10" />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base text-green-700 bg-green-50 px-3 py-2 rounded-full border border-green-200">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <span className="hidden sm:inline font-medium">Secure Checkout</span>
              <span className="sm:hidden font-medium">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 ring-1 ring-blue-100 w-full">
          <CardHeader className="px-6 sm:px-8 py-6 sm:py-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-xl sm:text-2xl text-white">
              <div className="p-2 bg-white/20 rounded-full">
                <CreditCard className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="font-semibold">Payment Details</span>
            </CardTitle>
            <p className="text-blue-100 text-sm sm:text-base mt-2">Complete your secure cryptocurrency purchase</p>
          </CardHeader>
          <CardContent className="px-6 sm:px-8 py-8">
            <form onSubmit={handlePayment} className="space-y-4 sm:space-y-6">
              {/* Amount Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    Transaction Amount
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Amount
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="text-lg sm:text-xl h-12 sm:h-14 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl"
                      />
                    </div>
                    <div className="w-full sm:w-40">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Currency
                      </label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="h-12 sm:h-14 border-2 border-blue-200 focus:border-blue-500 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">🇺🇸 USD</SelectItem>
                          <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                          <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                          <SelectItem value="KES">🇰🇪 KES</SelectItem>
                          <SelectItem value="UGX">🇺🇬 UGX</SelectItem>
                          <SelectItem value="TZS">🇹🇿 TZS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    Billing Information
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="h-12 sm:h-14 border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="h-12 sm:h-14 border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 sm:h-14 border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+254xxxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="h-12 sm:h-14 border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your street address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="h-12 sm:h-14 border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City
                        </label>
                        <Input
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="h-12 sm:h-14 border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Country
                        </label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger className="h-12 sm:h-14 border-2 border-green-200 focus:border-green-500 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KE">🇰🇪 Kenya</SelectItem>
                            <SelectItem value="UG">🇺🇬 Uganda</SelectItem>
                            <SelectItem value="TZ">🇹🇿 Tanzania</SelectItem>
                            <SelectItem value="RW">🇷🇼 Rwanda</SelectItem>
                            <SelectItem value="US">🇺🇸 United States</SelectItem>
                            <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                            <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                            <SelectItem value="AU">🇦🇺 Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-purple-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    Wallet Address
                  </h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Crypto Wallet Address
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your wallet address (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      required
                      className="h-12 sm:h-14 font-mono text-sm border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 rounded-xl"
                    />
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-purple-700 flex items-start">
                        <span className="text-purple-500 mr-2">💡</span>
                        Enter the wallet address where your cryptocurrency or funds will be transferred after successful payment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 sm:p-6 border border-orange-200">
                  <h3 className="text-lg sm:text-xl font-semibold text-orange-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white border-2 border-orange-200 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-6 h-6 text-orange-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-orange-900 text-base">Multiple Payment Options</p>
                          <p className="text-sm text-orange-700">Credit/Debit Cards, M-Pesa, Bank Transfer via Pesapal</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm text-orange-700 flex items-start">
                        <span className="text-orange-500 mr-2">📋</span>
                        Complete billing address required for card payments
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-4 pt-4">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 sm:py-5 text-lg sm:text-xl font-semibold h-14 sm:h-16 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>Pay {currency} {amount || "0.00"}</span>
                    </div>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-semibold">256-bit SSL Encryption</span>
                    </div>
                    <p className="text-xs text-gray-600">Your payment information is encrypted and secure.</p>
                    <p className="text-xs text-gray-500">Powered by Pesapal - Africa's leading payment gateway.</p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}