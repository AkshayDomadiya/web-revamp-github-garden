
import React, { useState } from "react";
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const users = [
    { email: "admin", password: "admin123", role: "admin" },
    { email: "user", password: "user123", role: "user" },
    { email: "hr", password: "hr123", role: "hr" },
    { email: "manager", password: "manager123", role: "manager" },
  ];

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Username is required");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto flex bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 items-center justify-center p-12 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center text-white">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <LockClosedIcon className="w-16 h-16" />
              </div>
              <Typography variant="h2" className="font-bold mb-4">
                Welcome Back
              </Typography>
              <Typography variant="lead" className="opacity-90">
                Sign in to access your employee dashboard and manage your work efficiently.
              </Typography>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Typography className="font-semibold">Time Tracking</Typography>
                <Typography className="text-sm opacity-80">Clock in/out easily</Typography>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Typography className="font-semibold">Leave Management</Typography>
                <Typography className="text-sm opacity-80">Request & track leaves</Typography>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Typography className="font-semibold">Task Management</Typography>
                <Typography className="text-sm opacity-80">Stay organized</Typography>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Typography className="font-semibold">Real-time Updates</Typography>
                <Typography className="text-sm opacity-80">Stay connected</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <Typography variant="h3" className="font-bold text-gray-900 mb-2">
                Sign In
              </Typography>
              <Typography className="text-gray-600">
                Enter your credentials to access your account
              </Typography>
            </div>

            {/* Demo Credentials */}
            <Card className="mb-6 bg-blue-50 border border-blue-200">
              <CardBody className="p-4">
                <Typography variant="small" className="font-semibold text-blue-900 mb-2">
                  Demo Credentials:
                </Typography>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-800">
                  <div>Admin: admin/admin123</div>
                  <div>User: user/user123</div>
                  <div>HR: hr/hr123</div>
                  <div>Manager: manager/manager123</div>
                </div>
              </CardBody>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <Typography variant="small" className="text-red-600 font-medium">
                  {error}
                </Typography>
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <div className="relative">
                  <Input
                    size="lg"
                    type="text"
                    label="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    className="pl-10"
                  />
                  <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {emailError && (
                  <Typography variant="small" className="text-red-500 mt-1">
                    {emailError}
                  </Typography>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                    className="pl-10 pr-10"
                  />
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <Typography variant="small" className="text-red-500 mt-1">
                    {passwordError}
                  </Typography>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Sign In
              </Button>

              <div className="flex justify-between text-sm">
                <Link 
                  to="/auth/forgot-password" 
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
                <Link 
                  to="/auth/registration" 
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  Register Company
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
