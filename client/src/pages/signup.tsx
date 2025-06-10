import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { SiGoogle, SiFacebook, SiX } from "react-icons/si";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signin logic here
    toast({
      title: "Success",
      description: "Signed in successfully!",
    });
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Layout */}
      <div className="block md:hidden min-h-screen bg-gradient-to-b from-purple-600 via-blue-600 to-purple-700 flex flex-col w-full">
        {/* Logo */}
        <div className="pt-8 pb-6 px-4 w-full">
          <div className="max-w-sm mx-auto">
            <img 
              src={chicksxLogo} 
              alt="ChicksX" 
              className="h-6 cursor-pointer" 
              onClick={() => setLocation("/")}
            />
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="flex-1 px-4 w-full">
          <div className="mb-6 w-full px-4">
            <h2 className="text-white text-xl font-semibold">Sign Up</h2>
          </div>

          <form onSubmit={handleSignUp} className="space-y-3 w-full px-4">
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label text-white" style={{fontSize: '12px'}}>
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  placeholder="enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{fontSize: '12px', borderRadius: '6px'}}
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label text-white" style={{fontSize: '12px'}}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  placeholder="enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{fontSize: '12px', borderRadius: '6px'}}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white" style={{fontSize: '12px'}}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{fontSize: '12px', borderRadius: '6px'}}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white" style={{fontSize: '12px'}}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{fontSize: '12px', borderRadius: '6px'}}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-white" style={{fontSize: '12px'}}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{fontSize: '12px', borderRadius: '6px'}}
              required
            />
          </div>

          <div className="text-center text-xs">
            <span className="text-purple-200">Already have an account? </span>
            <button
              type="button"
              onClick={handleSignIn}
              className="text-purple-200 hover:text-white underline"
            >
              Sign In
            </button>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                backgroundColor: '#a855f7',
                borderColor: '#a855f7',
                fontSize: '14px',
                borderRadius: '6px',
                padding: '10px 16px'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#9333ea'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#a855f7'}
            >
              Create Account
            </button>
          </div>
        </form>
        
        <div className="relative my-6 max-w-sm mx-auto">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-transparent text-white/70">or</span>
          </div>
        </div>
        
        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-3 mb-6">
          <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
            <SiGoogle className="w-4 h-4 text-white" />
          </button>
          <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
            <SiFacebook className="w-4 h-4 text-white" />
          </button>
          <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
            <SiX className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* ChicksX Group */}
        <div className="text-center pb-6">
          <p className="text-white/70 text-xs mb-3">ChicksX Group</p>
          <div className="flex justify-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">JK</span>
            </div>
            <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-black text-xs font-bold">S</span>
            </div>
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">M</span>
            </div>
          </div>
          <p className="text-white/60 text-xs">One account to access all of ChicksX services</p>
        </div>
      </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen relative bg-white">
        {/* Logo positioned on the gradient background */}
        <div className="absolute top-8 left-8 z-10">
          <img 
            src={chicksxLogo} 
            alt="ChicksX" 
            className="h-8 cursor-pointer" 
            onClick={() => setLocation("/")}
          />
        </div>
        
        {/* Left Side - Form */}
        <div className="w-1/2 bg-white flex flex-col justify-center px-16">

          <div className="max-w-md mx-auto w-full">
            <h1 className="text-gray-900 text-4xl font-bold mb-12">Sign In</h1>
            
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <button type="button" className="text-gray-600 hover:text-gray-800">
                  Forgot your password?
                </button>
                <div>
                  <span className="text-gray-600">Don't have an account? </span>
                  <button type="button" className="text-purple-600 hover:text-purple-700 font-medium">
                    Sign Up
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
              <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <SiFacebook className="w-5 h-5 text-white" />
              </button>
              <button className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <SiX className="w-5 h-5 text-white" />
              </button>
              <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <SiGoogle className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-center text-gray-600 text-sm mb-4">ChicksX Group</p>
              <div className="flex justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">JK</span>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
              </div>
              <p className="text-center text-gray-500 text-xs">One account to access all of ChicksX services</p>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 relative overflow-hidden">
          {/* Stars */}
          <div className="absolute top-8 right-16 text-white text-2xl">✦</div>
          <div className="absolute top-20 right-32 text-white text-lg">✦</div>
          <div className="absolute top-32 left-16 text-white text-lg">✦</div>
          <div className="absolute top-40 right-20 text-white text-sm">✦</div>
          <div className="absolute bottom-40 left-20 text-white text-lg">✦</div>
          
          {/* Top Floating Elements */}
          <div className="absolute top-8 right-8 w-20 h-20 bg-pink-500 rounded-full opacity-80"></div>
          <div className="absolute top-32 left-20 w-16 h-16 bg-purple-400 rounded-full opacity-60"></div>
          
          {/* Background Geometric Shapes */}
          <div className="absolute top-24 right-24 w-32 h-24 bg-blue-400/30 rounded-lg transform rotate-12"></div>
          <div className="absolute bottom-1/3 left-8 w-24 h-24 bg-purple-400/40 rounded-lg transform -rotate-12"></div>
          
          {/* Large Central Circle */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full"></div>
          
          {/* Platform/Ground Area */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-700/40 to-transparent"></div>
          
          {/* Robot Character */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
            {/* Robot Body */}
            <div className="w-16 h-20 bg-yellow-400 rounded-lg flex flex-col items-center justify-center relative">
              {/* Robot Eyes */}
              <div className="flex space-x-2 mb-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              {/* Robot Mouth */}
              <div className="w-4 h-1 bg-black rounded"></div>
            </div>
            
            {/* ChicksX Flag */}
            <div className="absolute -top-8 -left-6 bg-white px-2 py-1 rounded shadow-lg text-xs font-bold text-purple-600 transform -rotate-12">
              CHICKSX
            </div>
          </div>
          
          {/* Dome Structure */}
          <div className="absolute bottom-20 right-20 w-32 h-24 bg-white/10 rounded-t-full border-2 border-white/20"></div>
          
          {/* Crypto Currency Icons */}
          <div className="absolute bottom-16 right-16 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            ₿
          </div>
          <div className="absolute bottom-24 left-16 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            Ł
          </div>
          <div className="absolute bottom-12 right-32 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            M
          </div>
          <div className="absolute bottom-32 left-32 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            $
          </div>
          <div className="absolute bottom-28 right-40 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            X
          </div>
          
          {/* Additional Floating Elements */}
          <div className="absolute bottom-40 right-24 w-12 h-8 bg-blue-400/30 rounded transform rotate-45"></div>
          <div className="absolute bottom-36 left-24 w-8 h-8 bg-green-400/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}