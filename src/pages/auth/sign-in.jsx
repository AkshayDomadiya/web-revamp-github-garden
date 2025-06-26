import React, { useState } from "react";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For overall form error
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

    // Reset errors
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
    <section className="flex flex-col-reverse md:flex-row min-h-screen">
      {/* Left: Background Image */}
      <div
        className="hidden md:block md:w-1/2 h-64 md:h-[719px] bg-cover bg-center max-h-[719px]"
        style={{ backgroundImage: "url('/img/flat-lay-back-school-concept-with-copy-space.jpg')" }}
      />

      {/* Right: Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-tr from-white to-gray-100 p-4">
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-xl">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/img/logo.png" alt="Logo" className="h-32 w-auto" />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <Typography variant="h2" className="font-extrabold text-3xl text-blue-900">
              Welcome Back
            </Typography>
            <Typography variant="paragraph" className="mt-2 text-gray-500">
              Enter your credentials to access your account.
            </Typography>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <Input
                size="lg"
                type="text"
                label="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div>
              <Input
                size="lg"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <Button
              type="submit"
              fullWidth
              className="py-3 bg-blue-900 text-white font-semibold rounded-lg transition hover:bg-blue-800"
            >
              Sign In
            </Button>

            <div className="flex justify-between text-sm text-blue-500">
              <Link to="/auth/forgot-password" className="hover:underline">
                Forgot Password?
              </Link>
              <Link to="/auth/registration" className="hover:underline">
                Registration
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
