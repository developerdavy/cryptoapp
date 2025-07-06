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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                className="text-gray-600 hover:text-gray-900 p-1 sm:p-2"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <img src={chicksxLogo} alt="ChicksX" className="h-6 sm:h-8" />
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Secure Checkout</span>
              <span className="sm:hidden">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Card className="bg-white w-full">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Payment Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handlePayment} className="space-y-4 sm:space-y-6">
              {/* Amount Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Transaction Amount</h3>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="text-base sm:text-lg h-10 sm:h-12"
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="KES">KES</SelectItem>
                        <SelectItem value="UGX">UGX</SelectItem>
                        <SelectItem value="TZS">TZS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Billing Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="h-10 sm:h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="h-10 sm:h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 sm:h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+254xxxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-10 sm:h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <Input
                    type="text"
                    placeholder="Street address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="h-10 sm:h-12"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="h-10 sm:h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KE">Kenya</SelectItem>
                        <SelectItem value="UG">Uganda</SelectItem>
                        <SelectItem value="TZ">Tanzania</SelectItem>
                        <SelectItem value="RW">Rwanda</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Wallet Address</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crypto Wallet Address
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your wallet address (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                    className="h-10 sm:h-12 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the wallet address where your cryptocurrency or funds will be transferred
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Payment Method</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-900 text-sm sm:text-base">Multiple Payment Options</p>
                      <p className="text-xs sm:text-sm text-blue-700">Credit/Debit Cards, M-Pesa, Bank Transfer via Pesapal</p>
                      <p className="text-xs text-blue-600 mt-1">Complete billing address required for card payments</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 text-base sm:text-lg font-medium h-12 sm:h-14"
              >
                {isProcessing ? "Processing..." : `Pay ${currency} ${amount || "0.00"}`}
              </Button>

              {/* Security Notice */}
              <div className="text-center text-xs sm:text-sm text-gray-500 space-y-1">
                <p>Your payment information is encrypted and secure.</p>
                <p>Powered by Pesapal - Africa's leading payment gateway.</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}