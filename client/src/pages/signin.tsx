import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { SiGoogle, SiFacebook, SiX } from "react-icons/si";

export default function SignIn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-600 to-purple-700 flex flex-col">
      {/* Logo */}
      <div className="text-center pt-12 pb-8">
        <h1 className="text-white text-lg font-semibold tracking-wider">CHICKSX</h1>
      </div>

      {/* Sign In Form */}
      <div className="flex-1 px-6">
        <div className="text-center mb-8">
          <h2 className="text-white text-2xl font-semibold">Sign In</h2>
        </div>

        <form className="space-y-4 max-w-sm mx-auto">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm font-medium block">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="enter email address"
              className="w-full px-4 py-3 bg-white rounded-lg border-0 text-gray-900 placeholder:text-gray-500 text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white text-sm font-medium block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="enter password"
              className="w-full px-4 py-3 bg-white rounded-lg border-0 text-gray-900 placeholder:text-gray-500 text-sm"
            />
          </div>
          
          <div className="text-center text-sm pt-2">
            <a href="#" className="text-purple-200 hover:text-white">
              Forgot your password?
            </a>
          </div>

          <div className="text-center text-sm">
            <span className="text-purple-200">Don't have an account? </span>
            <button
              type="button"
              onClick={() => setLocation("/signup")}
              className="text-purple-200 hover:text-white underline"
            >
              Sign Up
            </button>
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-purple-400 hover:bg-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Sign In
            </Button>
          </div>
        </form>
        
        <div className="relative my-8 max-w-sm mx-auto">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-white/70">or</span>
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
            <SiX className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* ChicksX Group */}
        <div className="text-center pb-8">
          <p className="text-white/70 text-sm mb-4">ChicksX Group</p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">JK</span>
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-black text-sm font-bold">S</span>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <span className="text-red-600 text-sm font-bold">M</span>
            </div>
          </div>
          <p className="text-white/60 text-sm">One account to access all of ChicksX services</p>
        </div>
      </div>
    </div>
  );
}