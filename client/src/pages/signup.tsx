import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { SiGoogle, SiFacebook, SiApple } from "react-icons/si";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

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
      setLocation("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900">
        <div className="min-h-screen flex flex-col px-6 py-8">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-white text-xl font-semibold tracking-wide">CHICKSX</h1>
          </div>

          {/* Sign In Title */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold">Sign In</h2>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500 pr-12"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-purple-300 text-sm hover:text-white">
                Forgot your password?
              </button>
            </div>

            {/* Don't have an account */}
            <div className="text-center">
              <span className="text-purple-300 text-sm">Don't have an account? </span>
              <button
                type="button"
                onClick={() => setLocation("/signup")}
                className="text-purple-300 text-sm hover:text-white underline"
              >
                Sign Up
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-transparent text-white/70 text-sm">or</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <SiGoogle className="w-5 h-5 text-white" />
            </button>
            <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <SiFacebook className="w-5 h-5 text-white" />
            </button>
            <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
              <SiApple className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* ChicksX Group */}
          <div className="text-center">
            <p className="text-white/70 text-sm mb-4">ChicksX Group</p>
            <div className="flex justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">AU</span>
              </div>
            </div>
            <p className="text-white/60 text-xs">One account to access all of ChicksX services</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block min-h-screen">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Side - Sign In Form */}
          <div className="bg-white flex flex-col px-12 py-8">
            {/* Logo */}
            <div className="mb-16">
              <h1 className="text-xl font-semibold tracking-wide text-gray-900">CHICKSX</h1>
            </div>
            
            {/* Form Container */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                  <div>
                    <label htmlFor="emailDesktop" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="emailDesktop"
                      type="email"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="passwordDesktop" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="passwordDesktop"
                      type="password"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <button type="button" className="text-gray-600 hover:text-gray-800">
                      Forgot your password?
                    </button>
                    <div>
                      <span className="text-gray-600">Don't have an account? </span>
                      <button
                        type="button"
                        onClick={() => setLocation("/signup")}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                  >
                    Sign In
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      type="button"
                      className="w-12 h-12 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                    >
                      <SiGoogle className="w-5 h-5 text-white" />
                    </button>
                    <button
                      type="button"
                      className="w-12 h-12 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                    >
                      <SiFacebook className="w-5 h-5 text-white" />
                    </button>
                    <button
                      type="button"
                      className="w-12 h-12 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                    >
                      <SiApple className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-4">ChicksX Group</p>
                    <div className="flex justify-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                        <span className="text-white text-sm font-bold">M</span>
                      </div>
                      <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                        <span className="text-white text-sm font-bold">C</span>
                      </div>
                      <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                        <span className="text-white text-sm font-bold">S</span>
                      </div>
                      <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                        <span className="text-white text-sm font-bold">P</span>
                      </div>
                      <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                        <span className="text-white text-sm font-bold">AU</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs">One account to access all of ChicksX services</p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side - Deep Blue Background */}
          <div className="bg-blue-900">
          </div>
        </div>
      </div>
    </div>
  );
}