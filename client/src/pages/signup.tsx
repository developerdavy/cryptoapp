import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { SiGoogle, SiFacebook, SiX } from "react-icons/si";
import chicksxLogo from "@assets/chicksx-main-logo-hover_1749112747335.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignUp() {
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

      {/* Sign Up Form */}
      <div className="flex-1 px-6">
        <div className="mb-6 max-w-sm mx-auto">
          <h2 className="text-white text-xl font-semibold">Sign Up</h2>
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

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-white" style={{fontSize: '12px'}}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="confirm password"
              style={{fontSize: '12px', borderRadius: '6px'}}
            />
          </div>
          
          <div className="text-center text-xs pt-2">
            <a href="#" className="text-purple-200 hover:text-white">
              Forgot your password?
            </a>
          </div>

          <div className="text-center text-xs">
            <span className="text-purple-200">Already have an account? </span>
            <button
              type="button"
              onClick={() => setLocation("/signin")}
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
              Sign Up
            </button>
          </div>
        </form>
        
        <div className="relative my-6 max-w-sm mx-auto">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-purple-300/30" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-purple-200">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-3 max-w-sm mx-auto">
          <button
            type="button"
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
            style={{
              fontSize: '12px',
              borderRadius: '6px',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              backgroundColor: 'transparent'
            }}
          >
            <SiGoogle className="me-2" size={14} />
            Continue with Google
          </button>
          
          <button
            type="button"
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
            style={{
              fontSize: '12px',
              borderRadius: '6px',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              backgroundColor: 'transparent'
            }}
          >
            <SiFacebook className="me-2" size={14} />
            Continue with Facebook
          </button>
          
          <button
            type="button"
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
            style={{
              fontSize: '12px',
              borderRadius: '6px',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              backgroundColor: 'transparent'
            }}
          >
            <SiX className="me-2" size={12} />
            Continue with X
          </button>
        </div>
      </div>
    </div>
  );
}