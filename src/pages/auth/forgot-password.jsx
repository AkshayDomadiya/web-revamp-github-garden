import React, { useState } from "react";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    // TODO: Add reset logic (API call)
    navigate("/auth/sign-in");
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
        <div className="w-full max-w-sm p-6 sm:p-10 bg-white rounded-xl shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/img/logo.png" alt="Logo" className="h-32 w-auto" />
          </div>
          <div className="text-center mb-8">
            <Typography variant="h2" className="font-extrabold text-3xl text-blue-900">
              Forgot Password
            </Typography>
            <Typography variant="paragraph" className="mt-2 text-gray-500">
              Enter your email and we'll send a reset link.
            </Typography>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
            <Input
              size="lg"
              type="email"
              label="Email Address"
              // placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <Button
              type="submit"
              fullWidth
              className="py-3 bg-blue-900 text-white font-semibold rounded-lg transition hover:bg-blue-800 hover:shadow-lg"
            >
              Reset Password
            </Button>

            <div className="text-center text-sm text-blue-500 mt-4">
              <Link to="/auth/sign-in" className="hover:underline">
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
