"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Hook Form ইম্পোর্ট
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

interface ISignInInput {
  email: string;
  password: string;
  remember: boolean;
}

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // React Hook Form কনফিগ
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInInput>();

  // সাবমিট ফাংশন
  const onSubmit = (data: ISignInInput) => {
    console.log("Login Data:", data);
    alert("Check console for data!");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin flex items-center justify-center min-h-screen px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-12">
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <h1 className="text-dark-gray mb-4">Welcome back</h1>
          <p className="text-medium-gray mb-8 leading-relaxed max-w-85">
            Join us on the journey towards a sustainable web by login now
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="subheading text-dark-gray block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-ghost-white"
                } bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="subheading text-dark-gray block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.password ? "border-red-500" : "border-ghost-white"
                  } bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="w-4 h-4 rounded border-gray-300 accent-primary"
                />
                <span className="text-sm text-medium-gray">
                  Remember for 30 days
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Forget password
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-teal-dark text-white py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              Sign in
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-100 py-3.5 rounded-full font-medium text-dark-gray hover:bg-gray-50 transition-all shadow-sm"
            >
              <FcGoogle className="text-xl" />
              Sign in With Google
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-medium-gray">
            Don't have an account?{" "}
            <a href="#" className="text-primary font-bold hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="hidden lg:block w-1/2 relative">
          <Image
            src="/loginsidebar.png"
            alt="Sustainability Illustration"
            width={659}
            height={833}
            className="object-contain mix-blend-multiply"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
