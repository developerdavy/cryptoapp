import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { SiGoogle, SiFacebook, SiX } from "react-icons/si";

export default function SignIn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-600 flex items-center justify-center p-4">
      {/* Mobile Phone Container */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-80 h-[600px] bg-gradient-to-b from-purple-600 via-blue-600 to-purple-700 rounded-3xl p-6 shadow-2xl border-8 border-gray-800">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-white text-base font-semibold tracking-wider">CHICKSX</h1>
          </div>

          {/* Sign In Form */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-white text-lg font-semibold mb-4">Sign In</h2>
            </div>

            <form className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-white text-xs font-medium block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="enter email address"
                  className="w-full px-3 py-2 bg-white rounded border-0 text-gray-900 placeholder:text-gray-500 text-sm"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password" className="text-white text-xs font-medium block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="enter password"
                  className="w-full px-3 py-2 bg-white rounded border-0 text-gray-900 placeholder:text-gray-500 text-sm"
                />
              </div>
              
              <div className="text-center text-xs pt-1">
                <a href="#" className="text-purple-200 hover:text-white">
                  Forgot your password?
                </a>
              </div>

              <div className="text-center text-xs">
                <span className="text-purple-200">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setLocation("/signup")}
                  className="text-purple-200 hover:text-white underline"
                >
                  Sign Up
                </button>
              </div>
              
              <div className="pt-3">
                <Button
                  type="submit"
                  className="w-full bg-purple-400 hover:bg-purple-500 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Sign In
                </Button>
              </div>
            </form>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/70">or</span>
              </div>
            </div>
            
            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-3">
              <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <SiGoogle className="w-3 h-3 text-white" />
              </button>
              <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <SiFacebook className="w-3 h-3 text-white" />
              </button>
              <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <SiX className="w-3 h-3 text-white" />
              </button>
            </div>

            {/* ChicksX Group */}
            <div className="text-center mt-4">
              <p className="text-white/70 text-xs mb-2">ChicksX Group</p>
              <div className="flex justify-center space-x-2">
                <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">JK</span>
                </div>
                <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center">
                  <span className="text-black text-xs font-bold">S</span>
                </div>
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-red-600 text-xs font-bold">M</span>
                </div>
              </div>
              <p className="text-white/60 text-xs mt-2">One account to access all of ChicksX services</p>
            </div>
          </div>
        </div>
        
        {/* Phone Navigation Bar */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}