"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

// ১. সাইন-আপ ফর্মের ডেটার জন্য ইন্টারফেস
interface ISignUpInput {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpInput>();

  // ২. সাইন-আপ সাবমিট হ্যান্ডলার
  const onSubmit: SubmitHandler<ISignUpInput> = (data) => {
    console.log("Sign Up Data:", data);
  };

  return (
    <div className="signin flex items-center justify-center min-h-screen px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-12">
        {/* Left Side: Sign Up Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <h1 className="text-dark-gray mb-4 text-4xl font-bold">
            Create account
          </h1>
          <p className="text-medium-gray mb-8 leading-relaxed max-w-85">
            Join the movement for a sustainable web by creating an account today
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-dark-gray block font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? "border-red-500" : "border-ghost-white"
                } bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-dark-gray block font-medium">Email</label>
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
                } bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-dark-gray block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Must be at least 8 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.password ? "border-red-500" : "border-ghost-white"
                  } bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="py-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("agreeTerms", {
                    required: "You must agree to the terms",
                  })}
                  className="mt-1 w-4 h-4 rounded border-gray-300 accent-primary"
                />
                <span className="text-sm text-medium-gray">
                  I agree to the{" "}
                  <a href="#" className="text-primary font-semibold">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.agreeTerms.message}
                </span>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-teal-dark text-white py-3.5 rounded-full font-semibold transition-all shadow-lg active:scale-95"
            >
              Sign up
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-medium-gray">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Side Image (Same as Login) */}
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

export default SignUpPage;
