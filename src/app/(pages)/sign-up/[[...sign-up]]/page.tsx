"use client";

import React, { useState } from "react";
import { useSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import PageHeader from "@/app/components/PageHeader";// Assuming you have a header component
import { EyeIcon, EyeOff  } from "lucide-react"; // Assuming you're using lucide-react for the eye icon
import Logos from "@/app/components/Logos";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser(); // This hook provides access to the current user after they are logged in.
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState(""); // Added firstName state
  const [lastName, setLastName] = useState(""); // Added lastName state

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
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error: unknown) {
      console.error(error); // This will now log the error
    
      if (error instanceof Error) {
        // This ensures that the error has a message property
        setError(error.message || "An unknown error occurred.");
      } else {
        // Handle the case where error is not an instance of Error
        setError("An unknown error occurred.");
      }
    }
    
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return <Loader />;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        // After sign-up is completed and the session is set, update the user profile
        if (user) {
          // Update the firstName and lastName if required
          await user.update({
            firstName,
            lastName,
          });

          // Fetch updated user details after update
          const updatedUser = await user.reload(); // Ensure user data is refreshed

          // Optional: Now that the user data is updated, you can access it again
          console.log(updatedUser.firstName, updatedUser.lastName);
        }

        router.push("/");
      } else {
        console.log("Verification failed:", completeSignUp);
      }
    } catch (error) {
      setError((error as { errors: { message: string }[] }).errors[0].message);
    
    }
  }

  return (
    <section className="">
      <PageHeader heading="My Account" />
      <div className="w-full max-w-[90%] sm:max-w-[544px] h-auto sm:h-[540px] shadow-custom border-1 p-4 sm:p-6 mx-auto mb-4 pb-8 border-[#C2C5E1]">
        <div className="text-center">
          <h1 className="text-[#000000] mt-4 text-lg sm:text-2xl sm:text-[32px] font-bold font-josefin">
            Sign Up
          </h1>
          <p className="font-lato pb-6 text-[#9096B2] text-xs sm:text-sm sm:text-[17px]">
            Please create an account below.
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Sign-Up Form */}
          {!pendingVerification ? (
            <form onSubmit={submit} className="space-y-6">
              {/* First Name Input */}
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-3 sm:p-4 w-full sm:w-[432px] h-[48px] sm:h-[52px] outline-none border border-[#C2C5E1] rounded-[2px]"
                required
              />
              {/* Last Name Input */}
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-3 sm:p-4 w-full sm:w-[432px] h-[48px] sm:h-[52px] outline-none border border-[#C2C5E1] rounded-[2px]"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="p-3 sm:p-4 w-full sm:w-[432px] h-[48px] sm:h-[52px] outline-none border border-[#C2C5E1] rounded-[2px]"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 sm:p-4 w-full sm:w-[432px] h-[48px] sm:h-[52px] outline-none border border-[#C2C5E1] rounded-[2px]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-10 top-[27px] transform -translate-y-1/2 text-gray-600"
                >
                   {showPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              <button
                type="submit"
                className="bg-[#FB2E86] w-full sm:w-[432px] h-[45px] sm:h-[47px] text-sm sm:text-[17px] text-white font-lato border-none mt-5"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={onPressVerify} className="space-y-4">
              <p className="text-center font-lato text-[#9096B2] text-xs sm:text-base sm:text-[17px]">
                We have sent a verification code to your email. Please enter it below to complete your signup.
              </p>
              <input
                type="text"
                placeholder="Enter Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-5 py-3 border-2 border-white bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#FB2E86] text-white py-3 px-4 rounded-[2px] hover:bg-pink-600 transition duration-300"
              >
                Verify Email
              </button>
            </form>
          )}

          <div className="text-center mt-4 mb-4">
            <p className=" font-lato text-[#9096B2] text-xs sm:text-[17px] mt-8 sm:mt-8 mb-4">
              Already have an account? {""}
              <Link href="/sign-in" className="hover:underline">
                 Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Logos/>
    </section>
  );
};

export default Signup;
