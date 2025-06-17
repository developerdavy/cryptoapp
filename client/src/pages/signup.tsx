import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const signupMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to sign up");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Account created!",
        description: "Welcome to ChicksX! Please sign in with your new account.",
        variant: "success",
      });
      setLocation("/signin");
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Unable to create your account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to create your account.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Your passwords don't match. Please check and try again.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Your password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    signupMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
        {/* Logo */}
        <div className="mb-8 lg:mb-12 ml-0 lg:ml-8">
          <img 
            src={chicksxLogo} 
            alt="ChicksX" 
            className="h-6 sm:h-8 cursor-pointer" 
            onClick={() => setLocation("/")}
          />
        </div>

        {/* Sign Up Form */}
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-blue-900 text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Sign Up</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-gray-800 text-sm font-medium mb-2 sm:mb-3">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 text-sm font-medium mb-2 sm:mb-3">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 text-sm font-medium mb-3">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-4 rounded-lg bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm pt-3">
              <a href="#" className="text-gray-600 hover:text-blue-800">
                Terms and conditions
              </a>
              <div className="text-gray-600">
                Already have an account? 
                <button
                  type="button"
                  onClick={() => setLocation("/signin")}
                  className="text-blue-800 hover:underline ml-1"
                >
                  Sign In
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 mt-8"
            >
              {signupMutation.isPending ? "Creating Account..." : "Sign up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            <div className="text-center text-gray-600 text-sm mb-6">Quick Setup</div>
            
            <div className="flex justify-center space-x-4">
              <button className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                <span className="text-white text-sm font-bold">f</span>
              </button>
              <button className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                <span className="text-white text-sm font-bold">t</span>
              </button>
              <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-white text-sm font-bold">G</span>
              </button>
            </div>
          </div>

          {/* Additional Service Icons */}
          <div className="flex justify-center space-x-3 mt-8">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm mt-6">
            Get account to access all of ChicksX services
          </div>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div className="w-1/2 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Stars */}
          <div className="absolute top-8 right-20 w-2 h-2 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-16 right-32 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-32 right-16 w-2 h-2 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-48 left-20 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute bottom-32 right-24 w-2 h-2 bg-white rounded-full opacity-80"></div>
          
          {/* Floating Orbs */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-pink-400 rounded-full opacity-80"></div>
          <div className="absolute top-40 left-16 w-12 h-12 bg-purple-400 rounded-full opacity-60"></div>
          
          {/* Abstract Shapes */}
          <div className="absolute top-20 left-1/3 w-32 h-8 bg-blue-300 rounded-full opacity-40 transform rotate-12"></div>
          <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-purple-300 rounded-full opacity-30"></div>
        </div>

        {/* Main Illustration Area */}
        <div className="absolute bottom-0 left-0 right-0 h-96">
          {/* Ground/Platform */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-400 to-transparent"></div>
          
          {/* Robot Character */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            {/* Robot body */}
            <div className="w-16 h-20 bg-yellow-400 rounded-t-full rounded-b-lg relative">
              {/* Robot face */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black rounded-full">
                <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Crypto Symbols */}
          <div className="absolute bottom-24 right-1/4 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">₿</span>
          </div>
          <div className="absolute bottom-32 left-1/4 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-700 font-bold text-xs">Ł</span>
          </div>
          <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <div className="absolute bottom-28 left-1/3 w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">X</span>
          </div>

          {/* Dome Structure */}
          <div className="absolute bottom-8 right-8 w-24 h-16 bg-white/20 border-2 border-white/30 rounded-t-full"></div>
          
          {/* Additional Elements */}
          <div className="absolute bottom-12 left-8 w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-16 left-20 w-6 h-6 bg-blue-300 rounded-full"></div>
        </div>

        {/* ChicksX Card/Badge */}
        <div className="absolute top-1/3 left-8 bg-white rounded-lg px-3 py-2 shadow-lg transform rotate-12">
          <div className="text-blue-800 font-bold text-sm">CHICKSX</div>
        </div>
      </div>
    </div>
  );
}