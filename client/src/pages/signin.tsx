import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignIn() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const signinMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to sign in");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
      // Refresh user data after successful signin
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    signinMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-1/2 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 flex flex-col justify-center px-16">
        {/* Logo */}
        <div className="mb-16">
          <div className="text-white text-lg font-semibold tracking-widest cursor-pointer" onClick={() => setLocation("/")}>
            CHICKSX
          </div>
        </div>

        {/* Sign In Form */}
        <div className="max-w-xs">
          <h1 className="text-white text-2xl font-bold mb-10">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-200 text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-3 rounded-md bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-200 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-md bg-gray-100 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm mt-3">
              <a href="#" className="text-gray-300 hover:text-white">
                Forgot your password?
              </a>
              <div className="text-gray-300">
                Don't have an account? 
                <button
                  type="button"
                  onClick={() => setLocation("/signup")}
                  className="text-white hover:underline ml-1"
                >
                  Sign Up
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={signinMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-50 mt-6"
            >
              {signinMutation.isPending ? "Signing In..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-400"></div>
            <span className="px-3 text-gray-300 text-sm">or</span>
            <div className="flex-1 border-t border-gray-400"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            <div className="text-center text-gray-300 text-sm mb-4">Quick Setup</div>
            
            <div className="flex justify-center space-x-3">
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-white text-xs font-bold">f</span>
              </button>
              <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="text-white text-xs font-bold">t</span>
              </button>
              <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="text-white text-xs font-bold">G</span>
              </button>
            </div>
          </div>

          {/* Additional Service Icons */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
          </div>
          
          <div className="text-center text-gray-400 text-xs mt-4">
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
          <div className="text-purple-600 font-bold text-sm">CHICKSX</div>
        </div>
      </div>
    </div>
  );
}