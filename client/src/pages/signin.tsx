import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { SiGoogle, SiFacebook, SiX } from "react-icons/si";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignIn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-600 to-purple-700 flex flex-col">
      {/* Logo */}
      <div className="pt-8 pb-6 px-6">
        <div className="max-w-sm mx-auto">
          <img 
            src={chicksxLogo} 
            alt="ChicksX" 
            className="h-6 cursor-pointer" 
            onClick={() => setLocation("/")}
          />
        </div>
      </div>

      {/* Sign In Form */}
      <div className="flex-1 px-6">
        <div className="mb-6 max-w-sm mx-auto">
          <h2 className="text-white text-xl font-semibold">Sign In</h2>
        </div>

        <form className="space-y-3 max-w-sm mx-auto">
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white" style={{fontSize: '12px'}}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="enter email address"
              style={{fontSize: '12px', borderRadius: '6px'}}
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
              style={{fontSize: '12px', borderRadius: '6px'}}
            />
          </div>
          
          <div className="text-center text-xs pt-2">
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
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-purple-400 hover:bg-purple-500 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm"
            >
              Sign In
            </Button>
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
  );
}