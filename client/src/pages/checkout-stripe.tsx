import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_live_51RMNcNBrrPDbfGQam0kV7ZCBHS0PEMLoeI8bVEPAeaxxBmTpyQKhjq9B4SJRjRf2rmOuNBIJjH9sbNShClxyOXGT00EsyvMpwb';
const stripePromise = loadStripe(stripePublicKey);

interface CheckoutFormProps {
  clientSecret: string;
  paymentIntentId: string;
  amount: string;
  cryptocurrency: string;
  receiveAmount: string;
  onSuccess: () => void;
}

const CheckoutForm = ({ 
  clientSecret, 
  paymentIntentId, 
  amount, 
  cryptocurrency, 
  receiveAmount,
  onSuccess 
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/dashboard",
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Payment succeeded, confirm with backend
        const response = await apiRequest("POST", "/api/confirm-payment", {
          paymentIntentId,
        });

        if (response.ok) {
          const result = await response.json();
          toast({
            title: "Payment Successful!",
            description: `You've successfully purchased ${result.cryptoAmount.toFixed(8)} ${cryptocurrency}`,
          });
          onSuccess();
        } else {
          throw new Error("Failed to confirm payment");
        }
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Amount:</span>
            <span>${amount}</span>
          </div>
          <div className="flex justify-between">
            <span>You'll receive:</span>
            <span>{receiveAmount} {cryptocurrency}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total:</span>
            <span>${amount}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Payment Details</h3>
        <PaymentElement />
      </div>

      <Button 
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span>Processing...</span>
          </div>
        ) : (
          `Pay $${amount}`
        )}
      </Button>
    </form>
  );
};

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  // Get checkout data from URL params or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get('amount') || localStorage.getItem('checkout_amount') || '100';
  const cryptocurrency = urlParams.get('crypto') || localStorage.getItem('checkout_crypto') || 'BTC';
  const currency = urlParams.get('currency') || localStorage.getItem('checkout_currency') || 'USD';
  const receiveAmount = urlParams.get('receive') || localStorage.getItem('checkout_receive') || '0.002';

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", {
          amount: parseFloat(amount),
          currency: currency.toLowerCase(),
          cryptocurrency,
        });

        if (response.ok) {
          const data = await response.json();
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create payment intent");
        }
      } catch (error: any) {
        console.error("Error creating payment intent:", error);
        setError(error.message || "Failed to load payment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, currency, cryptocurrency]);

  const handleSuccess = () => {
    setPaymentSuccess(true);
    // Clean up localStorage
    localStorage.removeItem('checkout_amount');
    localStorage.removeItem('checkout_crypto');
    localStorage.removeItem('checkout_currency');
    localStorage.removeItem('checkout_receive');
    
    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 3000);
  };

  const handleBack = () => {
    window.location.href = '/dashboard';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              You've successfully purchased {receiveAmount} {cryptocurrency}
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Unable to load payment</h2>
            <p className="text-gray-600 mb-4">
              {error || "There was an error setting up your payment. Please try again."}
            </p>
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Trade
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            onClick={handleBack}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Trade
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your cryptocurrency purchase
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">$</span>
              </div>
              <span>Buy {cryptocurrency}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Elements 
              stripe={stripePromise} 
              options={{ 
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#7c3aed',
                  },
                },
              }}
            >
              <CheckoutForm 
                clientSecret={clientSecret}
                paymentIntentId={paymentIntentId}
                amount={amount}
                cryptocurrency={cryptocurrency}
                receiveAmount={receiveAmount}
                onSuccess={handleSuccess}
              />
            </Elements>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}