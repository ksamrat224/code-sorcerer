"use client";
import { signIn } from "@/lib/auth-client";
import { GithubIcon } from "lucide-react";
import { useState } from "react";

const LoginUI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "github",
      });
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Section - Hero Content */}
      <div className="flex-1 flex flex-col justify-center px-16 py-12">
        <div className="max-w-lg">
          {/* Logo */}
          <div className="flex items-center gap-2  mb-16">
            <div className="w-6 h-6 bg-amber-100 rounded-full"></div>
            <span className="text-lg font-semibold">Syntax Sorcerer</span>
          </div>

          {/* Main Content */}
          <h1 className="text-5xl font-bold mb-6 leading-tight text-balance">
            Cut Code Review
            <br />
            Time & Bugs in Half.
            <br />
            Instantly.
          </h1>

          <p className="text-sm text-gray-400 leading-relaxed">
            Supercharge your team to ship faster with the most advanced AI code
            reviews.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-16 py-12">
        <div className="w-full max-w-xs">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className=" text-gray-400">
              Login using the following provider:
            </p>
          </div>

          {/* GitHub Login Button */}
          <button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 font-medium text-sm"
          >
            <GithubIcon className="w-4 h-4" />
            {isLoading ? "Signing in..." : "GitHub"}
          </button>

          {/* Footer Links */}
          <div className="mt-8 space-y-2 text-center text-sm text-gray-400">
            <div>
              New to Syntax Sorcerer?{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign Up
              </a>
            </div>
            <div>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Self-Hosted Services
              </a>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-16 pt-6 border-t border-gray-800 flex justify-center gap-2 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400">
              Terms of Use
            </a>
            <span>and</span>
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
