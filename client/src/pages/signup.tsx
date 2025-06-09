import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (email && password && firstName && lastName) {
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      setLocation("/signin");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const handleSignIn = () => {
    setLocation("/signin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign Up Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center">
            <img src={chicksxLogo} alt="ChicksX" className="h-8" />
          </div>

          {/* Sign Up Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Sign Up</h1>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={handleSignIn}
                className="text-gray-600 hover:text-purple-600"
              >
                Already have an account? Sign In
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium rounded-lg"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3">
            <div className="flex justify-center space-x-4">
              <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                <span className="font-bold">f</span>
              </button>
              <button className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500">
                <span className="font-bold">t</span>
              </button>
              <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700">
                <span className="font-bold">G</span>
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-3">ChicksX Group</p>
              <div className="flex justify-center space-x-2">
                <button className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">
                  A
                </button>
                <button className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
                  M
                </button>
                <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                  G
                </button>
                <button className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  S
                </button>
                <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
                  NG
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Use account to access all of ChicksX services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Same Animated Background as Sign In */}
      <div className="w-1/2 bg-gradient-to-br from-purple-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Stars */}
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-white rounded-full opacity-90"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full opacity-80"></div>

          {/* Large Circles */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-600 rounded-full opacity-30"></div>
          <div className="absolute bottom-32 left-32 w-48 h-48 bg-blue-600 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500 rounded-full opacity-15"></div>

          {/* Platform with Robot */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-800 to-transparent"></div>
          
          {/* Robot Character Area */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            <div className="text-center">
              {/* Robot representation */}
              <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-1"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
              
              {/* Flag */}
              <div className="w-8 h-6 bg-white rounded-sm mx-auto mb-2 flex items-center justify-center">
                <img src={chicksxLogo} alt="ChicksX" className="h-3" />
              </div>
            </div>
          </div>

          {/* Dome Structure */}
          <div className="absolute bottom-20 right-1/4 w-32 h-16 border-4 border-white rounded-t-full opacity-60"></div>
          
          {/* Cryptocurrency Icons */}
          <div className="absolute bottom-40 right-20 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            ₿
          </div>
          <div className="absolute bottom-48 right-32 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
            L
          </div>
          <div className="absolute bottom-36 right-40 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            M
          </div>
          <div className="absolute bottom-52 left-20 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
        </div>
      </div>
    </div>
  );
}