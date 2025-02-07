"use client"
import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { EyeIcon, EyeOff } from "lucide-react";
import PageHeader from "@/app/components/PageHeader";
import { FaGoogle} from "react-icons/fa";
const Login = () => {
  const { isLoaded, signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  if (!isLoaded) {
    return <Loader />;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return <Loader />;
    }

    try {
      await signIn.create({
        identifier: emailAddress,
        password,
      });

      // Once signed in, you can redirect the user to the dashboard or home page
      router.push("/");
    } catch (error) {
      setError((error as { errors: { message: string }[] }).errors[0].message);
    
    }
  }

  return (
    <section>
      <PageHeader heading="My Account" />
      <div className="w-full max-w-[90%] sm:max-w-[544px] h-auto sm:h-[540px] shadow-custom border-1 p-4 sm:p-6 mx-auto mb-4 border-[#C2C5E1]">
        <div className="text-center">
          <h1 className="text-[#000000] mt-4 text-lg sm:text-2xl sm:text-[32px] font-bold font-josefin">
            Sign In
          </h1>
          <p className="font-lato text-[#9096B2] text-xs sm:text-sm sm:text-[17px]">
            Please login using your account details below.
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Sign-In Form */}
          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 relative w-full">
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="p-3 sm:p-4 w-full sm:w-[432px] h-[48px] sm:h-[52px] outline-none border border-[#C2C5E1] rounded-[2px]"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 sm:p-4 w-full sm:w-[432px] h-[48px] sm:h-[52px] outline-none border border-[#C2C5E1] rounded-[2px]"
            />
          

            <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-10 top-[78px]  transform -translate-y-1/2 text-gray-600"
                >
                    {showPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
                </button>


                
          </div>

          {/* Forgot Password Link */}
          <p className="text-left mt-3 text-[#9096B2] font-lato text-xs sm:text-[17px] sm:ml-[30px]">
            Forgot your password?
          </p>

          {/* Sign In Button */}
          <button
            type="submit"
            onClick={submit}
            className="bg-[#FB2E86] mt-5 w-full sm:w-[432px] h-[45px] sm:h-[47px] text-sm sm:text-[17px] text-white font-lato border-none"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="font-lato text-[#9096B2] text-xs sm:text-[17px] mt-8 sm:mt-8 mb-4">
            Don&apos;t have an Account?{" "}
            <Link href="/sign-up" className="hover:underline">
              Create account
            </Link>
          </p>

          {/* Google Sign-In Button */}
          <div className="flex items-center justify-center mt-6">
  <hr className="w-full border-gray-300" />
  <span className="px-3 text-gray-500 font-lato text-sm sm:text-base">
    or 
  </span>
  <hr className="w-full border-gray-300" />
</div>

{/* Google, Facebook, GitHub Buttons */}
<div className="flex justify-center space-x-4 mt-4">
  {/* Google Sign-In Button */}
  <button
    onClick={() =>
      signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      })
    }
    className="bg-red-500 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-red-600 transition duration-300"
  >
    <FaGoogle className="w-6 h-6" />
  </button>

  {/* Facebook Sign-In Button */}
  
</div>

        </div>
      </div>
    </section>
  );
};

export default Login;
