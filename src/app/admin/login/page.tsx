"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Loader2,
  AlertCircle 
} from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminConfig, setAdminConfig] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    loadAdminConfig();
  }, []);

  const loadAdminConfig = async () => {
    try {
      const response = await fetch('/site-data.json');
      const data = await response.json();
      setAdminConfig(data.admin);
    } catch (err) {
      console.error('Error loading admin config:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!adminConfig) {
      setError("Admin configuration not loaded");
      setIsLoading(false);
      return;
    }

    if (email === adminConfig.email && password === adminConfig.password) {
      // Store auth in localStorage
      localStorage.setItem('adminAuth', JSON.stringify({
        email: adminConfig.email,
        name: adminConfig.name,
        loginTime: new Date().toISOString()
      }));
      
      router.push('/admin/dashboard');
    } else {
      setError(`Invalid credentials. Use ${adminConfig.email} / ${adminConfig.password}`);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Nexus AI
          </h1>
          <p className="text-purple-200 text-lg">
            Admin Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={adminConfig?.email || "admin@nexusai.com"}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          {adminConfig && (
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-purple-200 text-sm font-medium mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-purple-300">
                <p>Email: {adminConfig.email}</p>
                <p>Password: {adminConfig.password}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-200 text-sm">
            © 2024 Nexus AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
